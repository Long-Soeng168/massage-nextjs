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

export function SelectBrand({ brands }) {
  const t = useTranslations('Index');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // Retrieve the current brandId from the searchParams
  const currentbrandId = searchParams.get("brandId");

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(currentbrandId || "");

  // Generate the URL with updated brandId parameter
  const createbrandURL = (brandId, brand) => {
    const params = new URLSearchParams(searchParams);
    if (brandId) {
      params.set("brandId", brandId);
      params.set("brand", brand);
      params.set("page", 1);
    } else {
      params.delete("brandId");
      params.delete("brand");
    }
    return `${pathname}?${params.toString()}`;
  };

  const handlebrandChange = (brandId, brand) => {
    const newURL = createbrandURL(brandId, brand);
    replace(newURL); // Update the URL without reloading the page
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="h-full">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full h-full"
        >
          {value
            ? brands?.find((brand) => brand.id == value)?.name
            : t('selectBrand')}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={t('searchBrand')} className="h-9" />
          <CommandList>
            <CommandEmpty>{t('noData')}</CommandEmpty>
            <CommandGroup>
              <CommandItem
                key="all"
                value=""
                onSelect={() => {
                  setValue(value == "" ? "" : "");
                  setOpen(false);
                  handlebrandChange(value == "" ? "" : "");
                }}
              >
                {t('all')}
                <Check
                  className={cn(
                    "ml-auto",
                    value == "" ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
              {brands?.map((brand) => (
                <CommandItem
                  key={brand.id}
                  value={brand.id}
                  onSelect={() => {
                    setValue(value == brand.id ? "" : brand.id);
                    setOpen(false);
                    handlebrandChange(
                      value == brand.id ? "" : brand.id,
                      value == brand.id ? "" : brand.name
                    );
                  }}
                >
                  {brand.name}{" "}
                  {brand.pages_count ? `(${brand.pages_count})` : ""}
                  <Check
                    className={cn(
                      "ml-auto",
                      value == brand.id ? "opacity-100" : "opacity-0"
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
