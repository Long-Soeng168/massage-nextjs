"use client";
import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    console.log('trigger scroll to top')
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Enables smooth scrolling
    });
  }, []);

  return null;
}
