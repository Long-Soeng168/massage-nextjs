"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslations } from "next-intl";

export function MyBlogCategoriesSelect({ categories, locale }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const t = useTranslations("Index");

  // Retrieve the current categoryId from the searchParams
  const currentCategoryId = searchParams.get("categoryId");

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(currentCategoryId || "");

  // Generate the URL with updated categoryId parameter
  const createCategoryURL = (categoryId) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId) {
      params.set("categoryId", categoryId);
      params.set("page", 1);
    } else {
      params.delete("categoryId");
    }
    return `${pathname}?${params.toString()}`;
  };

  const handleCategoryChange = (categoryId) => {
    const newURL = createCategoryURL(categoryId);
    replace(newURL); // Update the URL without reloading the page
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="h-auto">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between h-auto"
        >
          {value
            ? locale == "kh"
              ? categories?.find((category) => category.id == value)?.name_kh
              : categories?.find((category) => category.id == value)?.name
            : t("selectCategory")}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={t("searchCategory")} className="h-9" />
          <CommandList>
            <CommandEmpty>{t("noData")}</CommandEmpty>
            <CommandGroup>
              <CommandItem
                key="all"
                value=""
                onSelect={() => {
                  setValue(value === "" ? "" : "");
                  setOpen(false);
                  handleCategoryChange(value === "" ? "" : "");
                }}
              >
                {t("all")}
                <Check
                  className={cn(
                    "ml-auto",
                    value === "" ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
              {categories?.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.id}
                  onSelect={() => {
                    setValue(value === category.id ? "" : category.id);
                    setOpen(false);
                    handleCategoryChange(
                      value === category.id ? "" : category.id
                    );
                  }}
                >
                  {locale == "kh" ? category.name_kh : category.name}{" "}
                  {category.pages_count ? `(${category.pages_count})` : ""}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === category.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
