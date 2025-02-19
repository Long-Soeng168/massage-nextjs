import React from "react";
import { Button } from "./button";

const MyKeyValueCard = ({ title, value, children }) => {
  return (
    <div className="flex text-sm nowrap">
      <p className="w-[168px] uppercase tracking-wide  border-r border-border mr-5 flex-shrink-0">
        {title}
      </p>
      <p className="capitalize ">{value}</p>
      {children}
    </div>
  );
};

export default MyKeyValueCard;
