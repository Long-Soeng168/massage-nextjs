"use client";

import { Search } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { usePathname } from "@/i18n/routing";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function POSSearch({ placeholder }) {
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

  return (
    <>
      <div className="relative flex flex-1">
        <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
          <Search />
        </div>
        <Input
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("search")?.toString()}
          className="w-full h-full py-3 pl-12 pr-24 border-0 rounded-lg rounded-tr-lg rounded-br-lg border-primary focus-visible:ring-primary focus-visible:ring-2"
          type="search"
          id="default-search"
          placeholder="Search Items..."
        />
        {/* Error here <button> tag */}
        <Button type='button' className="absolute right-1 top-1/2 -translate-y-[50%]">
          Search
        </Button>
      </div>
    </>
  );
}
