import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { IMAGE_PROMOTION_URL } from "@/config/env";

const MyPromotions = async ({ promotions }) => {
  const t = await getTranslations('Index');
  return (
    <div className="grid gap-4 overflow-hidden lg:grid-cols-3">
      {/* Left Column (Book Promotion) */}
      <Link href={promotions[0].link} className="w-full col-span-1 p-4 bg-green-100 border-2 border-transparent hover:border-primary dark:bg-accent">
        <h2 className="mt-2 font-semibold text-md sm:text-lg line-clamp-3">
          {promotions[0].name}
        </h2>
        <p className="text-xs sm:text-sm line-clamp-6">{promotions[0].short_description}</p>
        {/* <p className="mt-1 text-xl text-indigo-500 uppercase hover:underline">
          {t('readMore')}
        </p> */}
        <div className="flex items-center justify-center">
          <Image
            width={300}
            height={300}
            src={IMAGE_PROMOTION_URL + promotions[0].image}
            alt=""
            className="object-contain w-full p-4 mt-4 aspect-square"
          />
        </div>
      </Link>

      {/* Right Column (Other Books) */}
      <div className="grid col-span-1 gap-4 lg:grid-cols-2 lg:col-span-2">
        {promotions?.slice(1)?.map((promotion, index) => {
          const backgroundClass =
            index === 2
              ? "bg-yellow-100"
              : index % 2 === 0
              ? "bg-blue-100"
              : "bg-pink-100";
          const isWideClass = index === 2 ? "sm:col-span-2" : "";

          return (
            <Link
              key={index}
              href={promotion.link}
              className={`grid border-2 border-transparent hover:border-primary grid-cols-2 gap-2 items-center p-4 ${backgroundClass} ${isWideClass} flex-row dark:bg-accent`}
            >
              <div>
                <h2 className="mt-2 font-semibold text-md sm:text-lg line-clamp-3">
                  {promotion.name}
                </h2>
                <p className="text-xs sm:text-sm line-clamp-6">
                  {promotion.short_description}
                </p>

                {/* <p className="text-lg text-indigo-500 uppercase hover:underline">
                  {t('readMore')}
                </p> */}
              </div>
              <div className="flex items-center justify-center flex-1">
                <Image
                  width={150}
                  height={150}
                  src={IMAGE_PROMOTION_URL + promotion.image}
                  alt=""
                  className="object-contain min-w-40"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MyPromotions;
