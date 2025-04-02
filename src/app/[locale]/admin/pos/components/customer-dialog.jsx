"use client";

import * as React from "react";
import {
  Diff,
  ListX,
  LoaderIcon,
  PlusIcon,
  SearchIcon,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { deleteHold } from "@/services/invoices-services";
import MyLoadingAnimation from "@/components/ui/my-loading-animation";
import { useInvoiceContext } from "@/contexts/POSInvoiceContext";
import { getCustomers } from "@/services/customers-services";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { BASE_BACKEND_URL } from "@/config/env";
import { revalidatePath } from "next/cache";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export function CustomerDialog() {
  const { toast } = useToast();
  const [holds, setHolds] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const [isOpenAddNewCustomer, setIsOpenAddNewCustomer] = React.useState(false);
  const [openAdjustCredit, setOpenAdjustCredit] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);

  const fetchHolds = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await getCustomers();
      setHolds(results);
      //   console.log(results)
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isDrawerOpen) {
      fetchHolds();
    }
  }, [isDrawerOpen]);

  const toggleAdjustCredit = (customer) => {
    setSelectedCustomer(customer);
    setOpenAdjustCredit(true);
    // console.log(holds[selectedForView]);
  };

  const token = localStorage.getItem("token");

  // Add New Customer
  const [isSubmitNewCustomer, setIsSubmitNewCustomer] = React.useState(false);
  const [customerName, setCustomerName] = React.useState("");
  const [customerPhone, setCustomerPhone] = React.useState("");
  const [customerAddress, setCustomerAddress] = React.useState("");
  const [customerGender, setCustomerGender] = React.useState("female");
  const [customerAmount, setCustomerAmount] = React.useState("");
  const [customerCredit, setCustomerCredit] = React.useState("");
  const [customerErrors, setCustomerErrors] = React.useState({});

  const handleCreateCustomer = async () => {
    setIsSubmitNewCustomer(true); // Start submission process

    // Validate required field
    if (!customerName.trim()) {
      setCustomerErrors({ customerName: "Customer name is required" });
      setIsSubmitNewCustomer(false);
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_BACKEND_URL}/api/new_customers`, // Update with the correct endpoint
        {
          newCustomerName: customerName,
          newCustomerPhone: customerPhone || null,
          newCustomerAddress: customerAddress || null,
          newCustomerGender: customerGender || null,
          newCustomerAmount: customerAmount || null,
          newCustomerCredit: customerCredit || null,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Reset form on success
      setCustomerName("");
      setCustomerPhone("");
      setCustomerAddress("");
      setCustomerGender("female");
      setCustomerAmount("");
      setCustomerCredit("");
      setCustomerErrors({});
      setIsSubmitNewCustomer(false);

      // Refresh customer list after successful submission
      fetchHolds(); // Call this if you have a function to update the customer list

      // Show success notification (if using a toast library)
      toast({
        title: "Customer created successfully!",
        variant: "success",
        action: (
          <ToastAction
            altText="Refresh"
            className="hover:bg-green-700"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </ToastAction>
        ),
      });
    } catch (error) {
      console.error("Error creating customer:", error);

      setCustomerErrors({
        apiError:
          error.response?.data?.error || "Something went wrong. Try again.",
      });

      setIsSubmitNewCustomer(false);
    }
  };

  // Adjust Credt

  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSubmitAdjustCredit, setIsSubmitAdjustCredit] = React.useState(false);
  const [action, setAction] = React.useState("add");
  const [amount, setAmount] = React.useState("");
  const [credit, setCredit] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const handleAdjustCredit = async () => {
    // Validate required fields
    const newErrors = {};
    if (!amount) newErrors.amount = "Amount is required";
    if (!credit) newErrors.credit = "Credit is required";
    if (!action) newErrors.action = "Action is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_BACKEND_URL}/api/update_credit/${selectedCustomer.id}`,
        {
          action,
          amount,
          credit,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Reset form and close modal on success
      setErrors({});
      setAction("add");
      setAmount("");
      setCredit("");
      setOpenAdjustCredit(false);
      setIsSubmitAdjustCredit(false);

      // Refresh customer data after success
      fetchHolds();

      // Success notification (if using toast notifications)
      toast({
        title: "Credit updated successfully!",
        variant: "success",
        action: (
          <ToastAction
            altText="Refresh"
            className="hover:bg-green-700"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </ToastAction>
        ),
      });
    } catch (error) {
      console.error("Error adjusting credit:", error);

      // Set error message from API response or default message
      setErrors({
        apiError:
          error.response?.data?.error || "Something went wrong. Try again.",
      });
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredHolds = holds.filter(
    (hold) =>
      hold.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hold.phone?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <DrawerTrigger asChild>
                <Button
                  variant="outline"
                  className="relative h-11 border-[0.5px]"
                >
                  <span className="flex items-center gap-1">
                    <UsersRound className="text-primary" />
                  </span>
                  {/* {holds?.length > 0 && (
              <span className="absolute px-1.5 bg-yellow-400 rounded-full right-0.5 -top-2 text-xs font-bold">
                {holds?.length}
              </span>
            )} */}
                </Button>
              </DrawerTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Customers</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DrawerContent>
          <div className="flex flex-col w-full mx-auto">
            <DrawerHeader className="p-0">
              <DrawerTitle className="flex items-center justify-center gap-2 py-2 text-xl font-bold">
                Customers
              </DrawerTitle>
              <DrawerDescription className="hidden" />
            </DrawerHeader>
            <div className="max-h-[80vh] overflow-auto p-4">
              <Button
                onClick={() => {
                  setIsOpenAddNewCustomer(true);
                }}
              >
                <PlusIcon className="w-4 h-4" />
                Add New Customer
              </Button>
              <div className="relative flex flex-1 flex-shrink-0 my-4 border rounded-md border-primary">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <input
                  className="block w-full py-2 pl-10 text-sm border border-gray-200 rounded-md peer outline-1 placeholder:text-gray-500"
                  placeholder="Search Customer (Name or Phone)"
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                />
                <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500  dark:text-white" />
              </div>
              {loading && <MyLoadingAnimation />}
              {error && <p className="text-red-500">Error: {error}</p>}
              {!loading && !error && (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {filteredHolds?.map((hold, index) => (
                    <div
                      key={hold.id}
                      className="flex flex-col justify-between h-full gap-2 p-3 border rounded-md bg-background"
                    >
                      <div className="text-base">
                        <span className="text-lg">
                          {" "}
                          Customer :{" "}
                          <span className="text-lg font-semibold">
                            {hold.name || "N/A"}
                          </span>
                        </span>
                        <p className="text-gray-600">
                          Phone: {hold.phone || "N/A"}
                        </p>
                        <p className="text-gray-600">
                          Address: {hold.address || "N/A"}
                        </p>
                        <p className="text-gray-600">
                          Gender: {hold.gender || "N/A"}
                        </p>
                        <span>
                          {" "}
                          Credit Remain :{" "}
                          <span className="font-semibold text-red-500">
                            {hold.credit || "N/A"} $
                          </span>
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center justify-end gap-2 mt-2">
                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                className="bg-yellow-500 hover:bg-yellow-400"
                                onClick={() => {
                                  toggleAdjustCredit(hold);
                                }}
                              >
                                <Diff className="w-4 h-4" />
                                Adjust Credit
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Adjust Credit</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {!loading && holds?.length == 0 && (
                <p className="flex items-center justify-center gap-2 text-primary">
                  <ListX /> No Data
                </p>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <Dialog open={openAdjustCredit} onOpenChange={setOpenAdjustCredit}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adjust Credit</DialogTitle>
            <DialogDescription>
              Custmer : {selectedCustomer?.name}{" "}
              {selectedCustomer?.phone && `(${selectedCustomer?.phone})`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <RadioGroup
              onValueChange={setAction}
              defaultValue={action}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="add" id="add" />
                <Label htmlFor="add">Add (+)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="minus" id="minus" />
                <Label htmlFor="minus">Minus (-)</Label>
              </div>
            </RadioGroup>
            {errors.action && <p className="text-red-500">{errors.action}</p>}

            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount ($)
              </Label>
              <Input
                type="number"
                placeholder="Amount"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="col-span-3"
              />
            </div>
            {errors.amount && <p className="text-red-500">{errors.amount}</p>}

            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="credit" className="text-right">
                Credit ($)
              </Label>
              <Input
                type="number"
                placeholder="Credit"
                id="credit"
                value={credit}
                onChange={(e) => setCredit(e.target.value)}
                className="col-span-3"
              />
            </div>
            {errors.credit && <p className="text-red-500">{errors.credit}</p>}
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setIsSubmitAdjustCredit(true);
                handleAdjustCredit();
              }}
              disable={isSubmitAdjustCredit}
            >
              {isSubmitAdjustCredit && <LoaderIcon className="animate-spin" />}
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add new customer dialog */}
      <Dialog
        open={isOpenAddNewCustomer}
        onOpenChange={setIsOpenAddNewCustomer}
      >
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 py-4">
            {/* Customer Name Field */}
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="customerName" className="text-right">
                Name
              </Label>
              <Input
                type="text"
                placeholder="Customer Name"
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className={`${customerErrors?.customerName && 'border-red-500'} col-span-3`}
              />
            </div>
            {customerErrors?.customerName && (
              <p className="mb-3 text-red-500">{customerErrors?.customerName}</p>
            )}

            {/* Customer Phone Field */}
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="customerPhone" className="text-right">
                Phone
              </Label>
              <Input
                type="text"
                placeholder="Customer Phone"
                id="customerPhone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* Customer Address Field */}
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="customerAddress" className="text-right">
                Address
              </Label>
              <Input
                type="text"
                placeholder="Customer Address"
                id="customerAddress"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* Customer Gender Field */}
            <div className="grid items-center grid-cols-4 gap-4 mb-3">
              <Label htmlFor="customerGender" className="text-right">
                Gender
              </Label>
              <RadioGroup
                onValueChange={setCustomerGender}
                defaultValue={customerGender}
                className="flex flex-wrap col-span-3 gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Customer Amount Field */}
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="customerAmount" className="text-right">
                Amount ($)
              </Label>
              <Input
                type="number"
                placeholder="Amount"
                id="customerAmount"
                value={customerAmount}
                onChange={(e) => setCustomerAmount(e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* Customer Credit Field */}
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="customerCredit" className="text-right">
                Credit ($)
              </Label>
              <Input
                type="number"
                placeholder="Credit"
                id="customerCredit"
                value={customerCredit}
                onChange={(e) => setCustomerCredit(e.target.value)}
                className="col-span-3"
              />
            </div>

            {customerErrors?.apiError && (
              <p className="text-red-500">{customerErrors?.apiError}</p>
            )}
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                handleCreateCustomer();
              }}
              disable={isSubmitNewCustomer}
            >
              {isSubmitNewCustomer && <LoaderIcon className="animate-spin" />}
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
