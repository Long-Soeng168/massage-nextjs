import { MyHomeSidebar } from "@/components/my-home-sidebar";
import { getCategories } from "@/services/categories-services";
import React from "react";

const Categories = async () => {
  const categories = await getCategories({
    withSub: 1,
    orderBy: "name",
    orderDir: "asc",
  });

  return (
    <>
      <MyHomeSidebar categories={categories} />
    </>
  );
};

export default Categories;
