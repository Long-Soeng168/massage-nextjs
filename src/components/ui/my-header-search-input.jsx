"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input"; // Assuming your input component is imported correctly
import { Button } from "@/components/ui/button"; // Assuming your button component is imported correctly
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
// import { useRouter } from "next/navigation";

export default function MyHeaderSearchInput() {
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
    <form
      onSubmit={handleSubmit}
      className={`${
        pathName == "/products" && ""
      } flex flex-1 bg-white border rounded-lg shadow-sm dark:text-primary border-primary`}
    >
      <Input
        autoFocus
        // value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border-none shadow-none dark:text-black dark:placeholder-black min-w-40 focus-visible:ring-0"
        placeholder={t("searchBooks")}
      />
      <Button type="submit" variant="gosh" size="icon">
        <Search className="h-[1.2rem] w-[1.2rem] dark:text-black" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
}
