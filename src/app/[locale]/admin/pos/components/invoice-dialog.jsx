"use client";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileDown, ReceiptTextIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import html2pdf from "html2pdf.js";
import { useInvoiceContext } from "@/contexts/POSInvoiceContext";
import Invoice80mm from "./invoice80mm";
import InvoiceA4 from "./invoice-a4";
import InvoiceQuotation from "./invoice-quotation";

const InvoiceDialog = () => {
  const [printSize, setPrintSize] = React.useState("80");
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);
  const { invoice, setInvoice, isOpenInvoiceDialog, setIsOpenInvoiceDialog } =
    useInvoiceContext();

  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });

  const handleDownloadPDF = () => {
    const element = contentRef.current;
    const options = {
      margin: 0.5,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 4 },
      jsPDF: {
        unit: "mm",
        format: printSize === "80" ? "letter" : "A4",
        orientation: "portrait",
      },
    };

    html2pdf().set(options).from(element).save();
  };
  if (!invoice || !isClient) {
    return null;
  }
  return (
    <div>
      <Dialog
        open={isOpenInvoiceDialog}
        onOpenChange={(state) => setIsOpenInvoiceDialog(state)}
      >
        <DialogTrigger className="hidden p-4 border-2 rounded-md">
          Open
        </DialogTrigger>
        <DialogContent
          className="h-screen max-h-[90vh]"
          closeBtnClassName="-top-0.5 -right-0.5"
        >
          <DialogHeader className={`hidden`}>
            <DialogTitle />
            <DialogDescription />
          </DialogHeader>
          {printSize === "80" ? (
            <Invoice80mm
              contentRef={contentRef}
              invoice={invoice}
            />
          ) : printSize === "quote" ? (
            <InvoiceQuotation
              contentRef={contentRef}
              invoice={invoice}
            />
          ) : (
            <InvoiceA4
              contentRef={contentRef}
              invoice={invoice}
            />
          )}

          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              className="bg-secondary"
              onClick={() => setIsOpenInvoiceDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="outline" onClick={handleDownloadPDF}>
              <FileDown />
              Download PDF
            </Button>
            <Button onClick={reactToPrintFn}>
              <ReceiptTextIcon />
              Print
            </Button>
          </div>
          <div className="absolute top-0 space-x-1 left-6">
            <button
              size="icon"
              onClick={() => setPrintSize("80")}
              className={`px-1 text-sm border ${
                printSize == "80"
                  ? "text-gray-100 bg-black"
                  : "text-gray-950 bg-gray-200"
              } rounded-sm`}
            >
              80mm
            </button>
            <button
              size="icon"
              onClick={() => setPrintSize("a4")}
              className={`px-1 text-sm border ${
                printSize == "a4"
                  ? "text-gray-100 bg-black"
                  : "text-gray-950 bg-gray-200"
              } rounded-sm`}
            >
              A4
            </button>
            {invoice?.status !== 1 && (
              <button
                size="icon"
                onClick={() => setPrintSize("quote")}
                className={`px-1 text-sm border ${
                  printSize == "quote"
                    ? "text-gray-100 bg-black"
                    : "text-gray-950 bg-gray-200"
                } rounded-sm`}
              >
                Quote
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoiceDialog;
