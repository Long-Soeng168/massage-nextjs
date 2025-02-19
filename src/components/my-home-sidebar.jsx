"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { AlignLeft, LucideChevronDown, Underline } from "lucide-react";
import Image from "next/image";
import { Label } from "./ui/label";
import { IMAGE_CATE_URL } from "@/config/env";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

export function MyHomeSidebar({ categories, isModal = false }) {
  const t = useTranslations("Index");
  const locale = useLocale();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentCategoryId = searchParams.get("categoryId")?.toString();
  const currentSubCategoryId = searchParams.get("subCategoryId")?.toString();

  const handleSetCategory = (categoryId, categoryName) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId) {
      params.set("categoryId", categoryId);
      params.set("category", categoryName);
      params.delete("subCategoryId");
      params.delete("subCategory");
      params.set("page", 1);
    } else {
      params.delete("categoryId");
      params.delete("category");
      params.delete("subCategoryId");
      params.delete("subCategory");
    }
    if (isModal) {
      replace(`/products?${params.toString()}`);
    } else {
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleSetSubCategory = (
    subCategoryId,
    categoryId,
    categoryName,
    subCategoryName
  ) => {
    const params = new URLSearchParams(searchParams);
    if (subCategoryId) {
      params.set("subCategoryId", subCategoryId);
      params.set("categoryId", categoryId);
      params.set("category", categoryName);
      params.set("subCategory", subCategoryName);
      params.set("page", 1);
    } else {
      params.delete("subCategoryId");
    }
    if (isModal) {
      replace(`/products?${params.toString()}`);
    } else {
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className="space-y-1.5">
      {/* <Label className="text-primary">Categories</Label> */}
      <div className="flex items-stretch justify-between transition-all duration-500 cursor-pointer">
        <button
          onClick={() => handleSetCategory()}
          className={`${
            currentCategoryId == null &&
            "underline font-bold bg-primary group text-primary-foreground hover:text-primary"
          } hover:bg-primary/10 p-2 py-2 rounded items-center flex gap-1 w-full text-[16px] hover:underline`}
        >
          <AlignLeft size={26} />
          {t("allCategories")}
        </button>
      </div>
      {categories?.length > 0 &&
        categories?.map((category) => (
          <Collapsible
            key={category.id}
            defaultOpen={currentCategoryId == category.id ? true : false}
          >
            <div className="flex items-stretch justify-between transition-all duration-500 cursor-pointer">
              <button
                onClick={() =>
                  handleSetCategory(
                    category.id,
                    locale == "kh" ? category.name_kh : category.name
                  )
                }
                className={`${
                  currentCategoryId == category.id &&
                  "underline font-semibold bg-primary group text-primary-foreground hover:text-primary"
                } hover:bg-primary/10 rounded-tl rounded-bl items-center flex gap-1 p-0.5 w-full text-[16px] hover:underline ${!category.sub_categories?.length > 0 && 'rounded'}`}
              >
                <Image
                  className={`aspect-square p-0.5 bg-white rounded-[2px] dark:bg-gray-100 object-contain`}
                  width={34}
                  height={34}
                  src={IMAGE_CATE_URL + category.image}
                  alt=""
                />
                <span>
                  {locale == "kh" ? category.name_kh : category.name}{" "}
                  {category.books_count > 0 && (
                    <span
                      className={`text-[12px]  ${
                        currentCategoryId == category.id
                          ? "text-primary-foreground group-hover:text-primary"
                          : "text-primary/80"
                      }  `}
                    >{` (${category.books_count})`}</span>
                  )}
                </span>
              </button>
              {category.sub_categories?.length > 0 && (
                <CollapsibleTrigger
                  className={`${
                    currentCategoryId == category.id &&
                    "underline font-bold bg-primary group text-primary-foreground hover:text-primary"
                  } p-0.5 text-[16px] rounded-tr rounded-br px-2 hover:bg-primary/10`}
                >
                  <LucideChevronDown size={18} />
                </CollapsibleTrigger>
              )}
            </div>
            {category.sub_categories?.length > 0 && (
              <CollapsibleContent className="w-full ml-4 text-[14px] border-l-2 border-primary">
                <ul className="py-2 space-y-2">
                  {category.sub_categories?.map((subCategory) => (
                    <li key={subCategory.id}>
                      <button
                        className={`${
                          currentSubCategoryId == subCategory.id &&
                          "underline font-semibold"
                        } relative pl-2 max-w-[85%] w-full text-left underline-offset-4 cursor-pointer hover:underline`}
                        onClick={() => {
                          handleSetSubCategory(
                            subCategory.id,
                            category.id,
                            locale == "kh" ? category.name_kh : category.name,
                            locale == "kh"
                              ? subCategory.name_kh
                              : subCategory.name
                          );
                        }}
                      >
                        {locale == "kh"
                          ? subCategory.name_kh
                          : subCategory.name}
                        {subCategory.books_count > 0 && (
                          <span className="text-[12px] text-primary/80">{` (${subCategory.books_count})`}</span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            )}
          </Collapsible>
        ))}
    </div>
  );
}
