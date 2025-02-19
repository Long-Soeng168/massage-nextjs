import React from "react";
import MyBlogCard from "./ui/my-blog-card";

const MyBlogList = async ({ blogs }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {blogs?.map((blog) => (
        <MyBlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default MyBlogList;
