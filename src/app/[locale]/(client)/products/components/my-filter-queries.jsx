"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

const MyFilterQueries = () => {
  const t = useTranslations("Index");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleDelete = (value, secondValue, thirdValue) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.delete(value);
      if (value == "search") {
        params.set(
          "is_delete_search",
          1 + Number(searchParams.get("is_delete_search"))
        );
      } else {
        params.delete("is_delete_search");
      }
      params.set("page", 1);
    }
    if(secondValue){
      params.delete(secondValue);
    }
    if(thirdValue){
      params.delete(thirdValue);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      {searchParams.get("search")?.toString() && (
        <div className="flex items-center pl-2 rounded-md bg-secondary">
          <span className="mr-2">
            {t("search")} : {searchParams.get("search")?.toString()}
          </span>
          <Button
            variant="secondary"
            size="icon"
            key={searchParams.get("search")?.toString()}
            onClick={() => handleDelete("search")}
            className="shadow-none hover:bg-primary group hover:text-primary-foreground"
          >
            <XIcon className="text-primary/50 group-hover:text-primary-foreground" />
          </Button>
        </div>
      )}
      {searchParams.get("category")?.toString() && (
        <div className="flex items-center pl-2 rounded-md bg-secondary">
          <span className="mr-2">
            {t("category")} : {searchParams.get("category")?.toString()}
          </span>
          <Button
            variant="secondary"
            size="icon"
            key={searchParams.get("category")?.toString()}
            onClick={() => handleDelete('categoryId', 'category')}
            className="shadow-none hover:bg-primary group hover:text-primary-foreground"
          >
            <XIcon className="text-primary/50 group-hover:text-primary-foreground" />
          </Button>
        </div>
      )}
      {searchParams.get("subCategory")?.toString() && (
        <div className="flex items-center pl-2 rounded-md bg-secondary">
          <span className="mr-2">
            {t("subCategory")} : {searchParams.get("subCategory")?.toString()}
          </span>
          <Button
            variant="secondary"
            size="icon"
            key={searchParams.get("subCategory")?.toString()}
            onClick={() => handleDelete('subCategoryId', 'subCategory')}
            className="shadow-none hover:bg-primary group hover:text-primary-foreground"
          >
            <XIcon className="text-primary/50 group-hover:text-primary-foreground" />
          </Button>
        </div>
      )}
      {searchParams.get("brand")?.toString() && (
        <div className="flex items-center pl-2 rounded-md bg-secondary">
          <span className="mr-2">
            {t("brand")} : {searchParams.get("brand")?.toString()}
          </span>
          <Button
            variant="secondary"
            size="icon"
            key={searchParams.get("brand")?.toString()}
            onClick={() => handleDelete('brandId', 'brand')}
            className="shadow-none hover:bg-primary group hover:text-primary-foreground"
          >
            <XIcon className="text-primary/50 group-hover:text-primary-foreground" />
          </Button>
        </div>
      )}
      {searchParams.get("publisher")?.toString() && (
        <div className="flex items-center pl-2 rounded-md bg-secondary">
          <span className="mr-2">
            {t("publisher")} : {searchParams.get("publisher")?.toString()}
          </span>
          <Button
            variant="secondary"
            size="icon"
            key={searchParams.get("publisher")?.toString()}
            onClick={() => handleDelete('publisherId', 'publisher')}
            className="shadow-none hover:bg-primary group hover:text-primary-foreground"
          >
            <XIcon className="text-primary/50 group-hover:text-primary-foreground" />
          </Button>
        </div>
      )}
      {searchParams.get("yearFrom")?.toString() && (
        <div className="flex items-center pl-2 rounded-md bg-secondary">
          <span className="mr-2">
            {t("fromYear")} : {searchParams.get("yearFrom")?.toString()}
          </span>
          <Button
            variant="secondary"
            size="icon"
            key={searchParams.get("yearFrom")?.toString()}
            onClick={() => handleDelete('yearFrom')}
            className="shadow-none hover:bg-primary group hover:text-primary-foreground"
          >
            <XIcon className="text-primary/50 group-hover:text-primary-foreground" />
          </Button>
        </div>
      )}
      {searchParams.get("yearTo")?.toString() && (
        <div className="flex items-center pl-2 rounded-md bg-secondary">
          <span className="mr-2">
            {t("toYear")} : {searchParams.get("yearTo")?.toString()}
          </span>
          <Button
            variant="secondary"
            size="icon"
            key={searchParams.get("yearTo")?.toString()}
            onClick={() => handleDelete('yearTo')}
            className="shadow-none hover:bg-primary group hover:text-primary-foreground"
          >
            <XIcon className="text-primary/50 group-hover:text-primary-foreground" />
          </Button>
        </div>
      )}
      {searchParams.get("priceFrom")?.toString() >= 0 && (
        <div className="flex items-center pl-2 rounded-md bg-secondary">
          <span className="mr-2">
            {t("fromPrice")} : {searchParams.get("priceFrom")?.toString()} {' $'}
          </span>
          <Button
            variant="secondary"
            size="icon"
            key={searchParams.get("priceFrom")?.toString()}
            onClick={() => handleDelete('priceFrom')}
            className="shadow-none hover:bg-primary group hover:text-primary-foreground"
          >
            <XIcon className="text-primary/50 group-hover:text-primary-foreground" />
          </Button>
        </div>
      )}
      {searchParams.get("priceTo")?.toString() && (
        <div className="flex items-center pl-2 rounded-md bg-secondary">
          <span className="mr-2">
            {t("toPrice")} : {searchParams.get("priceTo")?.toString()} {' $'}
          </span>
          <Button
            variant="secondary"
            size="icon"
            key={searchParams.get("priceTo")?.toString()}
            onClick={() => handleDelete('priceTo')}
            className="shadow-none hover:bg-primary group hover:text-primary-foreground"
          >
            <XIcon className="text-primary/50 group-hover:text-primary-foreground" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyFilterQueries;
