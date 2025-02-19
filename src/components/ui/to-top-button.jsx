"use client";

import { useState, useEffect } from "react";
import { Button } from "./button";
import { ChevronUp } from "lucide-react";

export default function ToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 300 && currentScrollY > lastScrollY) {
        // Show when scrolling down and scrolled more than 300px
        setIsVisible(true);
      } else {
        // Hide when scrolling up
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          size='icon'
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "90px",
            right: "25px",
            zIndex: 1000,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <ChevronUp />
        </Button>
      )}
    </>
  );
}
