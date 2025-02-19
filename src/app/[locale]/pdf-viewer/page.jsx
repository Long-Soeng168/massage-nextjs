"use client";

import React, { useState, useEffect } from "react";
import PDFViewer from "@/components/pdf-viewer"; // Import your PDFViewer component
import Link from "next/link";
import Image from "next/image";
import MySearch from "@/components/ui/my-search";
import { notFound } from "next/navigation";
import { APP_LOGO, APP_NAME, APP_NAME_KH } from "@/config/website-detail";

const Page = () => {
  const [isClient, setIsClient] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  useEffect(() => {
    setIsClient(true);

    const url = localStorage.getItem("pdfUrl");
    setPdfUrl(url);
    // console.log(url);
  }, []);

  if (!isClient) {
    // If it's not the client side, return null (or a loading indicator)
    return null;
  }
  console.log("running on client");
  if (pdfUrl == null) {
    notFound();
  }

  return (
    <div>
      {/* Start Logo */}
      <div className="flex px-1 items-center gap-10 justify-between w-full h-[50px] bg-background">
        <Link href="/" className="flex items-center gap-2 overflow-hidden">
          <Image
            className="object-contain rounded-md"
            src={APP_LOGO}
            width={66}
            height={66}
            alt="Logo Image"
          />
          <div>
            <p className="text-xs font-bold text-primary md:text-sm max-w-26">
              {APP_NAME_KH}
            </p>
            <p className="text-xs font-semibold text-primary md:text-xs max-w-26">
              {APP_NAME}
            </p>
          </div>
        </Link>
        <MySearch />
      </div>
      {/* Render the PDFViewer only on the client */}
      <div className="no-tailwind">
        <PDFViewer pdfUrl={pdfUrl} />
      </div>
    </div>
  );
};

export default Page;
