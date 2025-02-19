"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MyHomeSidebar } from "./my-home-sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { usePathname } from "@/i18n/routing";
import InstallPWAButton from "./InstallPWAButton";

const MyHomeModal = ({ categories }) => {
  const t = useTranslations("Index");
  const searchParams = useSearchParams();
  const pathName = usePathname();
  return (
    <>
      <Sheet
        key={
          "catePanelKey" +
          pathName +
          searchParams.get("productTitle") +
          searchParams.get("categoryId") +
          searchParams.get("subCategoryId")
        }
      >
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-[1.2rem] w-[1.2rem] " />
            <span className="sr-only">Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[300px] sm:w-[540px] overscroll-y-auto"
        >
          <SheetHeader>
            <SheetTitle>{t("menu")}</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-full pr-3">
            <div className="pt-2">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="w-full p-2 py-2 mb-1 text-lg font-semibold rounded-md hover:bg-primary hover:text-primary-foreground">
                    {t("categories")}
                  </AccordionTrigger>
                  <AccordionContent>
                    <MyHomeSidebar isModal={true} categories={categories} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <ul className="w-full py-2">
                <li
                  className={`${
                    pathName == "/products" && "underline underline-offset-4"
                  }`}
                >
                  <Link
                    href="/products"
                    className="block w-full p-2 font-semibold rounded-md hover:bg-primary hover:text-primary-foreground"
                  >
                    {t("books")}
                  </Link>
                </li>
                <li
                  className={`${
                    pathName == "/kids" && "underline underline-offset-4"
                  }`}
                >
                  <Link
                    href="/kids"
                    className="block w-full p-2 font-semibold rounded-md hover:bg-primary hover:text-primary-foreground"
                  >
                    {t("kidBooks")}
                  </Link>
                </li>
                <li
                  className={`${
                    pathName == "/blogs" && "underline underline-offset-4"
                  }`}
                >
                  <Link
                    href="/blogs"
                    className="block w-full p-2 font-semibold rounded-md hover:bg-primary hover:text-primary-foreground"
                  >
                    {t("news")}
                  </Link>
                </li>
                <li
                  className={`${
                    pathName == "/contact" && "underline underline-offset-4"
                  }`}
                >
                  <Link
                    href="/contact"
                    className="block w-full p-2 font-semibold rounded-md hover:bg-primary hover:text-primary-foreground"
                  >
                    {t("contact")}
                  </Link>
                </li>
                <li
                  className={`${
                    pathName == "/about" && "underline underline-offset-4"
                  }`}
                >
                  <Link
                    href="/about"
                    className="block w-full p-2 font-semibold rounded-md hover:bg-primary hover:text-primary-foreground"
                  >
                    {t("about")}
                  </Link>
                </li> 
              </ul>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MyHomeModal;
