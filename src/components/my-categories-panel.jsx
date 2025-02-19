import { IMAGE_BOOK_URL, IMAGE_CATE_URL, PRODUCT_CARD_RATIO } from "@/config/env";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronRight, ImageIcon } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { useLocale, useTranslations } from "next-intl";

const MyCategoryPanel = ({ categoriesData }) => {
  const t = useTranslations("Index");
  const locale = useLocale();
  const router = useRouter();
  if (!categoriesData || categoriesData.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-300">
        {t("noData")}
      </div>
    );
  }

  const [activeCategory, setActiveCategory] = useState(
    categoriesData[0]?.name || null
  );
  const [activeSubCategory, setActiveSubCategory] = useState(
    categoriesData[0]?.sub_categories[0]?.name || null
  );

  const [hoveredCateId, sethoveredCateId] = useState(null);

  return (
    <div className="flex max-w-[99vw] w-[1280px] bg-transparent border-none">
      {/* Main Categories */}
      <ScrollArea className="w-1/4 shrink-0 max-h-[80vh] rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
        {categoriesData.map((category, index) => (
          <div
            key={category.id}
            role="button"
            onMouseEnter={() => {
              setActiveCategory(category.name);
              sethoveredCateId(category.id);
              setActiveSubCategory(
                categoriesData[index]?.sub_categories[0]?.name || null
              );
            }}
            onClick={() => {
              router.push(`/products?categoryId=${category.id}`);
            }}
            className={`p-1 rounded hover:bg-primary/10 rounded-tl items-center rounded-bl flex gap-1 w-full hover:underline cursor-pointer ${
              activeCategory === category.name
                ? "bg-gray-300 dark:bg-gray-700"
                : "hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <Image
              className="aspect-square p-0.5 text-lg rounded-[2px] dark:bg-gray-100 object-contain"
              width={34}
              height={34}
              src={IMAGE_CATE_URL + category.image}
              alt=""
            />
            <span className="text-gray-900 dark:text-gray-200">
              {locale == "kh" ? category.name_kh : category.name}
              {category.books_count > 0 && (
                <span className="text-[12px] text-primary/80">{` (${category.books_count})`}</span>
              )}
            </span>
          </div>
        ))}
      </ScrollArea>

      {/* Subcategories */}
      {activeCategory &&
        categoriesData.find((category) => category.name === activeCategory)
          ?.sub_categories.length > 0 && (
          <ScrollArea className="w-1/4 p-4 shrink-0 max-h-[80vh] rounded-lg bg-white border-l border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <>
              {categoriesData
                .find((category) => category.name === activeCategory)
                ?.sub_categories?.map((subCategory) => (
                  <div
                    key={subCategory.id}
                    role="button"
                    onMouseEnter={() => setActiveSubCategory(subCategory.name)}
                    onClick={() => {
                      router.push(
                        `/products?categoryId=${hoveredCateId}&subCategoryId=${subCategory.id}`
                      );
                    }}
                    className={`p-2 rounded cursor-pointer ${
                      activeSubCategory === subCategory.name
                        ? "bg-gray-300 dark:bg-gray-700"
                        : "hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    <span className="text-gray-900 dark:text-gray-200">
                      {locale == "kh" ? subCategory.name_kh : subCategory.name}
                      {subCategory.books_count > 0 && (
                        <span className="text-[12px] text-primary/80">{` (${subCategory.books_count})`}</span>
                      )}
                    </span>
                  </div>
                ))}
            </>
          </ScrollArea>
        )}

      {/* Books/Items */}
      {activeSubCategory &&
        categoriesData
          .find((category) => category.name === activeCategory)
          ?.sub_categories?.find(
            (subCategory) => subCategory.name === activeSubCategory
          )?.books.length > 0 && (
          <ScrollArea className="w-2/4 shrink-0 max-h-[80vh] rounded-lg p-4 border-l border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <>
              <div className="grid grid-cols-5 gap-4">
                {categoriesData
                  .find((category) => category.name === activeCategory)
                  ?.sub_categories?.find(
                    (subCategory) => subCategory.name === activeSubCategory
                  )
                  ?.books?.map((book) => (
                    <div
                      key={book.id}
                      className="flex flex-col items-stretch justify-between w-full h-full transition-all duration-500 rounded-lg group hover:scale-95"
                    >
                      <div>
                        <div className="relative overflow-hidden ">
                          <Link
                            href={`/products/${book.id}?productTitle=${book.title}`}
                          >
                            {book.image ? (
                              <Image
                                width={100}
                                height={100}
                                className={`object-cover w-full rounded-md aspect-${PRODUCT_CARD_RATIO} font-moul`}
                                src={IMAGE_BOOK_URL + book.image}
                                alt={book.title}
                              />
                            ) : (
                              <div className={`flex items-center justify-center w-full border rounded-sm bg-secondary aspect-${PRODUCT_CARD_RATIO}`}>
                                <ImageIcon size={50} className="text-border" />
                              </div>
                            )}
                          </Link>
                          {book.discount != 0 && (
                            <span className="absolute px-1.5 font-bold text-xs rounded-sm text-white bottom-1.5 left-1.5 bg-real_primary/80">
                              - {book.discount}%
                            </span>
                          )}
                        </div>
                        <Link
                          href={`/products/${book.id}?productTitle=${book.title}`}
                        >
                          <div className="flex flex-col justify-between mt-1 lg:items-center lg:flex-row">
                            {book.discount != 0 ? (
                              <p className="space-x-2 overflow-hidden text-xs text-gray-400 text-ellipsis">
                                <span className="line-through">
                                  {book.price} $
                                </span>
                                <span className="text-red-500">
                                  {book.price -
                                    (book.discount / 100) * book.price}{" "}
                                  $
                                </span>
                              </p>
                            ) : (
                              <p className="max-w-full overflow-hidden text-xs font-bold text-red-500 text-ellipsis">
                                {book.price} $
                              </p>
                            )}
                          </div>
                          <h3 className="text-xs text-start text-foreground line-clamp-2">
                            {book.title}
                          </h3>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
              {categoriesData
                .find((category) => category.name === activeCategory)
                ?.sub_categories?.find(
                  (subCategory) => subCategory.name === activeSubCategory
                )?.books?.length > 0 && (
                <Link
                  href={`/products?categoryId=${hoveredCateId}`}
                  className="absolute flex justify-end w-full bottom-2 right-2 text-primary hover:underline"
                >
                  {t("seeMore")} <ChevronRight />
                </Link>
              )}
            </>
            {categoriesData
              .find((category) => category.name === activeCategory)
              ?.sub_categories?.find(
                (subCategory) => subCategory.name === activeSubCategory
              )?.books?.length < 1 && (
              <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                {t("noData")}
              </div>
            )}
          </ScrollArea>
        )}
    </div>
  );
};

export default MyCategoryPanel;
