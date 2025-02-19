// components/Loading.js
import MyLoadingAnimation from "@/components/ui/my-loading-animation";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="my-20">
      <MyLoadingAnimation />

      <Skeleton className="h-6 max-w-screen-lg mx-auto mb-8" />
      {/* Skeleton for some text paragraphs */}
      <div className="space-y-2">
        <Skeleton className="h-4 mx-auto" />
        <Skeleton className="h-4 mx-auto" />
        <Skeleton className="h-4 mx-auto" />
      </div>
    </div>
  );
};

export default Loading;
