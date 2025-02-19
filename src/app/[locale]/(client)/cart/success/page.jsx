// components/PageSuccess.js
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import animationData from "/public/images/animations/success-animation.json";
import LottieAnimation from "@/components/ui/lottie-animation";
import { getTranslations } from "next-intl/server";
import ScrollToTop from "@/components/scroll-to-top";

const PageSuccess = async () => {
  const t = await getTranslations("Index");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <ScrollToTop />

      <LottieAnimation animationData={animationData} />
      <h1 className="mt-4 text-3xl font-semibold text-gray-800">
        {t("thnakForOrder")}!
      </h1>
      <p className="mt-2 text-gray-600">
        {t("yourOrderHasBeenSuccessfullyPlaced")}
      </p>
      <p className="mt-2 text-gray-600">
        {t("weWillGetBackToYouAsSoonAsPossible")}
      </p>

      <Link href="/" passHref>
        <Button className="mt-6">{t("returnToHomepage")}</Button>
      </Link>
    </div>
  );
};

export default PageSuccess;
