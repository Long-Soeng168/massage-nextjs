"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import LottieAnimation from "../../../../../components/ui/lottie-animation";
import animationData from "/public/images/animations/success-animation2.json";
import { usePOSCart } from "@/contexts/POSContext";
import { IMAGE_BOOK_URL } from "@/config/env";
import { ImageDown, ImageIcon, ImageOff } from "lucide-react";

export default function Card({ product }) {
  const { addToCart, cartItems } = usePOSCart();
  const [isPlayAnimation, setIsPlayAnimation] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getProductQuantity = () => {
    const cartItem = cartItems?.find(
      (item) => item.id === product.id && item.type === "product"
    );
    return cartItem ? cartItem.quantity : 0;
  };

  const handleSelect = () => {
    addToCart({
      id: product.id,
      title: product.title,
      image: product.image,
      discount: product.discount || 0,
      price: product.price,
      type: "product",
    });
    setIsPlayAnimation(true);
    setTimeout(() => {
      setIsPlayAnimation(false);
    }, 1500);
  };

  const quantity = isMounted ? getProductQuantity() : 0;
  const hasDiscount = product.discount != 0 && product.discount != null;
  const discountedPrice = (
    product.price -
    product.price * (product.discount / 100)
  ).toFixed(2);

  return (
    <button
      onClick={handleSelect}
      className={`flex flex-col justify-start hover:scale-105 transition-all duration-300 h-full bg-white border-2 rounded-md shadow hover:border-primary dark:bg-gray-800 dark:border-gray-700 ${
        quantity > 0 ? "border-primary" : "border-white"
      } `}
    >
      <div className="relative w-full">
        {product.image ? (
          <Image
            className=" w-full rounded-tl-sm rounded-tr-sm h-full aspect-[1/1] object-cover"
            src={`${IMAGE_BOOK_URL}thumb/${product.image}`}
            alt={product.title || "Product Image"}
            width={100}
            height={100}
          />
        ) : (
          <div className="flex items-center justify-center w-full border rounded-sm bg-secondary aspect-square">
            <ImageIcon size={50} className="text-border" />
          </div>
        )}

        {hasDiscount && (
          <span className="absolute px-1.5 font-bold text-sm rounded-sm text-white bottom-1.5 left-1.5 bg-real_primary/80">
            - {product.discount}%
          </span>
        )}
        <span className="absolute px-1.5 py-0.5 text-xs rounded-tr-sm rounded-bl-sm text-white top-0 right-0 bg-real_primary/80">
          Product
        </span>
        {isPlayAnimation && quantity === 1 && (
          <span className="absolute -top-2 -right-2">
            <LottieAnimation
              animationData={animationData}
              className="w-[50px]"
            />
          </span>
        )}
        {quantity > 0 && isMounted && (
          <span className="absolute left-1.5 px-3 text-xs font-semibold text-primary border-2 rounded border-primary -top-[11px] bg-background">
            {quantity}
          </span>
        )}
      </div>
      <div className="px-1 pt-2">
        <div>
          <h5 className="text-sm text-gray-900 text-start line-clamp-2 dark:text-white">
            {product.title}
          </h5>
        </div>
        <div className="w-full text-right text-primary dark:text-gray-400">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <p
              className={`text-sm text-gray-600 ${
                hasDiscount ? "line-through" : "text-red-600"
              }`}
            >
              $ {product.price}
            </p>
            {hasDiscount && <p className="text-red-600">$ {discountedPrice}</p>}
          </div>
        </div>
      </div>
    </button>
  );
}
