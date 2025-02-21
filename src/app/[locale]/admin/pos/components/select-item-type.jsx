"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SelectItemType = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentItemType = searchParams.get("itemType")?.toString();

  const handleSetItemType = (itemType) => {
    // const params = new URLSearchParams(searchParams);
    // if (itemType) {
    //   params.set("itemType", itemType);
    //   params.set("page", "1");
    // } else {
    //   params.delete("itemType");
    // }
    // replace(`${pathname}?${params.toString()}`);
    replace(`${pathname}?itemType=${itemType}&page=1`);
  };

  return (
    <div>
      <Select
        value={currentItemType || "products"}
        onValueChange={handleSetItemType}
      >
        <SelectTrigger className="w-auto h-full py-3 font-semibold border-none rounded-lg outline-none focus:ring-0">
          <SelectValue placeholder="Item Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="products">Products</SelectItem>
          <SelectItem value="services">Services</SelectItem>
          <SelectItem value="packages">Packages</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectItemType;
