import { getBlogs } from "@/services/blogs-services";
import React from "react";
import MyHeading from "../ui/my-heading";
import MyBlogList from "../my-blog-list";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronRight, ChevronsRightIcon } from "lucide-react";

const Blogs = async () => {
  const t = await getTranslations("Index");
  const resultsBlogs = await getBlogs({ perPage: 3 });
  const blogs = resultsBlogs?.data;
  return (
    <>
      {blogs?.length > 0 && (
        <div className="flex flex-col gap-4 mb-20">
          <Link href="/blogs" className="hover:underline">
            <MyHeading
              title={t("news")}
              // description={t('newsDescription')}
            />
          </Link>

          <MyBlogList blogs={blogs} />
          <div className="w-full text-end">
            <Button variant="link" className='transition-all duration-300 hover:translate-x-4'>
              <Link className="flex text-base" href="/blogs">
                {t("seeMore")} <ChevronsRightIcon />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Blogs;
