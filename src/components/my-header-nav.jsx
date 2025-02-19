"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { AlignLeft, ChevronRight, ImageIcon } from "lucide-react";
import MyCategoryPanel from "./my-categories-panel";
import {
  IMAGE_BOOK_URL,
  IS_SHOW_KID_BOOKS,
  PRODUCT_CARD_RATIO,
} from "@/config/env";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";

export function MyHeaderNav({ categories, categoryMostBook }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const t = useTranslations("Index");
  const locale = useLocale();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem
          aria-hidden={true}
          key={
            "catePanelKey" +
            searchParams.get("productTitle") +
            searchParams.get("categoryId") +
            searchParams.get("subCategoryId")
          }
          className="h-full border border-white rounded-lg"
        >
          <span>
            <NavigationMenuTrigger>
              <AlignLeft size={18} className="mr-1" /> {t("categories")}
            </NavigationMenuTrigger>
          </span>
          <NavigationMenuContent>
            <MyCategoryPanel categoriesData={categories} />
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* <NavigationMenuItem key={params}>
          <NavigationMenuTrigger>
            <AlignLeft size={18} className="mr-1" /> Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            {categories?.length > 0 && (
              <ul className="grid w-[400px] gap-2 p-1 md:w-[400px] md:grid-cols-3 lg:w-[600px] ">
                {categories?.map((category) => (
                  <Link href="/products" key={category.id}>
                    <div className="flex items-center h-full p-1 transition-shadow duration-300 rounded cursor-pointer hover:bg-primary/10 ">
                      <div className="p-0.5 mr-1 rounded bg-white dark:bg-gray-200">
                        <Image
                          className={`aspect-square object-contain`}
                          width={30}
                          height={30}
                          src={IMAGE_CATE_URL + category.image}
                          alt=""
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100">
                          {category.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {category.books_count
                            ? category.books_count + "+ Books"
                            : ""}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </ul>
            )}
          </NavigationMenuContent>
        </NavigationMenuItem> */}

        {categoryMostBook?.books?.length > 0 && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {locale == "kh"
                ? categoryMostBook?.name_kh
                : categoryMostBook?.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="border rounded-lg shadow bg-background">
              <ul className="grid  p-4 space-x-4 items-start w-[500px] grid-cols-[.65fr_1fr]">
                <li className="row-span-2">
                  <Link
                    href={`/products/${categoryMostBook?.books[0].id}`}
                    className="flex flex-col items-stretch justify-between w-full transition-all duration-500 rounded-lg group"
                  >
                    <div>
                      <div className="relative">
                        {categoryMostBook?.books[0].image ? (
                          <Image
                            width={100}
                            height={100}
                            className={`object-cover border-[0.5px] border-primary w-full rounded-md aspect-${PRODUCT_CARD_RATIO}`}
                            src={
                              IMAGE_BOOK_URL +
                              "thumb/" +
                              categoryMostBook?.books[0].image
                            }
                            alt={categoryMostBook?.books[0].title}
                          />
                        ) : (
                          <div
                            className={`flex items-center justify-center w-full border rounded-sm bg-secondary aspect-${PRODUCT_CARD_RATIO}`}
                          >
                            <ImageIcon size={70} className="text-border" />
                          </div>
                        )}
                        {categoryMostBook?.books[0]?.discount != 0 &&
                          categoryMostBook?.books[0]?.discount != null && (
                            <span className="absolute px-1.5 font-bold text-lg rounded-sm text-white bottom-1.5 left-1.5 bg-primary/80">
                              - {categoryMostBook?.books[0]?.discount}%
                            </span>
                          )}
                      </div>
                      <div className="flex flex-col justify-between p-1 lg:items-center lg:flex-row">
                        {categoryMostBook?.books[0]?.discount != 0 &&
                        categoryMostBook?.books[0]?.discount != null ? (
                          <p className="space-x-2 overflow-hidden text-lg text-gray-400 text-ellipsis">
                            <span className="line-through">
                              {categoryMostBook?.books[0]?.price} $
                            </span>
                            <span className="text-red-500">
                              {categoryMostBook?.books[0]?.price -
                                (categoryMostBook?.books[0]?.discount / 100) *
                                  categoryMostBook?.books[0]?.price}{" "}
                              $
                            </span>
                          </p>
                        ) : (
                          <p className="max-w-full overflow-hidden text-lg font-bold text-red-500 text-ellipsis">
                            {categoryMostBook?.books[0]?.price} $
                          </p>
                        )}
                      </div>
                      <h3 className="text-sm group-hover:underline text-start text-foreground line-clamp-3">
                        {categoryMostBook?.books[0].title}
                      </h3>
                      {/* <p className="text-sm text-gray-400 line-clamp-3">
                        {categoryMostBook?.books[0].short_description} $
                      </p> */}
                    </div>
                  </Link>
                </li>
                <li className="flex flex-col gap-2 ">
                  {categoryMostBook?.books?.slice(1).map((book) => (
                    <Link
                      key={book.id}
                      href={`/products/${book.id}`}
                      className="group items-start grid grid-cols-[62px,1fr] gap-2"
                      prefetch={false}
                    >
                      {book.image ? (
                        <Image
                          width={50}
                          height={50}
                          className={`object-cover rounded-sm border-[0.5px] border-primary w-full aspect-${PRODUCT_CARD_RATIO}`}
                          src={IMAGE_BOOK_URL + "thumb/" + book.image}
                          alt={"Image's book"}
                        />
                      ) : (
                        <div
                          className={`flex items-center justify-center w-full border rounded-sm bg-secondary aspect-${PRODUCT_CARD_RATIO}`}
                        >
                          <ImageIcon size={42} className="text-border" />
                        </div>
                      )}

                      <div>
                        <h4 className="text-sm group-hover:underline line-clamp-2">
                          {book.title}
                        </h4>
                        {/* <p className="text-sm text-gray-400 line-clamp-2">
                          {book.short_description} $
                        </p> */}
                        {book.discount != 0 && book.discount != null ? (
                          <p className="space-x-2 overflow-hidden text-gray-400 text-md text-ellipsis">
                            <span className="line-through">{book.price} $</span>
                            <span className="text-red-500">
                              {book.price - (book.discount / 100) * book.price}{" "}
                              $
                            </span>
                          </p>
                        ) : (
                          <p className="max-w-full overflow-hidden font-bold text-red-500 text-md text-ellipsis">
                            {book.price} $
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </li>
                <li>
                  <Link
                    href={`/products?categoryId=${
                      categoryMostBook?.id
                    }&category=${
                      locale == "kh"
                        ? categoryMostBook?.name_kh
                        : categoryMostBook?.name
                    }`}
                    className="flex justify-end text-primary hover:underline"
                  >
                    {t("seeMore")} <ChevronRight />
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}

        {/*         
        <NavigationMenuItem>
          <Link href="/profiles/authors" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Authors
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/profiles/publishers" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Publishers
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
        <div className="w-[1px] h-6 bg-white/80"></div>
        <NavigationMenuItem
          className={`${
            pathName == "/products" && "underline underline-offset-4"
          }`}
        >
          <Link href="/products" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {t("products")}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {IS_SHOW_KID_BOOKS && (
          <NavigationMenuItem
            className={`${
              pathName == "/kids" && "underline underline-offset-4"
            }`}
          >
            <Link href="/kids" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {t("kidBooks")}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )}

        <NavigationMenuItem
          className={`${
            pathName == "/blogs" && "underline underline-offset-4"
          }`}
        >
          <Link href="/blogs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {t("news")}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem
          className={`${
            pathName == "/contact" && "underline underline-offset-4"
          }`}
        >
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {t("contact")}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem
          className={`${
            pathName == "/about" && "underline underline-offset-4"
          }`}
        >
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {t("about")}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = ({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {/* <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
          </p> */}
        </a>
      </NavigationMenuLink>
    </li>
  );
};
ListItem.displayName = "ListItem";
