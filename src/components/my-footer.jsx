import { getFooter } from "@/services/footer-services";
import MySocialLinkCard from "./ui/my-social-link-card";
import { getLinks } from "@/services/links-services";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { BookText, InfoIcon, Newspaper, PhoneCall } from "lucide-react";
import InstallPWAButton from "./InstallPWAButton";

const MyFooter = async () => {
  const t = await getTranslations("Index");
  const locale = await getLocale();
  const footer = await getFooter();
  const links = await getLinks();
  return (
    <footer className="px-4 py-8 text-white bg-gray-800 dark:bg-black dark:border-t">
      <div className="flex flex-col items-start justify-start max-w-screen-xl gap-8 px-2 mx-auto md:flex-row">
        <div className="flex-1 pr-10">
          <h4 className="mb-2 text-lg font-semibold">
            {locale == "kh" ? footer?.name_kh : footer?.name}
          </h4>
          {footer?.description && (
            <div
              dangerouslySetInnerHTML={{
                __html:
                  locale == "kh" ? footer?.description_kh : footer?.description,
              }}
            ></div>
          )}
        </div>
        <div className="flex flex-col flex-1 md:pl-10 md:items-center">
          <div className="flex flex-col md:items-start">
            <h4 className="mb-2 text-lg ">{t("menu")}</h4>
            <ul className="list-disc list-inside">
              <li className="hover:underline">
                <Link
                  className="inline-flex items-center gap-2"
                  href="/products"
                >
                  <BookText size={18} /> {t("books")}
                </Link>
              </li>
              <li className="hover:underline">
                <Link className="inline-flex items-center gap-2" href="/blogs">
                  <Newspaper size={18} /> {t("news")}
                </Link>
              </li>
              <li className="hover:underline">
                <Link
                  className="inline-flex items-center gap-2"
                  href="/contact"
                >
                  <PhoneCall size={18} /> {t("contact")}
                </Link>
              </li>
              <li className="hover:underline">
                <Link className="inline-flex items-center gap-2" href="/about">
                  <InfoIcon size={18} /> {t("about")}
                </Link>
              </li>
              <li>
                <InstallPWAButton
                  className={`inline-flex items-center gap-2`}
                />
              </li>
            </ul>
          </div>
        </div>
        {links?.length > 0 && (
          <div className="flex flex-col flex-1 md:pl-10 md:items-end whitespace-nowrap">
            <div className="flex flex-col md:items-center">
              <h4 className="mb-2 text-lg ">{t("socialMedia")}</h4>
              <ul className="space-x-4">
                {links?.map((item) => (
                  <MySocialLinkCard
                    image={item.image}
                    title={item.name}
                    link={item.link}
                    key={item.id}
                  />
                ))}
                <li></li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="mt-8 text-center">
        <p>
          {locale == "kh" ? "ដោយ" : "By"} :{" "}
          <a
            href="https://alphalib.org/"
            className="font-semibold hover:underline"
          >
            Alphalib
          </a>
          <span className="mx-4">|</span>
          {locale == "kh" ? footer?.copyright_kh : footer?.copyright}{" "}
        </p>
      </div>
    </footer>
  );
};

export default MyFooter;
