import React from "react"; 
import { getSlides } from "@/services/slides-services";
import MySlideShowTop from "./my-slide-show-top";
import MySlideShowBottom from "./my-slide-show-bottom";

const MySlideShow = async ({ className }) => {
  const topSlides = (await getSlides({ position: "top" })) || [];
  const bottomSlides = (await getSlides({ position: "bottom" })) || [];
  return (
    <div className={className}>
     <MySlideShowTop topSlides={topSlides} />
     <MySlideShowBottom bottomSlides={bottomSlides} />
    </div>
  );
};

export default MySlideShow;
