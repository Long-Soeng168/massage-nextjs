'use client';
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { IMAGE_SLIDE_URL } from "@/config/env";
import Autoplay from "embla-carousel-autoplay";

const MySlideShowBottom = ({ className, bottomSlides }) => {
  return (
    <div className={className}>
      {bottomSlides.length > 0 && (
        <Carousel
          className="mt-2 lg:mt-4"
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          opts={{ align: "start", loop: false }}
        >
          <CarouselContent>
            {bottomSlides.map((slide) => (
              <CarouselItem
                key={slide.id}
                className="pl-2 lg:pl-4 basis-1/2 lg:basis-1/3"
              >
                <Link href={slide.link || "#"}>
                  <Image
                    className={`object-cover w-full transition-all duration-500 ${
                      slide.link
                        ? "hover:scale-95 border-primary hover:border-2"
                        : ""
                    }`}
                    width={1050}
                    height={300}
                    src={IMAGE_SLIDE_URL + slide.image}
                    alt={slide.name}
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="rounded-none max-md:hidden" />
          <CarouselNext className="rounded-none max-md:hidden" />
        </Carousel>
      )}
    </div>
  );
};

export default MySlideShowBottom;
