'use client'

import Lottie from "lottie-react";
import React from "react";

const LottieAnimation = ({ animationData, isLoop = false, className }) => {
  return (
    <div>
      <Lottie
        animationData={animationData}
        className={`flex items-center justify-center max-w-60 ${className}`}
        loop={isLoop}
      />
    </div>
  );
};

export default LottieAnimation;
