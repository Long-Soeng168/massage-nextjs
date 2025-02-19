// components/MyShowMoreText.js
"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./button";
import { useTranslations } from "next-intl";

const MyShowMoreText = ({ text, maxLine = 4, is_scroll = false }) => {
  const [showMore, setShowMore] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const [isFirstMount, setIsFirstMount] = useState(true);
  const textRef = useRef(null);
  const t = useTranslations("Index");

  const toggleText = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    const checkIfTextIsTruncated = () => {
      if (textRef.current) {
        setIsTruncated(
          textRef.current.scrollHeight > textRef.current.clientHeight
        );
      }
    };

    checkIfTextIsTruncated();
    window.addEventListener("resize", checkIfTextIsTruncated);

    return () => {
      window.removeEventListener("resize", checkIfTextIsTruncated);
    };
  }, [text]);

  useEffect(() => {
    if (isFirstMount) {
      setIsFirstMount(false);
      return;
    }

    if(!is_scroll){
      return;
    }
    
    if (textRef.current) {
      const elementTop = textRef.current.getBoundingClientRect().top;
      const offset = 35;
      const scrollPosition = window.scrollY + elementTop - offset;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [showMore]);
  
  return (
    <div>
      <div
        ref={textRef}
        className={`text-gray-500 no-copy no-tailwind dark:text-gray-400 text-md text-start transition-all duration-300`}
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: showMore ? "unset" : maxLine, // Limit text to 2 lines when collapsed
          overflow: "hidden",
        }}
        dangerouslySetInnerHTML={{ __html: text }}
      ></div>

      {isTruncated && (
        <div className="flex justify-center w-full my-2">
          <Button
            variant="secondary"
            className="transition-all duration-300 border-none shadow outline-none hover:bg-primary hover:text-primary-foreground text-primary"
            onClick={toggleText}
          >
            {showMore ? (
              <>
                {t("showLess")} <ChevronUp />
              </>
            ) : (
              <>
                {t("showMore")} <ChevronDown />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyShowMoreText;
