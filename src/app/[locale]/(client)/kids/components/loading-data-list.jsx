import { SkeletonCard } from "@/components/skeleton-card";
import MyLoadingAnimation from "@/components/ui/my-loading-animation";
import React from "react";

const LoadingDataList = () => {
  return (
    <>
      <MyLoadingAnimation />
      <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonCard key={index} ratio="1/1" />
        ))}
      </div>
    </>
  );
};

export default LoadingDataList;
