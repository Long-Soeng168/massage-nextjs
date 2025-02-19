import React from "react";
import MyCategoryCard from "./ui/my-category-card";
import { getCategories } from "@/services/categories-services";
import { getLocale } from "next-intl/server";

const MyCategoryList = async ({className}) => {
  const locale = await getLocale();
  const categories = await getCategories({
    limit: 6,
    orderBy: "books_count",
    orderDir: "desc",
  });

  const colors = [
    "#60a5fa",
    "#3b82f6",
    "#818cf8",
    "#6366f1",
    "#a78bfa",
    "#8b5cf6",
  ];
  return (
    <div className={`grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6 ${className}`}>
      {categories?.map((category, index) => (
        <MyCategoryCard
          category={category}
          locale={locale}
          key={category.id}
          bgHoverColor={colors[index % colors.length]}
        />
      ))}
    </div>
  );
};

export default MyCategoryList;
