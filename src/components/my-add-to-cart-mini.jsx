"use client";
import React, { useState } from "react";
import { CheckCircle, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/contexts/CartContext";
import { useTranslations } from "next-intl";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MyAddToCartMini = ({ product }) => {
  const t = useTranslations("Index");
  const [isClick, setIsClick] = useState(false);
  const { addToCart } = useCart();

  const handleClick = () => {
    addToCart(product, false);
    setIsClick(true);
  };

  return (
    <div className="absolute z-50 opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 border border-white font-bold text-lg rounded-lg bottom-1.5 right-1.5">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild onClick={handleClick}>
            <div className="p-2 rounded-lg bg-primary text-primary-foreground">
              {isClick ? <CheckCircle /> : <ShoppingCart />}
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="mt-2">
            <p>{t('addToCart')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default MyAddToCartMini;
