import React from "react";
import MyFeatureCard from "./ui/my-feature-card";
import { getFeatures } from "@/services/features-services";

const MyFeatureList = async ({className}) => {
  const results = await getFeatures();
  const features = results?.data;
  return (
    <div className={className}>
      {features?.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {features?.map((feature) => (
            <MyFeatureCard feature={feature} key={feature.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFeatureList;
