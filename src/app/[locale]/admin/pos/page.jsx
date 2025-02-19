import POSHeader from "./components/pos-header";
import POSFilter from "./components/pos-filter";
import DataList from "./components/data-list";
import Detail from "./components/Detail";
import { Suspense } from "react";
import MyLoadingAnimation from "@/components/ui/my-loading-animation";
import { getCategories } from "@/services/categories-services";
import SuccessDialog from "./components/success-dialog";
import { getPayments } from "@/services/payments-services";
import InvoiceDialog from "./components/invoice-dialog";

export default async function Home(props) {
  const categories = await getCategories({
    orderBy: "name",
    orderDir: "asc",
  });

  const payments = await getPayments();

  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const currentPage = searchParams?.page || "1";
  const perPage = searchParams?.perPage || "24";
  const categoryId = searchParams?.categoryId || "";
  const subCategoryId = searchParams?.subCategoryId || "";
  const orderBy = searchParams?.orderBy || "id";
  const orderDir = searchParams?.orderDir || "asc";
  const priceFrom = searchParams?.priceFrom || "";
  const priceTo = searchParams?.priceTo || "";
  const yearFrom = searchParams?.yearFrom || "";
  const yearTo = searchParams?.yearTo || "";
  const authorId = searchParams?.authorId || "";
  const publisherId = searchParams?.publisherId || "";
  const itemType = searchParams?.itemType || "products";

  return (
    <>
      <div className="flex mx-auto max-w-[1920px] ">
        <div className="flex-1 h-screen overflow-x-auto overflow-y-auto custom-scrollbar">
          <div className="sticky top-0 z-50 bg-white/50 backdrop-blur-md">
            <POSHeader payments={payments} />
          </div>
          {itemType == "products" && <POSFilter categories={categories} />}
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
              publisherId +
              itemType
            }
            fallback={<MyLoadingAnimation />}
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
              itemType={itemType}
            />
          </Suspense>
        </div>
        <div className="hidden lg:px-2 lg:border-x-2 border-primary w-[450px] lg:block">
          <Detail payments={payments} />
        </div>
      </div>
      <InvoiceDialog />
      <SuccessDialog />
      {/* 
      <main className="mx-auto md:grid md:grid-cols-12 max-w-screen-2xl">
        <section className="col-span-12 md:col-span-9 "></section>
        <section className="hidden ml-2 md:grid md:col-span-3">
        </section>
      </main> */}
    </>
  );
}
