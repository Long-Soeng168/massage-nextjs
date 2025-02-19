"use client";
import React from "react";
import { CircleCheckBig } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const MyBuyNowButton = ({ product }) => {
  const t = useTranslations('Index');
  const { addToCart } = useCart();
  const router = useRouter(); // Get the router object from Next.js

  const handleClick = () => {
    addToCart(product, false);
    router.push("/cart"); // Use Next.js client-side navigation instead of window.location.href
  };

  return (
    <div>
      <Button variant="outline" onClick={handleClick} aria-label="Add to cart">
        <CircleCheckBig /> {t('buyNow')}
      </Button>
    </div>
  );
};

export default MyBuyNowButton;
