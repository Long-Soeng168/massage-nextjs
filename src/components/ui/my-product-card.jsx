// src/ProductCard.js
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IMAGE_BOOK_URL, PRODUCT_CARD_RATIO } from "@/config/env";
import MyAddToCartMini from "../my-add-to-cart-mini";
import { ImageIcon } from "lucide-react";

const ProductCard = ({ product, endpoint = "/products" }) => {
  return (
    <div className="flex flex-col items-stretch justify-between w-full h-full transition-all duration-500 rounded-lg group hover:scale-95">
      <div>
        <div className="relative mb-1 overflow-hidden">
          <Link href={`${endpoint}/${product.id}`}>
            {product.image ? (
              <Image
                width={600}
                height={600}
                className={`object-cover w-full border-[0.5px] border-primary rounded-md aspect-${PRODUCT_CARD_RATIO} font-moul`}
                src={IMAGE_BOOK_URL + "thumb/" + product.image}
                alt={product.title}
              />
            ) : (
              <div className={`flex items-center justify-center w-full border rounded-sm bg-secondary aspect-${PRODUCT_CARD_RATIO}`}>
                <ImageIcon size={72} className="text-border" />
              </div>
            )}
          </Link>
          {product.discount != 0 && product.discount != null && (
            <span className="absolute px-1.5 font-bold text-lg rounded-sm text-white bottom-1.5 left-1.5 bg-real_primary/80">
              - {product.discount}%
            </span>
          )}
          <MyAddToCartMini product={product} />
        </div>
        <Link href={`${endpoint}/${product.id}`}>
          {product.price > 0 && (
            <div className="flex flex-col justify-between mt-1 lg:items-center lg:flex-row">
              {product.discount != 0 && product.discount != null ? (
                <p className="space-x-2 overflow-hidden text-lg text-gray-400 text-ellipsis">
                  <span className="line-through">{product.price} $</span>
                  <span className="text-red-500">
                    {product.price - (product.discount / 100) * product.price} $
                  </span>
                </p>
              ) : (
                <p className="max-w-full overflow-hidden text-lg font-bold text-red-500 text-ellipsis">
                  {product.price} $
                </p>
              )}
              {/* <span className="flex">
            <Star className="h-4 text-yellow-400 fill-yellow-400" />
            <Star className="h-4 text-yellow-400 fill-yellow-400" />
            <Star className="h-4 text-yellow-400 fill-yellow-400" />
            <Star className="h-4 text-yellow-400 fill-yellow-400" />
            <Star className="h-4 text-gray-400" />
          </span> */}
            </div>
          )}

          <TooltipProvider delayDuration={0}>
            <Tooltip className="bg-blue-200">
              <TooltipTrigger className="w-full">
                <h3 className="text-md text-start text-foreground line-clamp-2">
                  {product.title}
                </h3>
                <h3 className="text-gray-400 text-md text-start line-clamp-2">
                  {product.short_description}
                </h3>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="text-sm bg-secondary text-secondary-foreground"
              >
                <p className="max-w-[25ch] leading-5  left-0 right-0">
                  {product.title}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>

        {/* <p className="mb-2 text-background-foreground line-clamp-2">{product.description}</p> */}
      </div>

      {/* <div className="flex justify-between">
        <Button variant="outline" size="icon" className="mt-2">
          <Heart />
        </Button>
        <Button variant="default" className="mt-2">
          <ShoppingCart />
          Add to cart
        </Button>
      </div> */}
    </div>
  );
};

export default ProductCard;
