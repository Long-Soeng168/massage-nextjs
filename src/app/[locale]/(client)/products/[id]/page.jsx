import MyGallery from "@/components/my-gallery";
import MyKeyValueCard from "@/components/ui/my-key-value-card";
import { getBook } from "@/services/books-services";
import MyShowMoreText from "@/components/ui/my-show-more-text";
import moment from "moment";
import Link from "next/link";
import { Suspense } from "react";
import MyLoadingAnimation from "@/components/ui/my-loading-animation";
import MyAddToCart from "@/components/my-add-to-cart";
import MyBuyNowButton from "@/components/my-buy-now-button";
import RelatedProducts from "./components/related-products";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { BASE_API_URL, IMAGE_BOOK_URL } from "@/config/env";
import ScrollToTop from "@/components/scroll-to-top";
import MyReadPdfButton from "@/components/my-read-pdf-button";
import { EyeIcon } from "lucide-react";
import MyProductDetailBanner from "@/components/my-product-detail-banner";
import { getSlides } from "@/services/slides-services";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getBook({ id: id });
  return {
    title: product?.title,
    description: product?.short_description,
    openGraph: {
      title: product?.title,
      description: product?.short_description,
      images: [`${IMAGE_BOOK_URL + product?.image}`],
    },
  };
}

