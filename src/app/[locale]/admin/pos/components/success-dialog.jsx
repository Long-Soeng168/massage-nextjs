"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import Lottie from "lottie-react";
import animationData from "/public/images/animations/success-animation.json";
import { Button } from "@/components/ui/button";
import { ReceiptTextIcon, X } from "lucide-react";
import { usePOSDetailContext } from "@/contexts/POSDetailContext";
import { useInvoiceContext } from "@/contexts/POSInvoiceContext";

export default function SuccessDialog({}) {
  const {
    successTitle,
    setSuccessTitle,
    successMessage,
    setSuccessMessage,
    isOpenSuccessDialog,
    setIsOpenSuccessDialog,
    isShowBtnInSuccessDialog,
    setIsShowBtnInSuccessDialog,
  } = usePOSDetailContext();
  const { invoice, setIsOpenInvoiceDialog } = useInvoiceContext();
  return (
    <Dialog
      open={isOpenSuccessDialog}
      onOpenChange={(state) => setIsOpenSuccessDialog(state)}
    >
      <DialogContent className="w-auto overflow-hidden">
        <DialogHeader>
          <DialogHeader className="flex items-center justify-center">
            <Lottie
              animationData={animationData}
              className="flex items-center justify-center w-60"
              loop={false}
            />
          </DialogHeader>
          <DialogTitle className="text-center">{successTitle}</DialogTitle>
          <DialogDescription className="text-center">
            {successMessage}
          </DialogDescription>
        </DialogHeader>
        {isShowBtnInSuccessDialog && (
          <DialogFooter className={`mt-4 gap-2`}>
            <Button
              onClick={() => setIsOpenSuccessDialog(false)}
              type="button"
              variant="outline"
            >
              <X />
              Close
            </Button>
            <Button type="button" onClick={() => setIsOpenInvoiceDialog(true)}>
              <ReceiptTextIcon />
              Print Invoice
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
