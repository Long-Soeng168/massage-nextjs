"use client";

import { createContext, useContext, useState } from "react";

// Create the InvoiceContext
const InvoiceContext = createContext();

// Provider component for InvoiceContext
export function InvoiceProvider({ children }) {
  const [invoice, setInvoice] = useState(null); // Stores the ID of the invoice
  const [isOpenInvoiceDialog, setIsOpenInvoiceDialog] = useState(false); // Tracks if the invoice dialog is open

  return (
    <InvoiceContext.Provider
      value={{
        invoice,
        setInvoice,
        isOpenInvoiceDialog,
        setIsOpenInvoiceDialog,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}

// Custom hook to use InvoiceContext
export function useInvoiceContext() {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoiceContext must be used within an InvoiceProvider");
  }
  return context;
}
