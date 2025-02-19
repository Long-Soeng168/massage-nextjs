"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import {
  getCategories,
  getCategoryHasMostBooks,
} from "@/services/categories-services";

const MyCartButtonHeader = () => {
  const { getTotalItemCount } = useCart();
  const [itemsCount, setItemsCount] = useState(0);

  useEffect(() => {
    setItemsCount(getTotalItemCount());
  }, [getTotalItemCount]); // Depend on getTotalItemCount to update items count

  return (
    <Button variant="outline" size="icon" className="relative">
      <Link href="/cart">
        <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Cart</span>
      </Link>
      <span className="absolute px-1.5 bg-yellow-400 rounded-full right-0.5 -top-3">
        {itemsCount}
      </span>
    </Button>
  );
};

export default MyCartButtonHeader;
