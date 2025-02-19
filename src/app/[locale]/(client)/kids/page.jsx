import React, { Suspense } from "react";
import { getCategories } from "@/services/categories-services";
import DataList from "./components/data-list";
import LoadingDataList from "./components/loading-data-list";
import { getTranslations } from "next-intl/server";
import MyKidsSearch from "@/components/ui/my-kids-search";
import ScrollToTop from "@/components/scroll-to-top";

const Page = async (props) => {
  const t = await getTranslations('Index');
  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const currentPage = searchParams?.page || "1";
  const perPage = searchParams?.perPage || "20";
  const categoryId = searchParams?.categoryId || "";
  const subCategoryId = searchParams?.subCategoryId || "";
  const orderBy = searchParams?.orderBy || "";
  const orderDir = searchParams?.orderDir || "";
  const priceFrom = searchParams?.priceFrom || "";
  const priceTo = searchParams?.priceTo || "";
  const yearFrom = searchParams?.yearFrom || "";
  const yearTo = searchParams?.yearTo || "";
  const authorId = searchParams?.authorId || "";
  const publisherId = searchParams?.publisherId || "";

  return (
    <div className="flex">
      <ScrollToTop key={' ' + currentPage} />

      <div className="flex-1 p-4 pt-4 space-y-2">
        {/* Start books Header */}
        <div className="w-full">
          <MyKidsSearch placeholder={t('searchBooks')} />
        </div>
        {/* End books Header */}

        {/* Start books List */}
        <Suspense
          key={
            " " +
            search +
            currentPage +
            perPage +
            categoryId +
            subCategoryId +
            orderBy +
            orderDir +
            priceFrom +
            priceTo +
            yearFrom +
            yearTo +
            authorId +
            publisherId
          }
          fallback={<LoadingDataList />}
        >
          <DataList
            currentPage={currentPage}
            perPage={perPage}
            search={search}
            categoryId={categoryId}
            subCategoryId={subCategoryId}
            orderBy={orderBy}
            orderDir={orderDir}
            priceFrom={priceFrom}
            priceTo={priceTo}
            yearFrom={yearFrom}
            yearTo={yearTo}
            authorId={authorId}
            publisherId={publisherId}
          />
        </Suspense>
      </div>
    </div>
  );

  // function leftSide() {
  //   return (
  //     <div className="flex flex-col w-64 pt-2 mb-10">
  //       <MyHomeSidebar
  //         key={"categories-components" + categoryId + subCategoryId}
  //         categories={categories}
  //       />
  //       <Suspense
  //         key={authorId + publisherId}
  //         fallback={<MyLoadingAnimation />}
  //       >
  //         <MySelectFilter />
  //       </Suspense>
  //       {/* Price */}
  //       <div key={" " + priceFrom + priceTo + yearFrom + yearTo}>
  //         <MyFilter />
  //       </div>
  //     </div>
  //   );
  // }
};

export default Page;
