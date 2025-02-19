"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const MySetPerPage = () => {
  const t = useTranslations('Index');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelect = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("perPage", value);
      params.set("page", 1);
    } else {
      params.delete("perPage");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <Select
        onValueChange={(value) => handleSelect(value)}
        defaultValue={searchParams.get("perPage")?.toString() || '20'}
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder={`${t('showing')} : ${'perPage'}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10 {t('perPage')}</SelectItem>
          <SelectItem value="20">20 {t('perPage')}</SelectItem>
          <SelectItem value="30">30 {t('perPage')}</SelectItem>
          <SelectItem value="40">40 {t('perPage')}</SelectItem>
          <SelectItem value="50">50 {t('perPage')}</SelectItem>
          <SelectItem value="100">100 {t('perPage')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MySetPerPage;
