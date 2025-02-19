"use client";
import React from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/contexts/CartContext";
import { useTranslations } from "next-intl";

const MyAddToCart = ({ product }) => {
  const t = useTranslations('Index');
  const { addToCart } = useCart();

  return (
    <div>
      <Button onClick={() => addToCart(product)}>
        <ShoppingCart />{t('addToCart')}
      </Button>
    </div>
  );
};

export default MyAddToCart;
