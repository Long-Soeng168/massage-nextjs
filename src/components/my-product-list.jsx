// src/Products.js
import React from "react";
import ProductCard from "./ui/my-product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const MyProductsList = ({ books, showNavigateButton = true }) => {
  return (
    <>
      {books?.length > 0 && (
        <Carousel>
          <CarouselContent>
            {books.map((book) => (
              <CarouselItem
                className="basis-1/2 md:basis-1/3 xl:basis-1/6"
                key={book.id}
              >
                <ProductCard product={book} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {showNavigateButton && (
            <>
              <CarouselPrevious className="-translate-y-16 rounded-sm " />
              <CarouselNext className="-translate-y-16 rounded-sm" />
            </>
          )}
        </Carousel>
      )}
    </>
  );
};

export default MyProductsList;
