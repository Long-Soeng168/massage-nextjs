import React from "react";
import { SelectAuthor } from "./select-author";
import { getAuthors } from "@/services/authors-services";
import { SelectPublisher } from "./select-publisher";
import { getPublishers } from "@/services/publishers-services";
import { getTranslations } from "next-intl/server";

const MySelectFilter = async ({className}) => {
  const t = await getTranslations('Index');
  const resultsAutors = await getAuthors();
  const authors = resultsAutors?.data;

  const resultsPublishers = await getPublishers();
  const publishers = resultsPublishers?.data;

  return (
    <div className={`flex flex-col p-2 mt-4 border-t ${className}`}>
      <p className="text-sm font-bold text-primary">{t('author')}</p>
      <SelectAuthor authors={authors} />
      <p className="mt-2 text-sm font-bold text-primary">{t('publisher')}</p>
      <SelectPublisher publishers={publishers} />
    </div>
  );
};

export default MySelectFilter;
