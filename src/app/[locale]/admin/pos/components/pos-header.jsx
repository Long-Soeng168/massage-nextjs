import Link from "next/link";
import POSHeaderMenu from "./pos-header-menu";
import POSSearch from "./pos-search";
import OrderButton from "./order-button";
import { Holds } from "./holds";
import { APP_NAME, APP_NAME_KH } from "@/config/website-detail";
import SelectItemType from "./select-item-type";
import { RecentInvoice } from "./recent-invoice";
import { CustomerDialog } from "./customer-dialog";

const POSHeader = ({ customers, payments }) => {
  return (
    <>
      <header>
        {/* Logo */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-2">
          <div className="flex items-center justify-center flex-1 order-2 gap-4 ">
            <div className="items-center hidden gap-2 mr-8 md:flex">
              <POSHeaderMenu />
              <Link href={`/admin/pos`} >
                <p className="text-xs font-bold max-w-10 text-primary">
                  {APP_NAME_KH}
                </p>
                <p className="text-xs font-semibold max-w-10 text-primary">
                  {APP_NAME}
                </p>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1">
              <form className="relative w-full ">
                <div className="flex items-stretch bg-background border-[0.5px] border-primary rounded-lg">
                  <SelectItemType />
                  <POSSearch />
                </div>
              </form>
            </div>
          </div>

          <div className="flex items-center justify-between w-full gap-2 md:w-auto md:order-3">
            <div className="flex items-center gap-2 mr-8 md:hidden">
              <POSHeaderMenu />
              <Link href={`/admin/pos`} className="hidden lg:inline">
                <p className="text-xs font-bold max-w-24 line-clamp-2 text-primary">
                  {APP_NAME_KH}
                </p>
                <p className="text-xs font-semibold line-clamp-2 max-w-24 text-primary">
                  {APP_NAME}
                </p>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <CustomerDialog />
              <RecentInvoice />
              <Holds />
              <OrderButton customers={customers} payments={payments} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default POSHeader;
