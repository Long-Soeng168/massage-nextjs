"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslations } from "next-intl";

export function SelectPublisher({ publishers }) {
  const t = useTranslations('Index');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  // Retrieve the current publisherId from the searchParams
  const currentpublisherId = searchParams.get("publisherId");

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(currentpublisherId || "");

  // Generate the URL with updated publisherId parameter
  const createpublisherURL = (publisherId) => {
    const params = new URLSearchParams(searchParams);
    if (publisherId) {
      params.set("publisherId", publisherId);
      params.set("page", 1);
    } else {
      params.delete("publisherId");
    }
    return `${pathname}?${params.toString()}`;
  };

  const handlepublisherChange = (publisherId) => {
    const newURL = createpublisherURL(publisherId);
    replace(newURL); // Update the URL without reloading the page
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="h-full">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full h-full"
        >
          {value
            ? publishers?.find((publisher) => publisher.id == value)?.name
            : t('selectPublisher')}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={t('searchPublisher')} className="h-9" />
          <CommandList>
            <CommandEmpty>{t('noData')}</CommandEmpty>
            <CommandGroup>
              <CommandItem
                key="all"
                value=""
                onSelect={() => {
                  setValue(value == "" ? "" : "");
                  setOpen(false);
                  handlepublisherChange(value == "" ? "" : "");
                }}
              >
                {t('all')}
                <Check
                  className={cn(
                    "ml-auto",
                    value == "" ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
              {publishers?.map((publisher) => (
                <CommandItem
                  key={publisher.id}
                  value={publisher.id}
                  onSelect={() => {
                    setValue(value == publisher.id ? "" : publisher.id);
                    setOpen(false);
                    handlepublisherChange(
                      value == publisher.id ? "" : publisher.id
                    );
                  }}
                >
                  {publisher.name}{" "}
                  {publisher.pages_count ? `(${publisher.pages_count})` : ""}
                  <Check
                    className={cn(
                      "ml-auto",
                      value == publisher.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
