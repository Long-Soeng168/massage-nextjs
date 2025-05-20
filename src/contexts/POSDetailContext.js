"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Create the DetailContext
const DetailContext = createContext();

// Provider component for DetailContext
export function POSDetailProvider({ children }) {
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Stores the selected customer
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountType, setDiscountType] = useState("percentage");
  const [orderNote, setOrderNote] = useState(null); // Stores the selected customer
  const [isOpenDialog, setIsOpenDialog] = useState(false); // Stores the dialog open/close state

  const [successTitle, setSuccessTitle] = useState('Success');
  const [successMessage, setSuccessMessage] = useState(null);
  const [isOpenSuccessDialog, setIsOpenSuccessDialog] = useState(false);
  const [isShowBtnInSuccessDialog, setIsShowBtnInSuccessDialog] = useState(false);

  // Load initial editInvId from localStorage
  const [editInvId, setEditInvId] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("posEditInvId") || null;
    }
    return null;
  });

  // Sync editInvId to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (editInvId !== null) {
        localStorage.setItem("posEditInvId", editInvId);
      } else {
        localStorage.removeItem("posEditInvId");
      }
    }
  }, [editInvId]);

  return (
    <DetailContext.Provider
      value={{
        selectedCustomer,
        setSelectedCustomer,
        discountAmount,
        setDiscountAmount,
        discountType,
        setDiscountType,
        isOpenDialog,
        setIsOpenDialog,
        orderNote,
        setOrderNote,
        editInvId,
        setEditInvId,

        successTitle,
        setSuccessTitle,
        successMessage,
        setSuccessMessage,
        isOpenSuccessDialog,
        setIsOpenSuccessDialog,
        isShowBtnInSuccessDialog,
        setIsShowBtnInSuccessDialog
      }}
    >
      {children}
    </DetailContext.Provider>
  );
}

// Custom hook to use DetailContext
export function usePOSDetailContext() {
  const context = useContext(DetailContext);
  if (!context) {
    throw new Error("usePOSDetailContext must be used within a POSDetailProvider");
  }
  return context;
}
