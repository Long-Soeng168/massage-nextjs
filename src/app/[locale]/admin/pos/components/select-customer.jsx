"use client";

import * as React from "react";
import { Check, ChevronsUpDown, PackageIcon } from "lucide-react";

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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CustomerPackageCard from "./CustomerPackageCard";
import { usePOSCart } from "@/contexts/POSContext";

export default function SelectCustomer({
  customers,
  selectedCustomer,
  setSelectedCustomer,
  setSelectedDefaultPayment,
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(selectedCustomer?.id || null);
  const { removeUsePackage } = usePOSCart();
  return (
    <div className="flex items-center">
      {selectedCustomer && (
        <Dialog>
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="overflow-hidden justify-between border-[0.5px] rounded-none"
                  >
                    <PackageIcon className="opacity-50" />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Customer's Packages</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <PackageIcon />
                {selectedCustomer?.name || "Customer"}`s Package.
              </DialogTitle>
              <DialogDescription>Select Package to use.</DialogDescription>
              <div className="grid max-h-[60vh] grid-cols-3 gap-2 overflow-y-scroll py-2">
                {selectedCustomer?.packages?.map((item) => (
                  <CustomerPackageCard key={item.id} product={item} />
                ))}
                {!selectedCustomer?.packages && (
                  <div className="flex items-center justify-center col-span-3 text-gray-500">
                    No package found.
                  </div>
                )}
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[250px] overflow-hidden justify-between border-[0.5px] rounded-none"
          >
            {value
              ? customers.find((customer) => customer.id == value)?.name
              : "Select customer..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0 pointer-events-auto">
          <Command>
            <CommandInput placeholder="Search Customer..." className="h-9" />
            <CommandList>
              <CommandEmpty>No customer found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  key={0}
                  value={0}
                  onSelect={(currentValue) => {
                    removeUsePackage();
                    setValue(0);
                    setSelectedCustomer(null);
                    setSelectedDefaultPayment();
                    setOpen(false);
                    setSelectedDefaultPayment();
                  }}
                >
                  N/A
                  <Check
                    className={cn(
                      "ml-auto",
                      value === 0 ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
                {customers?.map((customer) => (
                  <CommandItem
                    key={customer.id}
                    value={customer.id}
                    onSelect={(currentValue) => {
                      setSelectedDefaultPayment();
                      setValue(currentValue == value ? "" : customer.id);
                      setSelectedCustomer(
                        currentValue == value ? null : customer
                      );
                      removeUsePackage();
                      setOpen(false);
                    }}
                  >
                    <span className="flex items-center gap-2">
                      {customer.name}
                      <span className="hidden">{customer.phone}</span>
                      {customer.credit && (
                        <span className="px-1.5 whitespace-nowrap text-xs text-white rounded-full bg-real_primary">
                          $ {Number(customer.credit).toFixed(0)}
                        </span>
                      )}
                    </span>
                    <Check
                      className={cn(
                        "ml-auto",
                        value === customer.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
