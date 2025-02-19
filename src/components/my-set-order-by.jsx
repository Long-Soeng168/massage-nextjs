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
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

const MySetOrderBy = () => {
  const t = useTranslations("Index");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelect = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      if (!searchParams.get("orderDir")) {
        params.set("orderDir", "desc");
      }
      params.set("orderBy", value);
      params.set("page", 1);
    } else {
      params.delete("orderBy");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSelectDir = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("orderDir", value);
      params.set("page", 1);
    } else {
      params.delete("orderDir");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex items-center gap-2">
      <Select
        onValueChange={(value) => handleSelect(value)}
        defaultValue={searchParams.get("orderBy")?.toString()}
      >
        <SelectTrigger className="w-auto pr-1">
          <SelectValue placeholder={`${t('sortBy')} : `} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="title">
            {t("sortBy")} : <span className="font-semibold">{t("title")}</span>
          </SelectItem>
          <SelectItem value="price">
            {t("sortBy")} : <span className="font-semibold">{t("price")}</span>
          </SelectItem>
          <SelectItem value="discount">
            {t("sortBy")} :{" "}
            <span className="font-semibold">{t("discount")}</span>
          </SelectItem>
          <SelectItem value="created_at">
            {t("sortBy")} :{" "}
            <span className="font-semibold">{t("postDate")}</span>
          </SelectItem>
          <SelectItem value="year">
            {t("sortBy")} :{" "}
            <span className="font-semibold">{t("publishedYear")}</span>
          </SelectItem>
          <SelectItem value="bestSelling">
            {t("sortBy")} :{" "}
            <span className="font-semibold">{t("bestSelling")}</span>
          </SelectItem>
          <SelectItem value="totalView">
            {t("sortBy")} :{" "}
            <span className="font-semibold">{t("totalView")}</span>
          </SelectItem>
        </SelectContent>
      </Select>
      <Select
        key={searchParams.get("orderDir")?.toString()}
        onValueChange={(value) => handleSelectDir(value)}
        defaultValue={searchParams.get("orderDir")?.toString()}
      >
        <SelectTrigger className="w-auto">
          <SelectValue placeholder={t('sortDirection')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">{t('ascending')}</SelectItem>
          <SelectItem value="desc">{t('descending')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MySetOrderBy;
