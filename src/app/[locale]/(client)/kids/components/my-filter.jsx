"use client";

import { Button } from "@/components/ui/button";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const MyFilter = () => {
  const t = useTranslations('Index');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [yearFrom, setYearFrom] = useState(
    searchParams.get("yearFrom")?.toString() || ""
  );
  const [yearTo, setYearTo] = useState(
    searchParams.get("yearTo")?.toString() || ""
  );

  const [values, setValues] = useState([
    searchParams.get("priceFrom") || 0,
    searchParams.get("priceTo") || 100,
  ]);

  const handleSetFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.set("priceFrom", values[0]);
    params.set("priceTo", values[1]);
    params.set("yearFrom", yearFrom);
    params.set("yearTo", yearTo);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      {/* Date */}
      <div className="p-2 mt-4 border-t">
        <p className="text-sm font-bold text-primary">{t('publishedYear')}</p>
        <div className="flex items-center gap-2">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('from')}</p>
            <Input
              className="border border-primary"
              type="number"
              value={yearFrom}
              onChange={(e) => {
                setYearFrom(e.target.value);
              }}
            />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('to')}</p>
            <Input
              className="border border-primary"
              type="number"
              value={yearTo}
              onChange={(e) => {
                setYearTo(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="py-2 mt-4">
          <p className="mb-8 text-sm font-bold text-primary">{t('price')} ($)</p>
          <DualRangeSlider
            label={(value) => value}
            value={values}
            onValueChange={setValues}
            min={0}
            max={100}
            step={1}
          />
        </div>
        <Button onClick={() => handleSetFilter()} className="w-full mt-8">
          {t('applyFilter')}
        </Button>
      </div>
    </div>
  );
};

export default MyFilter;
