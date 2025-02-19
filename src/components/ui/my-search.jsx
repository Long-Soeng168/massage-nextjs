"use client";

import { SearchIcon } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input"; // Assuming your input component is imported correctly
import { Button } from "@/components/ui/button"; // Assuming your button component is imported correctly
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { usePathname } from "@/i18n/routing";

export default function MySearch({ placeholder }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
      params.set("page", 1);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const [searchQuery, setSearchQuery] = useState("");
  const pathName = usePathname();
  //   const router = useRouter();
  const t = useTranslations("Index");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (searchQuery) {
      window.location.href = `/products?search=${encodeURIComponent(
        searchQuery
      )}`;
      //   router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      {pathname == "/products" ? (
        <div className="relative flex flex-1 flex-shrink-0 h-full border rounded-md border-primary">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            key={searchParams.get("is_delete_search")?.toString()}
            className="block w-full py-2 pl-10 text-sm border border-gray-200 rounded-md peer outline-1 placeholder:text-gray-500"
            placeholder={placeholder}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get("search")?.toString()}
          />
          <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500  dark:text-white" />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={`${
            pathName == "/products" && ""
          } flex flex-1 bg-white border rounded-lg shadow-sm dark:text-primary border-primary`}
        >
          <Input
            // value={searchQuery}
            key={searchParams.get("is_delete_search")?.toString()}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-none shadow-none dark:text-black dark:placeholder-black min-w-40 focus-visible:ring-0"
            placeholder={t("searchBooks")}
          />
          <Button type="submit" variant="gosh" size="icon">
            <Search className="h-[1.2rem] w-[1.2rem] dark:text-black" />
            <span className="sr-only">Search</span>
          </Button>
        </form>
      )}
    </>
  );
}
