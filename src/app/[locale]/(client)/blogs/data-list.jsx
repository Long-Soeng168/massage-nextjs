import React from "react";
import MyBlogCard from "@/components/ui/my-blog-card";
import { getBlogs } from "@/services/blogs-services";
import MyPagination from "@/components/my-pagination";

const DataList = async ({ currentPage, search, categoryId }) => {
  let results = await getBlogs({
    categoryId: categoryId,
    search: search,
    currentPage: currentPage,
    // perPage: 9,
  });
  let blogs = results?.data || [];
  const links = results?.links || [];

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {blogs.map((blog) => (
          <MyBlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      <div className="flex justify-center w-full mt-5">
        <MyPagination from={results.from} to={results.to} total={results.total} links={links} />
      </div>
    </>
  );
};

export default DataList;
