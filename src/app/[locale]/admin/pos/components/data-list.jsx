import Card from "@/app/[locale]/admin/pos/components/Card";
import MyPagination from "@/components/my-pagination";
import { getBooks, getPackages, getServices } from "@/services/books-services";
import ServiceCard from "./ServiceCard";
import PackageCard from "./PackageCard";

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
  publisherId,
  itemType,
}) => {
  let products = [];
  let services = [];
  let packages = [];
  let fetchedResults = null;

  if (itemType == "packages") {
    let results = await getPackages({
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
    fetchedResults = results;
    packages = results?.data;
  } else if (itemType == "services") {
    let results = await getServices({
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
    fetchedResults = results;
    services = results?.data;
  } else {
    let results = await getBooks({
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
    fetchedResults = results;
    products = results?.data;
  }

  return (
    <>
      <div className="grid items-start justify-start w-full grid-cols-2 gap-4 px-2 pr-4 my-4 mb-10 sm:grid-cols-3 xl:grid-cols-6 lg:grid-cols-4">
        {products.length > 0 &&
          products?.map((item, index) => <Card key={index} product={item} />)}
        {services.length > 0 &&
          services?.map((item, index) => <ServiceCard key={index} product={item} />)}
        {packages.length > 0 &&
          packages?.map((item, index) => <PackageCard key={index} product={item} />)}
      </div>
      <div className="flex items-center justify-between px-2 mb-8">
        <MyPagination
          links={fetchedResults?.links}
          from={fetchedResults?.from}
          to={fetchedResults?.to}
          total={fetchedResults?.total}
        />
      </div>
    </>
  );
};

export default DataList;
