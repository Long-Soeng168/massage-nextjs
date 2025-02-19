import { ScrollArea } from "@/components/ui/scroll-area";
import { IMAGE_BOOK_URL, PRODUCT_CARD_RATIO } from "@/config/env";
import { getBestSellingBooks } from "@/services/books-services";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BestSelling = async () => {
  const resultBestSellingBooks = await getBestSellingBooks({ limit: 10 });
  let bestSelling = resultBestSellingBooks?.first_set || [];
  return (
    <ScrollArea className="h-[100vh] mt-2 w-64 rounded-md">
      {bestSelling?.map((book) => (
        <Link
          key={book.id}
          href={`/products/${book.id}`}
          className="group mb-2 bg-white dark:bg-primary/10 overflow-hidden rounded-sm items-start grid grid-cols-[62px,1fr] gap-2"
          prefetch={false}
        >
          <Image
            width={50}
            height={50}
            className={`object-cover w-full h-full aspect-${PRODUCT_CARD_RATIO}`}
            src={IMAGE_BOOK_URL + book.image}
            alt={"Image's book"}
          />

          <div className="py-1 pr-2">
            <h4 className="font-medium text-md group-hover:underline line-clamp-1">
              {book.title}
            </h4>
            <p className="text-sm text-gray-400 line-clamp-2">
              {book.short_description} $
            </p>
            {book.discount != 0 ? (
              <p className="space-x-2 overflow-hidden text-xs text-gray-400 text-ellipsis">
                <span className="line-through">{book.price} $</span>
                <span className="text-red-400">
                  {book.price - (book.discount / 100) * book.price} $
                </span>
              </p>
            ) : (
              <p className="max-w-full overflow-hidden text-xs font-bold text-red-400 text-ellipsis">
                {book.price} $
              </p>
            )}
          </div>
        </Link>
      ))}
    </ScrollArea>
  );
};

export default BestSelling;
