import { IMAGE_FEATURE_URL } from "@/config/env";
import React from "react";

const MyFeatureCard = ({feature}) => {
  return (
    <div
      className="flex flex-col items-center p-6 transition-shadow duration-300 border rounded-lg border-border bg-background hover:shadow-xl "
    >
      <div className="mb-4 text-4xl text-indigo-500 dark:text-indigo-400">
        <img 
          src={IMAGE_FEATURE_URL + feature.image}
          alt="" 
        />
      </div>
      <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-100">
        {feature.name}
      </h3>
      <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
        {feature.short_description}
      </p>
    </div>
  );
};

export default MyFeatureCard;
