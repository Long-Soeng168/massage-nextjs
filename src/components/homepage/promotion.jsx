import React from "react";
import MyPromotions from "../my-promotions";
import { getPromotions } from "@/services/promotions-services";

const Promotion = async () => {
  const resultPromotions = await getPromotions();
  const promotions = resultPromotions?.data || [];
  return (
    <>
      {promotions?.length > 0 && (
        <div className="mb-20">
          <MyPromotions promotions={promotions} />
        </div>
      )}
    </>
  );
};

export default Promotion;
