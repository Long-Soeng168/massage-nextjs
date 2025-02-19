import React from "react";
import { getTranslations } from "next-intl/server";
import { SelectBrand } from "./select-brand";
import { getBrands } from "@/services/brands-services";

const MySelectFilter = async () => {
  const t = await getTranslations('Index');
  const resultsAutors = await getBrands();
  const brands = resultsAutors?.data;

  return (
    <div className="flex flex-col p-2 mt-4 border-t">
      <p className="text-sm font-bold text-primary">{t('brand')}</p>
      <SelectBrand brands={brands} />
    </div>
  );
};

export default MySelectFilter;
