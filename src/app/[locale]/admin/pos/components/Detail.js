"use client";
import Image from "next/image";
import { Button as ShadCNButton } from "@/components/ui/button";
import {
  CheckCircle,
  CircleDollarSignIcon,
  CreditCardIcon,
  ListEnd,
  ListRestart,
  ListXIcon,
  RotateCw,
} from "lucide-react";
import {
  ScrollArea,
  ScrollBar,
} from "../../../../../components/ui/scroll-area";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectCustomer from "./select-customer";
import { Input } from "@/components/ui/input";
import { usePOSCart } from "@/contexts/POSContext";
import { BASE_API_URL, EXCHANGE_RATE, IMAGE_PAYMENT_URL } from "@/config/env";
import { useEffect, useState } from "react";
import CartItem from "./cart-item";
import { usePOSDetailContext } from "@/contexts/POSDetailContext";
import { useInvoiceContext } from "@/contexts/POSInvoiceContext";
import { useToast } from "@/hooks/use-toast";
import { getCustomers } from "@/services/customers-services";

export default function Detail({ payments }) {
  const { toast } = useToast();
  const [isOpenPayNow, setIsOpenPayNow] = useState(false);
  const [isOpenHold, setIsOpenHold] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const {
    selectedCustomer,
    setSelectedCustomer,
    discountAmount,
    setDiscountAmount,
    discountType,
    setDiscountType,
    setIsOpenDialog,
    orderNote,
    setOrderNote,
    setSuccessMessage,
    setIsOpenSuccessDialog,
    setIsShowBtnInSuccessDialog,
  } = usePOSDetailContext();

  const { setInvoice } = useInvoiceContext();

  const { clearCart, cartItems, getTotalPrice } = usePOSCart();
  const [receivedDollar, setReceivedDollar] = useState(0);
  const [receivedRiel, setReceivedRiel] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customers, setCustomers] = useState([]);

  const [selectedPayment, setSelectedPayment] = useState(
    payments[0].id || null
  );
  const [selectedPaymentError, setSelectedPaymentError] = useState(null);

  const handleFetchCustomers = async () => {
    const fetchedCustomers = await getCustomers();
    setCustomers(fetchedCustomers);
  };

  useEffect(() => {
    handleFetchCustomers();
  }, []);

  const getTotalAfterDiscountRiel = () => {
    return discountType == "percentage"
      ? (
          (getTotalPrice() - (getTotalPrice() * discountAmount) / 100) *
          EXCHANGE_RATE
        )
          .toFixed(0)
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      : ((getTotalPrice() - discountAmount) * EXCHANGE_RATE)
          .toFixed(0)
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const getTotalAfterDiscountDollar = () => {
    return discountType == "percentage"
      ? (getTotalPrice() - (getTotalPrice() * discountAmount) / 100)?.toFixed(2)
      : (getTotalPrice() - discountAmount)?.toFixed(2);
  };

  const getTotalRecievedDollar = () => {
    const rielToDollar = Number(receivedRiel / EXCHANGE_RATE); // Convert riel to dollars
    const totalDollar = Number(receivedDollar); // Convert receivedDollar to a number

    return (rielToDollar + totalDollar)?.toFixed(2); // Calculate and format to 2 decimal places
  };

  const getReturnChangeDollar = () => {
    const rielToDollar = Number(receivedRiel / EXCHANGE_RATE); // Convert riel to dollars
    const totalDollar = Number(receivedDollar); // Convert receivedDollar to a number
    const totalCostDollar = Number(getTotalAfterDiscountDollar()); // Get the total cost in dollars

    if (!receivedDollar && !receivedRiel) return 0;

    return (rielToDollar + totalDollar - totalCostDollar)?.toFixed(2); // Calculate and format to 2 decimal places
  };

  const getReturnChangeRiel = () => {
    return (getReturnChangeDollar() * EXCHANGE_RATE)
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSelectedPaymentError(null);

    if (selectedPayment == null) {
      setSelectedPaymentError("Please Select Payment Method.");
      return null;
    }

    if (selectedPayment != 0) {
      const totalReceivedToDollar = Number(receivedRiel / EXCHANGE_RATE); // Convert riel to dollars
      const totalReceivedDollar = Number(receivedDollar);
      if (
        totalReceivedToDollar + totalReceivedDollar <
        getTotalAfterDiscountDollar()
      ) {
        setError("Total Recieved Less Than Total Cost.");
        return null;
      }
    }

    const user = JSON.parse(localStorage.getItem("user"));

    const orderData = {
      customerId: selectedCustomer?.id,
      paymentTypeId: selectedPayment,
      discount: discountAmount,
      discountType: discountType,
      subtotal: getTotalPrice(),
      total: getTotalAfterDiscountDollar(),
      total_recieved_dollar:
        selectedPayment == 0 ? null : getTotalRecievedDollar(),
      exchange_rate: EXCHANGE_RATE,
      userId: user.id,
      note: orderNote,
      status: 1,
      items: cartItems?.map((item) => ({
        id: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
        discount: item.discount,
        quantity: item.quantity,
        type: item.type,
      })),
    };
    // console.log(orderData);
    // return null;
    setLoading(true);

    try {
      const response = await fetch(BASE_API_URL + "/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to place the order. Please contact admin.");
      }
      const createdInvoice = await response.json();
      setInvoice(createdInvoice?.invoice);
      // console.log(createdInvoice?.invoice);

      // Handle success (e.g., navigate to the success page)
      setDiscountAmount(0);
      setReceivedDollar(0);
      setReceivedRiel(0);
      setSelectedPayment(null);
      setSelectedCustomer(null);
      setOrderNote(null);

      clearCart();
      setIsShowBtnInSuccessDialog(true);
      setIsOpenSuccessDialog(true);
      setSuccessMessage("Order successfully created.");
      // router.push("/cart/success");
      handleFetchCustomers();
      setIsOpenPayNow(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleHold = async () => {
    setError(null);

    // console.log(cartItems);
    // return;
    const user = JSON.parse(localStorage.getItem("user"));

    const orderData = {
      customerId: selectedCustomer?.id,
      discount: discountAmount,
      discountType: discountType,
      subtotal: getTotalPrice(),
      total: getTotalAfterDiscountDollar(),
      userId: user.id,
      note: orderNote,
      status: 0,
      items: cartItems?.map((item) => ({
        id: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
        discount: item.discount,
        quantity: item.quantity,
        type: item.type,
      })),
    };
    // console.log(orderData);
    // return null;
    setLoading(true);

    try {
      const response = await fetch(BASE_API_URL + "/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to place the order. Please contact admin.");
      }
      const createdHold = await response.json();
      setInvoice(createdHold?.invoice);
      // console.log(createdHold?.invoice);
      // Handle success (e.g., navigate to the success page)
      setDiscountAmount(0);
      setReceivedDollar(0);
      setReceivedRiel(0);
      setSelectedPayment(null);
      setSelectedCustomer(null);
      setOrderNote(null);

      clearCart();
      setIsShowBtnInSuccessDialog(true);
      setIsOpenSuccessDialog(true);
      setIsOpenDialog(false);
      setSuccessMessage("Placed in hold success.");
      // router.push("/cart/success");
      handleFetchCustomers();
      setIsOpenHold(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    setSelectedPayment(payments[0].id);
  }, [cartItems.length]);
  if (!isMounted) {
    return null;
  }
  // if (!cartItems || cartItems?.length === 0) {
  //   return (
  //     <section className="sticky z-50 mx-2 my-10 top-4">
  //       <div className="max-w-sm p-4 mx-auto bg-white rounded-lg shadow-lg">
  //         <h2 className="mb-4 text-lg font-bold">Order Details</h2>
  //         <p className="text-center text-gray-600">No items to display</p>
  //       </div>
  //       <SuccessDialog
  //         isOpen={isOpenSuccessSubmit}
  //         setIsOpen={setIsOpenSuccessDialog}
  //       />
  //     </section>
  //   );
  // }

  return (
    <>
      <section className="sticky top-0 flex flex-col h-[90vh] md:h-screen">
        <h2 className="w-full p-2 text-lg font-bold text-center">
          Order Details
        </h2>
        <ScrollArea className="flex-1 pt-1 border-t">
          <table className="w-full">
            <tbody>
              <tr>
                <th></th>
                <th className="text-gray-500">Items</th>
                <th className="text-gray-500">Qrt</th>
                <th className="text-gray-500">Total</th>
                <th className="text-gray-500"></th>
              </tr>
              {cartItems?.length > 0 ? (
                cartItems?.map((item, index) => (
                  <CartItem item={item} key={index} />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="pt-10">
                    <div className="flex justify-center text-primary">
                      <ListXIcon /> No Data..
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </ScrollArea>
        <div className="px-2">
          {/* Subtotal */}
          <div className="pt-4 space-y-3 border-t">
            <div className="flex items-center justify-between text-lg">
              <p className="text-foreground">Customer</p>
              <div key={" " + selectedCustomer?.name}>
                <SelectCustomer
                  customers={customers}
                  selectedCustomer={selectedCustomer}
                  setSelectedCustomer={setSelectedCustomer}
                  setSelectedDefaultPayment={() =>
                    setSelectedPayment(payments[0].id)
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-lg">
              <p className="text-foreground">Subtotal</p>
              <p className="text-red-600 ">${getTotalPrice()?.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-lg">
              <p className="flex items-center text-foreground">Discount</p>
              <div className="flex w-[250px] border-gray-300">
                <span className="z-50 text-destructive translate-x-[0.5px] border-[0.5px] border-primary">
                  <Select
                    onValueChange={(value) => setDiscountType(value)}
                    defaultValue={discountType}
                  >
                    <SelectTrigger className="justify-center w-12 gap-0 p-1 mx-0 text-lg font-semibold border-none rounded-none shadow-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="min-w-auto">
                      <SelectItem value="percentage">%</SelectItem>
                      <SelectItem value="dollar">$</SelectItem>
                    </SelectContent>
                  </Select>
                </span>
                <input
                  onChange={(e) => setDiscountAmount(e.target.value)}
                  value={discountAmount > 0 && discountAmount}
                  type="number"
                  className="w-full px-1 border-[0.5px] border-primary h-full text-lg text-primary outline-none text-end no-spinner "
                  placeholder="0"
                />
              </div>
            </div>
            <div className="flex justify-between pt-4 pb-4 mt-4 text-2xl font-bold border-t">
              <p className="text-black">Total</p>
              <p className="text-red-600">$ {getTotalAfterDiscountDollar()}</p>
            </div>
          </div>

          {cartItems?.length > 0 && (
            <div className="flex gap-2 mb-2">
              <ShadCNButton
                onClick={() => {
                  clearCart();
                  setOrderNote("");
                  setIsOpenSuccessDialog(true);
                  setSuccessMessage("Clear Items Successfully.");
                  setIsOpenDialog(false);
                }}
                size="mySize"
                variant="destructive"
                className="w-full p-2 mb-2 rounded-lg"
              >
                <ListRestart /> Reset
              </ShadCNButton>
              {/* Start Hold button */}
              <Dialog
                open={isOpenHold}
                onOpenChange={(state) => {
                  if (
                    !selectedCustomer &&
                    cartItems.some((item) => item.type === "package")
                  ) {
                    toast({
                      title: "Please Select a Customer.",
                      variant: "destructive",
                      description: `Customer is required for hold package.`,
                    });
                    return;
                  }
                  if (
                    !selectedCustomer &&
                    cartItems.some((item) => item.type === "use_package")
                  ) {
                    toast({
                      title: "Please Select a Customer.",
                      variant: "destructive",
                      description: `Customer is required for use package.`,
                    });
                    return;
                  }
                  setIsOpenHold(state);
                }}
              >
                <DialogTrigger asChild>
                  <ShadCNButton
                    size="mySize"
                    variant="outline"
                    className="w-full p-2 mb-2 rounded-lg"
                  >
                    <ListEnd /> Hold
                  </ShadCNButton>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Note</DialogTitle>
                    <DialogDescription />
                    <Input
                      onChange={(e) => setOrderNote(e.target.value)}
                      placeholder="Put Order Note"
                      className="col-span-3"
                    />
                  </DialogHeader>
                  <DialogFooter className={`mt-4`}>
                    <ShadCNButton
                      onClick={() => {
                        !loading && handleHold();
                      }}
                      type="submit"
                    >
                      {loading ? (
                        <>
                          <RotateCw className="animate-spin" />
                          Holding Order...
                        </>
                      ) : (
                        "Hold Order"
                      )}
                    </ShadCNButton>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {/* End Hold button */}
              <Dialog
                open={isOpenPayNow}
                onOpenChange={(state) => {
                  if (
                    !selectedCustomer &&
                    cartItems.some((item) => item.type === "package")
                  ) {
                    toast({
                      title: "Please Select a Customer.",
                      variant: "destructive",
                      description: `Customer is required for purchase package.`,
                    });
                    return;
                  }
                  if (
                    !selectedCustomer &&
                    cartItems.some((item) => item.type === "use_package")
                  ) {
                    toast({
                      title: "Please Select a Customer.",
                      variant: "destructive",
                      description: `Customer is required for use package.`,
                    });
                    return;
                  }
                  setIsOpenPayNow(state);
                }}
              >
                <DialogTrigger asChild className="w-full">
                  <ShadCNButton
                    size="mySize"
                    variant="myStyle"
                    className="w-full p-2 mb-2 rounded-lg text-primary-foreground bg-primary hover:bg-primary/90"
                  >
                    <CircleDollarSignIcon /> Pay Now
                  </ShadCNButton>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Payment{" "}
                      <span className="font-normal text-destructive">
                        ($ 1 = ៛ {EXCHANGE_RATE})
                      </span>
                    </DialogTitle>
                    <DialogDescription />
                  </DialogHeader>
                  <>
                    <div className="max-w-full px-4 py-2 text-center rounded-lg bg-secondary">
                      <div className="flex items-end gap-2 py-2 text-lg rounded-lg text-primary ">
                        <p>Total ($) : </p>{" "}
                        <p className="text-3xl">
                          <span className="text-3xl font-semibold">
                            {getTotalAfterDiscountDollar()}
                          </span>
                          <span>{" $"}</span>
                        </p>
                      </div>
                      <div className="flex items-end gap-2 py-2 text-lg rounded-lg text-primary ">
                        <p>Total (៛) : </p>{" "}
                        <p>
                          <span className="font-semibold tracking-wider">
                            {getTotalAfterDiscountRiel()}
                          </span>
                          <span>{" រៀល"}</span>
                        </p>
                      </div>
                    </div>
                    <p className="pt-2 text-red-400">
                      <span className="text-primary">Customer: </span>{" "}
                      {selectedCustomer?.name || "N/A"}{" "}
                      <span className="text-primary">| Credit :</span> ${" "}
                      {Number(selectedCustomer?.credit) || 0}
                    </p>
                    {/* Payment Method */}
                    <div className="flex items-center justify-between mt-4 font-semibold text-secondary-foreground text-start">
                      <span>Payment Method</span>
                      {/* <div>
                      (Customer Credit :{" "}
                      <span className="text-destructive">$ 321</span>)
                    </div> */}
                    </div>
                    <ScrollArea className="w-full pb-3 whitespace-nowrap">
                      <div
                        className="flex items-center gap-2"
                        key={customers?.name}
                      >
                        {
                          <ShadCNButton
                            onClick={() => {
                              setSelectedPaymentError(null);
                              if (selectedCustomer == null) {
                                toast({
                                  title:
                                    "Please select a customer to use Credit.",
                                  variant: "destructive",
                                });
                                return;
                              }
                              if (
                                selectedCustomer?.credit >
                                Number(getTotalAfterDiscountDollar())
                              ) {
                                setSelectedPayment(0);
                                return;
                              }
                              toast({
                                title: "Customer don't have enough credit",
                                variant: "destructive",
                                description: `Customer Credit: $ ${Number(
                                  selectedCustomer?.credit
                                )} | Total Price: $ ${Number(
                                  getTotalAfterDiscountDollar()
                                )}`,
                              });
                            }}
                            variant={`${
                              selectedPayment == 0 ? "default" : "outline"
                            }`}
                          >
                            <CreditCardIcon />
                            <p>Credit</p>
                          </ShadCNButton>
                        }
                        {payments?.map((payment) => {
                          return (
                            <ShadCNButton
                              onClick={() => {
                                setSelectedPaymentError(null);
                                setSelectedPayment(payment.id);
                              }}
                              key={payment.id}
                              variant={`${
                                selectedPayment == payment.id
                                  ? "default"
                                  : "outline"
                              }`}
                            >
                              <Image
                                src={IMAGE_PAYMENT_URL + payment.image}
                                width={30}
                                height={30}
                                alt=""
                                className="p-0.5"
                              ></Image>
                              <p>{payment.name}</p>
                            </ShadCNButton>
                          );
                        })}
                      </div>
                      <ScrollBar orientation="horizontal" />
                      <p className="mt-1 text-destructive">
                        {selectedPaymentError}
                      </p>
                    </ScrollArea>

                    {selectedPayment != 0 ? (
                      <section className="flex flex-wrap items-center">
                        <div className="flex-1">
                          {/* Received Amount */}
                          <div>
                            <label
                              htmlFor="received-dollar"
                              className="block text-black text-[16px] font-medium text-start"
                            >
                              Received In Dollar
                            </label>
                            <div className="flex">
                              <span
                                className={`flex w-10 items-center text-2xl text-primary justify-center translate-x-[1px] border ${
                                  error
                                    ? "border-destructive"
                                    : "border-primary"
                                }`}
                              >
                                $
                              </span>
                              <Input
                                onChange={(e) => {
                                  setError(null);
                                  setReceivedDollar(e.target.value);
                                }}
                                value={receivedDollar > 0 && receivedDollar}
                                type="number"
                                placeholder="0.00 $"
                                className={`z-10 border rounded-none ${
                                  error
                                    ? "border-destructive"
                                    : "border-primary"
                                }`}
                              />
                            </div>
                          </div>
                          <div className="mt-2">
                            <label
                              htmlFor="received-dollar"
                              className="block text-black text-[16px] font-medium text-start"
                            >
                              Received In Riel
                            </label>
                            <div className="flex">
                              <span
                                className={`flex w-10 items-center text-2xl text-primary justify-center translate-x-[1px] border ${
                                  error
                                    ? "border-destructive"
                                    : "border-primary"
                                }`}
                              >
                                ៛
                              </span>
                              <Input
                                onChange={(e) => {
                                  setError(null);
                                  setReceivedRiel(e.target.value);
                                }}
                                value={receivedRiel > 0 && receivedRiel}
                                type="number"
                                placeholder="000 រៀល"
                                className={`z-10 border rounded-none ${
                                  error
                                    ? "border-destructive"
                                    : "border-primary"
                                }`}
                              />
                            </div>
                          </div>
                          <p className="mt-1 text-destructive">{error}</p>
                        </div>
                        {/* Return Amount */}

                        <div className="w-full mt-6">
                          <div className="w-full h-auto p-2 rounded-lg bg-secondary">
                            <label
                              htmlFor="received-dollar"
                              className="block text-secondary-foreground text-[16px] font-medium mb-1 text-start"
                            >
                              Return Change
                            </label>
                            <div className="flex w-full gap-2 text-lg rounded-lg text-primary">
                              <p>USD: </p>{" "}
                              <p className="w-full overflow-auto">
                                {getReturnChangeDollar()} $
                              </p>
                            </div>
                            <div className="flex gap-2 text-lg rounded-lg text-primary">
                              <p>KHR: </p>{" "}
                              <p className="w-full overflow-auto">
                                {getReturnChangeRiel()} ៛
                              </p>
                            </div>
                          </div>
                        </div>
                      </section>
                    ) : (
                      <section>
                        <div className="w-full mt-2">
                          <div className="w-full h-auto p-2 rounded-lg bg-secondary">
                            <label
                              htmlFor="received-dollar"
                              className="block text-secondary-foreground text-[16px] font-medium mb-1 text-start"
                            >
                              Credit Remain
                            </label>
                            <div className="flex w-full gap-2 text-lg rounded-lg text-primary">
                              <p>USD: </p>{" "}
                              <p className="w-full overflow-auto">
                                {(
                                  selectedCustomer?.credit -
                                  getTotalAfterDiscountDollar()
                                ).toFixed(2)}{" "}
                                $
                              </p>
                            </div>
                          </div>
                        </div>
                      </section>
                    )}
                  </>
                  <div className="mt-2">
                    {loading ? (
                      <ShadCNButton
                        size="mySize"
                        variant="myStyle"
                        className="w-full p-2 mt-4 mb-2 bg-gray-600 rounded-lg cursor-not-allowed text-primary-foreground hover:bg-primary/90"
                      >
                        <RotateCw className=" animate-spin" /> Submiting...
                      </ShadCNButton>
                    ) : (
                      <ShadCNButton
                        onClick={handleSubmit}
                        size="mySize"
                        variant="myStyle"
                        className="w-full p-2 mt-4 mb-2 rounded-lg text-primary-foreground bg-primary hover:bg-primary/90"
                      >
                        <CheckCircle /> Submit
                      </ShadCNButton>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
