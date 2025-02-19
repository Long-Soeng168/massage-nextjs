import React, { Suspense } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MyHomeSidebar } from "@/components/my-home-sidebar";
import { getCategories } from "@/services/categories-services";
import DataList from "./components/data-list";
import MySetPerPage from "@/components/my-set-per-page";
import MySetOrderBy from "@/components/my-set-order-by";
import LoadingDataList from "./components/loading-data-list";
import MyFilter from "./components/my-filter";
import MySelectFilter from "./components/my-select-filter";
import MyLoadingAnimation from "@/components/ui/my-loading-animation";
import { getTranslations } from "next-intl/server";
import ScrollToTop from "@/components/scroll-to-top";
import MyFilterQueries from "./components/my-filter-queries";

const Page = async (props) => {
  const t = await getTranslations("Index");
  const categories = await getCategories({
    withSub: 1,
    orderBy: "name",
    orderDir: "asc",
  });

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
  const brandId = searchParams?.brandId || "";
  const publisherId = searchParams?.publisherId || "";

  return (
    <div className="flex">
      <ScrollToTop
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
          brandId +
          publisherId
        }
      />

      {/* Left Side */}
      <div className="hidden lg:flex">{leftSide()}</div>
      {/* Right Side */}
      <div className="flex-1 p-4 pt-4 space-y-2">
        {/* Start Bread */}
        {/* <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb> */}
        {/* End Bread */}

        {/* Start books Header */}
        {/* <div className="w-full">
          <MySearch placeholder={t('searchBooks')} />
        </div> */}
        <div className="flex flex-wrap justify-end gap-2">
          {/* Start Search */}
          {/* <div className="flex flex-1 border rounded-lg shadow-sm">
            <Input
              autoFocus
              className="border-none shadow-none min-w-40 focus-visible:ring-0"
              placeholder="Search..."
            />
            <Button variant="gosh" size="icon">
              <Search className="h-[1.2rem] w-[1.2rem] " />
              <span className="sr-only">Search</span>
            </Button>
          </div> */}

          {/* End Search */}
          <div className="flex flex-wrap items-center justify-end gap-2">
            <MySetOrderBy />
            <MySetPerPage />
            {/* <span className="flex gap-2">
              <Button variant="outline" size="icon">
                <LucideLayoutGrid />
              </Button>
              <Button variant="outline" size="icon">
                <LayoutListIcon />
              </Button>
            </span> */}
            {/* Filter */}
            <span
              className="lg:hidden"
              key={
                " " +
                categoryId +
                subCategoryId +
                priceFrom +
                priceTo +
                yearFrom +
                yearTo +
                brandId +
                publisherId
              }
            >
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    {t("filter")}
                    <Filter />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-auto overflow-y-scroll">
                  <SheetHeader>
                    <SheetTitle>{t("filter")}</SheetTitle>
                  </SheetHeader>
                  {leftSide()}
                </SheetContent>
              </Sheet>
            </span>
          </div>
        </div>
        {/* End books Header */}

        {/* Start All Filter Query */}
        <MyFilterQueries key={
            "filter-queries-key" +
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
            brandId +
            publisherId
          } />
        {/* End All Filter Query */}

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
            brandId +
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
            brandId={brandId}
            publisherId={publisherId}
          />
        </Suspense>
      </div>
    </div>
  );

  function leftSide() {
    return (
      <div className="flex flex-col w-64 pt-2 mb-10">
        <MyHomeSidebar
          key={"categories-components" + categoryId + subCategoryId}
          categories={categories}
        />
        <Suspense
          key={brandId + publisherId}
          fallback={<MyLoadingAnimation />}
        >
          <MySelectFilter />
        </Suspense>
        {/* Price */}
        <div key={" " + priceFrom + priceTo + yearFrom + yearTo}>
          <MyFilter />
        </div>
      </div>
    );
  }
};

export default Page;
