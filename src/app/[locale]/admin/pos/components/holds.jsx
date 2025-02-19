"use client";

import * as React from "react";
import {
  Edit,
  Eye,
  ListEnd,
  ListX,
  ListXIcon,
  ReceiptTextIcon,
  Trash,
  Trash2,
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { getHolds, deleteHold } from "@/services/invoices-services";
import MyLoadingAnimation from "@/components/ui/my-loading-animation";
import { usePOSCart } from "@/contexts/POSContext";
import { usePOSDetailContext } from "@/contexts/POSDetailContext";
import CartItem from "./cart-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInvoiceContext } from "@/contexts/POSInvoiceContext";

export function Holds() {
  const [holds, setHolds] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedForView, setSelectedForView] = React.useState(false);

  const [isDrawerDetailHoldOpen, setIsDrawerDetailHoldOpen] =
    React.useState(false);
  const token = localStorage.getItem("token");
  const {
    setSelectedCustomer,
    setDiscountAmount,
    setDiscountType,
    setOrderNote,
  } = usePOSDetailContext();

  const { setInvoice, setIsOpenInvoiceDialog } = useInvoiceContext();

  const { addMultipleToCart, clearCart } = usePOSCart();

  const fetchHolds = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await getHolds();
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

  const handleEdit = (index) => {
    // console.log(holds[index]);
    setIsDrawerDetailHoldOpen(false);
    clearCart();
    addMultipleToCart(holds[index].items);
    setSelectedCustomer(holds[index].customer?.id || 0);
    setDiscountAmount(holds[index].discount || 0);
    setDiscountType(holds[index].discountType || "percentage");
    handleDelete(holds[index].id);
    setOrderNote(holds[index].note);
    setIsDrawerOpen(false);
  };

  const handlePrintInvoice = (index) => {
    setInvoice(holds[index]);
    setIsOpenInvoiceDialog(true);
    // console.log(holds[selectedForView]);
  };

  const handleDelete = (id) => {
    console.log(id);
    const handleDeleteHold = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await deleteHold(id, token);
        //   setHolds(results);
        console.log(results);
        setHolds(holds.filter((hold) => hold.id != id));
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    handleDeleteHold();
  };

  return (
    <>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" className="relative h-11 border-[0.5px]">
            <span className="flex items-center gap-1">
              <ListEnd className="text-primary" />
              <span>Holds</span>
            </span>
            {/* {holds?.length > 0 && (
              <span className="absolute px-1.5 bg-yellow-400 rounded-full right-0.5 -top-2 text-xs font-bold">
                {holds?.length}
              </span>
            )} */}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="flex flex-col w-full mx-auto">
            <DrawerHeader className="p-0">
              <DrawerTitle className="flex items-center justify-center gap-2 py-2 text-xl font-bold">
                Order Holds
              </DrawerTitle>
              <DrawerDescription className="hidden" />
            </DrawerHeader>
            <div className="max-h-[80vh] overflow-auto p-4">
              {loading && <MyLoadingAnimation />}
              {error && <p className="text-red-500">Error: {error}</p>}
              {!loading && !error && (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {holds?.map((hold, index) => (
                    <div
                      key={hold.id}
                      className="flex flex-col justify-between h-full gap-2 p-3 border rounded-md bg-background"
                    >
                      <div className="text-base">
                        <span className="text-xl font-bold">#{hold.id}</span>
                        <p className="text-gray-600">
                          Customer: {hold.customer?.name || "N/A"}
                        </p>
                        <p className="text-gray-600">
                          Total Items: {hold.items?.length || 0}
                        </p>
                        {hold.discount != 0 && (
                          <p className="text-gray-600">
                            Total Discount: {hold.discount || 0}
                            {hold.discountType == "dollar" ? " $" : " %"}
                          </p>
                        )}
                        <p className="text-gray-600">
                          Total Price:{" "}
                          <span className="text-destructive">
                            {hold.total || "0"} $
                          </span>
                        </p>
                        <p className="text-base text-gray-950 line-clamp-5">
                          <span className="font-bold">Note</span>:{" "}
                          {hold.note || "N/A"}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-end gap-2 mt-2">
                        <AlertDialog>
                          <TooltipProvider delayDuration={0}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <AlertDialogTrigger asChild>
                                  <Button size="icon" variant="destructive">
                                    <Trash2 className="w-4 h-4" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </AlertDialogTrigger>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                You want to delete order{" "}
                                <span className="font-semibold">
                                  ID-{hold.id}
                                </span>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive hover:bg-destructive/80 text-destructive-foreground"
                                onClick={() => {
                                  handleDelete(hold.id);
                                }}
                              >
                                <Trash2 />
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon"
                                className="bg-yellow-500 hover:bg-yellow-400"
                                onClick={() => {
                                  handlePrintInvoice(index);
                                }}
                              >
                                <ReceiptTextIcon className="w-4 h-4" />
                                <span className="sr-only">Print</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Print Invoice</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                onClick={() => {
                                  setSelectedForView(index);
                                  setIsDrawerDetailHoldOpen(true);
                                }}
                                size="icon"
                                variant="outline"
                              >
                                <Eye className="w-4 h-4" />
                                <span className="sr-only">View</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View Detail</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon"
                                onClick={() => {
                                  handleEdit(index);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {
                !loading && holds?.length == 0 &&
                <p className="flex items-center justify-center gap-2 text-primary"><ListX /> No Data</p>
              }
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <Sheet
        open={isDrawerDetailHoldOpen}
        onOpenChange={(state) => setIsDrawerDetailHoldOpen(state)}
      >
        <SheetContent side="left" className="w-full px-0 sm:max-w-auto">
          <SheetHeader>
            <SheetTitle className="hidden" />
            <SheetDescription className="hidden" />
          </SheetHeader>
          <div className="flex flex-col h-screen px-2 text-base">
            <div>
              <span className="text-xl font-bold">
                #{holds[selectedForView]?.id}
              </span>
              <p className="text-gray-600">
                Customer: {holds[selectedForView]?.customer?.name || "N/A"}
              </p>
              <p className="text-gray-600">
                Total Products: {holds[selectedForView]?.items?.length || 0}
              </p>
              <p className="text-gray-600">
                Sub-Total:{" "}
                <span className="text-destructive">
                  {holds[selectedForView]?.subtotal || "0"} $
                </span>
              </p>
              {holds[selectedForView]?.discount && (
                <p className="text-gray-600">
                  Total Discount: {holds[selectedForView]?.discount || 0}
                  {holds[selectedForView]?.discountType == "dollar"
                    ? " $"
                    : " %"}
                </p>
              )}
              <p className="text-gray-600">
                Total Price:{" "}
                <span className="text-destructive">
                  {holds[selectedForView]?.total || "0"} $
                </span>
              </p>

              <p className="text-base text-gray-950 line-clamp-5">
                <span className="font-bold">Note</span>:{" "}
                {holds[selectedForView]?.note || "N/A"}
              </p>
            </div>
            <ScrollArea className="relative flex-1 w-full py-2 mt-4 mb-8 border rounded-lg ">
              <table className="w-full mb-12">
                <tbody>
                  <tr>
                    <th></th>
                    <th className="text-gray-500">Items</th>
                    <th className="text-gray-500">Qrt</th>
                    <th className="text-gray-500">Total</th>
                  </tr>
                  {holds[selectedForView]?.items?.length > 0 ? (
                    holds[selectedForView]?.items?.map((item, index) => (
                      <CartItem isReadOnly={true} item={item} key={index} />
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
              <div className="absolute bottom-0 right-0 flex items-center justify-center w-full h-12 gap-2 p-2 bg-white/50 backdrop-blur-md">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You want to delete order{" "}
                        <span className="font-semibold">
                          ID-{holds[selectedForView]?.id}
                        </span>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive hover:bg-destructive/80 text-destructive-foreground"
                        onClick={() => {
                          setIsDrawerDetailHoldOpen(false);
                          handleDelete(holds[selectedForView]?.id);
                        }}
                      >
                        <Trash2 />
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button
                  onClick={() => {
                    handlePrintInvoice(selectedForView);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-400"
                >
                  <ReceiptTextIcon className="w-4 h-4" />
                  <span>Print Invoice</span>
                </Button>
                <Button
                  onClick={() => {
                    handleEdit(selectedForView);
                  }}
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </Button>
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
