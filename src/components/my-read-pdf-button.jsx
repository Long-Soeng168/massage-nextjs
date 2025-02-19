'use client'
import React from "react";
import { Button } from "./ui/button";
import { BookOpenTextIcon } from "lucide-react";
import { BOOK_PDF_URL } from "@/config/env";

const MyReadPdfButton = ({ product }) => {
  const handleReadClick = () => {
    const pdfUrl = `${BOOK_PDF_URL}${product?.file}`;
    localStorage.setItem("pdfUrl", pdfUrl);
    window.location.href = "/pdf-viewer";
  };

  return (
    <>
      <Button
        onClick={handleReadClick}
        className="w-full"
        variant="destructive"
      >
        <BookOpenTextIcon /> Read
      </Button>
    </>
  );
};

export default MyReadPdfButton;
