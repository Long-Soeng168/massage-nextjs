"use client";

import { Button } from "@/components/ui/button";
import { usePOSCart } from "@/contexts/POSContext";
import { ListChecksIcon } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Detail from "@/app/[locale]/admin/pos/components/Detail";
import { usePOSDetailContext } from "@/contexts/POSDetailContext";

const OrderButton = ({customers, payments}) => {
  const { cartItems } = usePOSCart();
  const [isHydrated, setIsHydrated] = React.useState(false);

  const {
      selectedCustomer,
      setSelectedCustomer,
      isOpenDialog,
      setIsOpenDialog,
      orderNote,
      setOrderNote,
    } = usePOSDetailContext();

  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <section className="lg:hidden">
      <Sheet
        modal={false}
        open={isOpenDialog}
        onOpenChange={(state) => setIsOpenDialog(state)} // Properly manage the open state
      >
        <SheetTrigger asChild>
          <Button
            onClick={() => setIsOpenDialog(true)}
            className="relative flex items-center border-[0.5px] h-11"
          >
            <ListChecksIcon />
            <span className="ml-2">Orders</span>
            {isHydrated && (
              <span className="absolute px-1.5 text-sm font-bold text-black bg-yellow-400 rounded-full right-2 -top-2">
                {cartItems?.length || 0}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full px-0 sm:max-w-auto">
          <SheetTitle className="hidden">Orders</SheetTitle>
          <SheetDescription className="hidden">Order Details</SheetDescription>
          <Detail customers={customers} payments={payments} />
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default OrderButton;
