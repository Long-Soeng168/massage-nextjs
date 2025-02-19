"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

export function LanguageToggle() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const currentLocale = useLocale();
  const pathname = usePathname(); // Get the current path

  const handleLanguageChange = (locale) => {
    if (locale === currentLocale) return; // Avoid unnecessary navigation

    // Construct the new path by replacing the locale segment
    const segments = pathname.split("/");
    segments[1] = locale; // Update the locale part
    const newPath = segments.join("/");

    window.location.href = newPath;
    // startTransition(() => {
    //   router.replace(newPath); // Navigate to the new locale path
    // });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Image
            className="object-contain w-10 p-1.5 aspect-square"
            src={`/images/icons/${currentLocale}.png`}
            width={60}
            height={60}
            alt="Current Language Icon"
          />
          <span className="sr-only">Toggle Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange("kh")}>
          <Image
            className="object-contain w-5 aspect-square"
            src={`/images/icons/kh.png`}
            width={60}
            height={60}
            alt="Current Language Icon"
          />{" "}
          ខ្មែរ
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
          <Image
            className="object-contain w-5 aspect-square"
            src={`/images/icons/en.png`}
            width={60}
            height={60}
            alt="Current Language Icon"
          />
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
