"use client";
import Image from "next/image";
import { IMAGE_CATE_URL } from "@/config/env";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";

export default function MyHomeSidebar({ categories, isModal = false }) {
  const t = useTranslations("Index");
  const locale = useLocale();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentCategoryId = searchParams.get("categoryId")?.toString();
  const currentSubCategoryId = searchParams.get("subCategoryId")?.toString();

  const handleSetCategory = (categoryId) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId) {
      params.set("categoryId", categoryId);
      params.delete("subCategoryId");
      params.set("page", 1);
    } else {
      params.delete("categoryId");
    }
    if (isModal) {
      replace(`/products?${params.toString()}`);
    } else {
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleSetSubCategory = (subCategoryId, categoryId) => {
    const params = new URLSearchParams(searchParams);
    if (subCategoryId) {
      params.set("subCategoryId", subCategoryId);
      params.set("categoryId", categoryId);
      params.set("page", 1);
    } else {
      params.delete("subCategoryId");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <ScrollArea className="w-full px-2 pt-2 mt-2">
        <div className="flex pb-3 space-x-2 w-max">
          <Button variant={currentCategoryId == null ? "default" : "outline"} onClick={() => handleSetCategory()}>
            <p className="flex items-center gap-2">
              <List /> All Categories
            </p>
          </Button>
          {categories?.map((category) => (
            <Button
              key={category.id}
              variant={currentCategoryId == category.id ? "default" : "outline"}
              onClick={() => handleSetCategory(category.id)}
              className={`border-[0.5px]`}
            >
              {category.image && (
                <Image
                  src={IMAGE_CATE_URL + category.image}
                  width={28}
                  height={28}
                  alt=""
                  className="p-0.5 bg-white rounded"
                />
              )}
              <p>{category.name}</p>
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="text-primary" />
      </ScrollArea>
    </div>
  );
}
