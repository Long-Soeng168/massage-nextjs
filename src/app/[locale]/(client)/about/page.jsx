import ScrollToTop from "@/components/scroll-to-top";
import { getAbout } from "@/services/page-services";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";


export async function generateMetadata() {
  let about = await getAbout();
  return {
    title: 'About Us',
    description: about.description,
    openGraph: {
      title: 'About Us',
      description: about.description,
    },
  };
}

const AboutPage = async () => {
  let about = await getAbout();
  const t = getTranslations("Index");
  const locale = await getLocale();

  return (
    <div className="flex flex-col items-center min-h-screen mt-8 mb-8">
      <ScrollToTop />

      {about?.description ? (
        <div
          className="no-tailwind"
          dangerouslySetInnerHTML={{
            __html: locale === "kh" ? about.description_kh : about.description,
          }}
        />
      ) : (
        <p>{t("noData")}</p>
      )}
    </div>
  );
};

export default AboutPage;
