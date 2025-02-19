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

export function SelectAuthor({ authors }) {
  const t = useTranslations('Index');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // Retrieve the current authorId from the searchParams
  const currentAuthorId = searchParams.get("authorId");

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(currentAuthorId || "");

  // Generate the URL with updated authorId parameter
  const createauthorURL = (authorId, author) => {
    const params = new URLSearchParams(searchParams);
    if (authorId) {
      params.set("authorId", authorId);
      params.set("author", author);
      params.set("page", 1);
    } else {
      params.delete("authorId");
      params.delete("author");
    }
    return `${pathname}?${params.toString()}`;
  };

  const handleauthorChange = (authorId, author) => {
    const newURL = createauthorURL(authorId, author);
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
            ? authors?.find((author) => author.id == value)?.name
            : t('selectAuthor')}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={t('searchAuthor')} className="h-9" />
          <CommandList>
            <CommandEmpty>{t('noData')}</CommandEmpty>
            <CommandGroup>
              <CommandItem
                key="all"
                value=""
                onSelect={() => {
                  setValue(value == "" ? "" : "");
                  setOpen(false);
                  handleauthorChange(value == "" ? "" : "");
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
              {authors?.map((author) => (
                <CommandItem
                  key={author.id}
                  value={author.id}
                  onSelect={() => {
                    setValue(value == author.id ? "" : author.id);
                    setOpen(false);
                    handleauthorChange(
                      value == author.id ? "" : author.id,
                      value == author.id ? "" : author.name
                    );
                  }}
                >
                  {author.name}{" "}
                  {author.pages_count ? `(${author.pages_count})` : ""}
                  <Check
                    className={cn(
                      "ml-auto",
                      value == author.id ? "opacity-100" : "opacity-0"
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
