import Image from "next/image";
import React from "react";
import { MyHeaderNav } from "./my-header-nav";
import { ModeToggle } from "./mode-toggle";
import { LanguageToggle } from "./language-toggle";
import Link from "next/link";
import {
  getCategories,
  getCategoryHasMostBooks,
} from "@/services/categories-services";
import MyCartButtonHeader from "./ui/my-cart-button-header";
import { getTranslations } from "next-intl/server";
import MySearch from "./ui/my-search";
import MyHomeModal from "./my-home-modal";
import { User2 } from "lucide-react";
import { Button } from "./ui/button";
import { BASE_BACKEND_URL } from "@/config/env";
import { APP_LOGO, APP_NAME, APP_NAME_KH } from "@/config/website-detail";

const MyHeader = async () => {
  const resultCateogries = await getCategories({
    orderBy: "books_count",
    orderDir: "desc",
    withSub: 1,
  });

  const categoryMostBooks = await getCategoryHasMostBooks();
  const t = await getTranslations("Index");
  return (
    <div>
      <header className="flex flex-wrap py-4 lg:gap-10 lg:items-center">
        {/* Start Logo */}
        <div className="flex items-center justify-between w-full gap-2 mb-4 lg:mb-0 lg:w-auto">
          <Link href="/" className="flex items-center gap-2 overflow-hidden">
            <Image
              className="object-contain"
              src={APP_LOGO}
              width={66}
              height={66}
              alt="Logo Image"
            />
            <div>
              <p className="text-base font-bold max-w-26 text-primary-foreground dark:text-white">
                {APP_NAME_KH}
              </p>
              <p className="text-sm font-semibold max-w-26 text-primary-foreground dark:text-white">
                {APP_NAME}
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-2 lg:hidden">
            <ModeToggle />
            <LanguageToggle />
            <MyHomeModal categories={resultCateogries} />
          </div>
        </div>

        {/* Start Action  */}
        <div className="flex items-center justify-end flex-1 w-full gap-2">
          {/* <MyHeaderSearchInput /> */}
          <MySearch placeholder={t("searchBooks")} />
          <MyCartButtonHeader />
          <Link href={BASE_BACKEND_URL}>
            <Button variant="outline" size="icon">
              <User2 />
            </Button>
          </Link>
        </div>
      </header>

      <div className="flex-wrap hidden py-4 lg:flex lg:items-center">
        {/* Start Logo */}

        {/* Start Nav Bar */}
        <nav className="text-primary-foreground dark:text-white">
          <MyHeaderNav
            categories={resultCateogries}
            categoryMostBook={categoryMostBooks}
          />
        </nav>

        {/* Start Action  */}
        <div className="flex items-center justify-end flex-1 w-full gap-2">
          <ModeToggle />
          <LanguageToggle />
          {/* <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-[1.2rem] w-[1.2rem] " />
            <span className="sr-only">Menu</span>
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default MyHeader;
