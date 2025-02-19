import MyPagination from "@/components/my-pagination";
import ProductCard from "@/components/ui/my-product-card";
import { getBooks } from "@/services/books-services";
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
  brandId,
  publisherId,
}) => {
  let books = [];
  let results = null;
  let errorMessage = "";

  try {
    results = await getBooks({
      categoryId,
      subCategoryId,
      search,
      page: currentPage,
      perPage,
      orderBy,
      orderDir,
      priceFrom,
      priceTo,
      yearFrom,
      yearTo,
      brandId,
      publisherId,
    });

    books = results?.data || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    errorMessage = "Failed to load books. Please try again later.";
  }

  return (
    <div>
      {/* Books Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : books?.length > 0 ? (
          books?.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))
        ) : (
          <p>No Data...</p>
        )}
      </div>
      {/* End Books List */}

      {/* Pagination */}
      {results && results?.links && (
        <div className="flex items-center justify-between pt-8">
          <MyPagination
            links={results.links}
            from={results.from}
            to={results.to}
            total={results.total}
          />
        </div>
      )}
    </div>
  );
};

export default DataList;