const ProductPage = async ({ params }) => {
  const locale = await getLocale();
  const t = await getTranslations("Index");
  const { id } = await params;
  const product = await getBook({ id: id });
  console.log(product);
  const image = IMAGE_BOOK_URL + product?.image;

  let images = [];
  if (product?.images?.length > 0) {
    images = product?.images.map((item) => IMAGE_BOOK_URL + item.image);
  }

  if (product == 404) {
    notFound();
  }

  const topSlides = (await getSlides({ position: "product_detail" })) || [];

  async function getBook() {
    const url = BASE_API_URL + `/books/${id}`;
    console.log(url);
    try {
      const response = await fetch(url, {
        next: {
          revalidate: 5,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch Book : ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }
  getBook();

  return (
    <div className="lg:flex">
      <ScrollToTop />
      <div className="w-full lg:flex-1">
        <div className="grid w-full grid-cols-12 gap-2 mx-auto mt-8">
          <div className="col-span-12 mx-6 mb-6 md:ml-0 md:col-span-4 md:px-0">
            <div className="pb-4 ">
              <MyGallery title={product?.title} images={[image, ...images]} />
            </div>
            {product?.file && <MyReadPdfButton product={product} />}
          </div>

          {/* Right Item */}
          <div className="col-span-12 px-6 md:col-span-8 md:px-0 allow-copy">
            <h1 className="block mt-1 mb-2 text-2xl leading-tight font-lg">
              {product?.title}
            </h1>
            <div className="flex gap-2 text-gray-400 dark:text-white">
              <EyeIcon /> {product?.view_count}
            </div>
            <div className="flex flex-col gap-6 my-6">
              <div className="flex flex-col gap-2">
                {product?.brand && (
                  <MyKeyValueCard title={t("brand")}>
                    <Link
                      className="hover:underline underline-offset-4 text-primary"
                      href={`/products?brandId=${product?.brand.id}&brand=${product?.brand.name}`}
                    >
                      {product?.brand.name}
                    </Link>
                  </MyKeyValueCard>
                )}
                {product?.publisher && (
                  <MyKeyValueCard title={t("publisher")}>
                    <Link
                      className="hover:underline underline-offset-4 text-primary"
                      href={`/products?publisherId=${product?.publisher.id}&publisher=${product?.publisher.name}`}
                    >
                      {product?.publisher.name}
                    </Link>
                  </MyKeyValueCard>
                )}

                {product?.category && (
                  <MyKeyValueCard title={t("category")}>
                    <Link
                      className="hover:underline underline-offset-4 text-primary"
                      href={`/products?categoryId=${
                        product?.category.id
                      }&category=${
                        locale == "kh"
                          ? product?.category?.name_kh
                          : product?.category?.name
                      }`}
                    >
                      {locale == "kh"
                        ? product?.category?.name_kh
                        : product?.category?.name}
                    </Link>
                    <p className="text-sm capitalize"></p>
                    {product?.sub_category && (
                      <>
                        <p className="mx-2"> / </p>
                        <Link
                          className="hover:underline underline-offset-4 text-primary"
                          href={`/products?categoryId=${
                            product?.category.id
                          }&subCategoryId=${
                            product?.sub_category.id
                          }&category=${
                            locale == "kh"
                              ? product?.category?.name_kh
                              : product?.category?.name
                          }&subCategory=${
                            locale == "kh"
                              ? product?.sub_category?.name_kh
                              : product?.sub_category?.name
                          }`}
                        >
                          {locale == "kh"
                            ? product?.sub_category?.name_kh
                            : product?.sub_category?.name}
                        </Link>
                      </>
                    )}
                  </MyKeyValueCard>
                )}
                {product?.year && (
                  <MyKeyValueCard
                    title={t("publishedYear")}
                    value={product?.year}
                  />
                )}
                {product?.number_of_pages && (
                  <MyKeyValueCard
                    title={t("pages")}
                    value={product?.number_of_pages}
                  />
                )}
                {product?.isbn && (
                  <MyKeyValueCard title={t("isbn")} value={product?.isbn} />
                )}
                {product?.tsin && (
                  <MyKeyValueCard title={t("tsin")} value={product?.tsin} />
                )}
                {product?.edition && (
                  <MyKeyValueCard
                    title={t("edition")}
                    value={product?.edition}
                  />
                )}
                {product?.language && (
                  <MyKeyValueCard
                    title={t("language")}
                    value={
                      product?.language == "khmer" ? t("khmer") : t("english")
                    }
                  />
                )}
                {/* {product?.created_at && (
                  <MyKeyValueCard
                    title={t("postDate")}
                    value={moment(product?.created_at).format(
                      "D - MMMM - YYYY"
                    )}
                  />
                )}
                {product?.updated_at && (
                  <MyKeyValueCard
                    title={t("lastUpdate")}
                    value={moment(product?.updated_at).format(
                      "D - MMMM - YYYY"
                    )}
                  />
                )} */}
              </div>
            </div>
            {product?.price > 0 && (
              <div className="my-4">
                {product?.discount != 0 ? (
                  <p className="space-x-4 text-2xl font-semibold text-gray-400 dark:text-white">
                    <span className="line-through">{product?.price} $</span>
                    <span className="text-red-500">
                      {product?.price -
                        (product?.discount / 100) * product?.price}{" "}
                      $
                    </span>
                  </p>
                ) : (
                  <p className="text-2xl font-semibold text-red-500">
                    {product?.price} $
                  </p>
                )}
              </div>
            )}

            {product?.price > 0 && (
              <div className="flex items-center gap-4 mb-8">
                <MyBuyNowButton product={product} />
                <MyAddToCart product={product} />
              </div>
            )}

            {product?.short_description && (
              <div className="allow-copy">
                <MyShowMoreText maxLine={4} text={product?.short_description} />
                <hr className="w-full my-8" />
              </div>
            )}
          </div>
        </div>
        {product?.description && (
          <div className="px-6 mb-10 md:px-0">
            <MyShowMoreText
              maxLine={10}
              text={product?.description}
              is_scroll={true}
            />
          </div>
        )}

        <Suspense fallback={<MyLoadingAnimation />}>
          <MyProductDetailBanner topSlides={topSlides} />
        </Suspense>

        <Suspense key={product?.category_id} fallback={<MyLoadingAnimation />}>
          <RelatedProducts categoryId={product?.category_id} />
        </Suspense>
      </div>
    </div>
  );
};

export default ProductPage;
