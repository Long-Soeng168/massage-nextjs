import MyPagination from "@/components/my-pagination";
import ProductCard from "@/components/ui/my-product-card";
import { getKidBooks } from "@/services/books-services";
import React from "react";

const DataList = async ({
  currentPage,
  search,
  categoryId,
  subCategoryId,
  perPage,
  orderBy,
  orderDir,
  priceFrom,
  priceTo,
  yearFrom,
  yearTo,
  authorId,
  publisherId
}) => {
  let results = await getKidBooks({
    categoryId: categoryId,
    subCategoryId: subCategoryId,
    search: search,
    page: currentPage,
    perPage: perPage,
    orderBy: orderBy,
    orderDir: orderDir,
    priceFrom: priceFrom,
    priceTo: priceTo,
    yearFrom: yearFrom,
    yearTo: yearTo,
    authorId: authorId,
    publisherId: publisherId,
  });
  const books = results?.data;
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {books?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      {/* End books List */}

      <div className="flex items-center justify-between pt-8">
        <MyPagination
          links={results?.links}
          from={results?.from}
          to={results?.to}
          total={results?.total}
        />
      </div>
    </div>
  );
};

export default DataList;
