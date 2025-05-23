import { EXCHANGE_RATE } from "@/config/env";
import {
  APP_CONTACT,
  APP_EMAIL,
  APP_LOGO_POS_80_PINTER,
  APP_NAME,
  APP_NAME_KH,
  APP_WEBSITE,
} from "@/config/website-detail";

const Invoice80mm = ({ invoice, contentRef }) => {
  let products = [];
  let services = [];
  let packages = [];
  let use_packages = [];
  invoice?.items?.forEach((item) => {
    if (item.type === "package") {
      packages = [...packages, item];
    } else if (item.type === "service") {
      services = [...services, item];
    } else if (item.type === "use_package") {
      use_packages = [...use_packages, item];
    } else {
      products = [...products, item];
    }
  });
  return (
    <div className="relative mb-4 overflow-auto border-[0.5px] border-gray-300 border-dashed rounded-lg custom-scrollbar">
      <div
        ref={contentRef}
        className="mx-auto p-4 bg-white text-black w-[80mm]"
      >
        {/* Header Section */}
        <div className="flex items-center gap-1">
          <div className="flex flex-col flex-1 text-center">
            <span className="flex justify-center items-center">
              <img
                alt="App Logo"
                width={60}
                height={60}
                src={APP_LOGO_POS_80_PINTER}
                className="object-contain w-24 h-24"
              />
            </span>
            <p className="text-base font-bold text-gray-800 m-0">{APP_NAME_KH}</p>
            <p className="text-[12px] text-black m-0">
              ឯកទេសព្យាបាលមុនដោយមិនញេច
            </p>
            <p className="text-[10px] text-black m-0">
              <span>Tel:</span> 069 990 062 / 089 990 062
            </p>
            {/* <p className="text-[10px] text-black">
              <strong>Email:</strong> {APP_EMAIL}
            </p> */}
            {/* <p className="text-[10px] text-black">
              <strong>Website:</strong>{" "}
              <a href={APP_WEBSITE} className="text-black hover:underline">
                {APP_WEBSITE}
              </a>
            </p> */}
          </div>
        </div>

        <hr className="mt-1 border-dashed borderlack" />

        <div className="py-1">
          {/* <h2 className="mb-1 text-base font-semibold text-center text-gray-800">
            INVOICE
          </h2> */}

          <div className="flex mb-2">
            <div className="flex flex-1 flex-col gap-0.5">
              <p className="text-[10px] text-black m-0">
                <strong>Customer:</strong> {invoice?.customer?.name || "N/A"}
              </p>
              <p className="text-[10px] text-black m-0">
                <strong>Telephone:</strong> {invoice?.customer?.phone || "N/A"}
              </p>
              <p className="text-[10px] text-black m-0">
                <strong>Address:</strong> {invoice?.customer?.address || "N/A"}
              </p>

              {/* {invoice?.customer?.credit >= 0 && ( */}
              <p className="text-[10px] text-black m-0">
                <strong>Credit Remain:</strong> ${" "}
                {invoice?.customer?.credit || "0"}
              </p>
              {/* )} */}
            </div>
            <div className="flex items-end flex-1 flex-col gap-0.5">
              <p className="text-[10px] text-black m-0">
                <strong>{invoice?.inv_id ? 'INV_ID' : 'ID'}: </strong>
                {new Intl.NumberFormat("en", {
                  minimumIntegerDigits: 6,
                  useGrouping: false,
                }).format(invoice?.inv_id ? invoice.inv_id : invoice.id)}
              </p>
              <p className="text-[10px] text-black m-0">
                <strong>Date:</strong>{" "}
                {invoice?.created_at &&
                  new Date(invoice.created_at).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
              </p>
              {invoice?.payment?.name && (
                <p className="text-[10px] text-black m-0">
                  <strong>Pay By:</strong> {invoice?.payment?.name || "N/A"}
                </p>
              )}
              {invoice?.paymentTypeId == 0 && (
                <p className="text-[10px] text-black m-0">
                  <strong>Pay By:</strong> Credit
                </p>
              )}
              {invoice?.user?.name && (
                <p className="text-[10px] text-black m-0">
                  <strong>Seller:</strong> {invoice?.user?.name || "N/A"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full text-[10px] border-[0.5px] border-black">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-1 py-1 border-[0.5px] border-black">No</th>
                <th className="px-1 py-1 border-[0.5px] border-black">
                  Description
                </th>
                <th className="px-1 py-1 text-right border-[0.5px] border-black">
                  Qty
                </th>
                <th className="px-1 py-1 text-right border-[0.5px] border-black">
                  Price
                </th>
                <th className="px-1 py-1 text-right border-[0.5px] border-black">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.length > 0 && (
                <tr>
                  <td
                    className="px-1 py-1 text-center border-[0.5px] border-black"
                    colSpan={5}
                  >
                    Products
                  </td>
                </tr>
              )}
              {products?.map((item, index) => (
                <tr key={item.id} className="border-collapse">
                  <td className="px-1 py-1 border-[0.5px] border-black">
                    {index + 1}
                  </td>
                  <td className="px-1 py-1 border-[0.5px] border-black">
                    {item.title}
                  </td>
                  <td className="px-1 py-1 text-right border-[0.5px] border-black">
                    {item.quantity}
                  </td>
                  <td className="px-1 py-1 text-right border-[0.5px] border-black whitespace-nowrap">
                    {(item.price - item.price * (item.discount / 100)).toFixed(
                      2
                    )}{" "}
                    $
                  </td>
                  <td className="px-1 py-1 text-right border-[0.5px] border-black whitespace-nowrap">
                    {(
                      (item.price - item.price * (item.discount / 100)) *
                      item.quantity
                    ).toFixed(2)}{" "}
                    $
                  </td>
                </tr>
              ))}
              {services?.length > 0 && (
                <tr>
                  <td
                    className="px-1 py-1 text-center border-[0.5px] border-black"
                    colSpan={5}
                  >
                    Services
                  </td>
                </tr>
              )}
              {services?.map((item, index) => (
                <tr key={item.id} className="border-collapse">
                  <td className="px-1 py-1 border-[0.5px] border-black">
                    {index + 1}
                  </td>
                  <td className="px-1 py-1 border-[0.5px] border-black">
                    {item.title}
                  </td>
                  <td className="px-1 py-1 text-right border-[0.5px] border-black">
                    {item.quantity}
                  </td>
                  <td className="px-1 py-1 text-right border-[0.5px] border-black whitespace-nowrap">
                    {(item.price - item.price * (item.discount / 100)).toFixed(
                      2
                    )}{" "}
                    $
                  </td>
                  <td className="px-1 py-1 text-right border-[0.5px] border-black whitespace-nowrap">
                    {(
                      (item.price - item.price * (item.discount / 100)) *
                      item.quantity
                    ).toFixed(2)}{" "}
                    $
                  </td>
                </tr>
              ))}
              {packages?.length > 0 && (
                <tr>
                  <td
                    className="px-1 py-1 text-center border-[0.5px] border-black"
                    colSpan={5}
                  >
                    Packages
                  </td>
                </tr>
              )}
              {packages?.map((item, index) => (
                <tr key={item.id} className="border-collapse">
                  <td className="px-1 py-1 border-[0.5px] border-black">
                    {index + 1}
                  </td>
                  <td className="px-1 py-1 border-[0.5px] border-black">
                    {item.title}
                  </td>
                  <td className="px-1 py-1 text-right border-[0.5px] border-black">
                    {item.quantity}
                  </td>
                  <td className="px-1 py-1 text-right border-[0.5px] border-black whitespace-nowrap">
                    {(item.price - item.price * (item.discount / 100)).toFixed(
                      2
                    )}{" "}
                    $
                  </td>
                  <td className="px-1 py-1 text-right border-[0.5px] border-black whitespace-nowrap">
                    {(
                      (item.price - item.price * (item.discount / 100)) *
                      item.quantity
                    ).toFixed(2)}{" "}
                    $
                  </td>
                </tr>
              ))}
              {use_packages?.length > 0 && (
                <tr>
                  <td
                    className="px-1 py-1 text-center border-[0.5px] border-black"
                    colSpan={5}
                  >
                    Use Package
                  </td>
                </tr>
              )}
              {use_packages?.map((item, index) => (
                <tr key={item.id} className="border-collapse">
                  <td className="px-1 py-1 border-[0.5px] border-black">
                    {index + 1}
                  </td>
                  <td className="px-1 py-1 border-[0.5px] border-black">
                    {item.title}
                    {invoice.customer.packages?.map((packageItem) => {
                      if (packageItem.id == item.product_id) {
                        return (
                          <span key={packageItem.id} className="text-[10px]">
                            <br />
                            <strong>Remain:</strong>{" "}
                            {invoice.status == 0
                              ? packageItem.pivot.usable_number - item.quantity
                              : packageItem.pivot.usable_number}
                          </span>
                        );
                      }
                    })}
                  </td>
                  <td className="px-1 py-1 text-right border-[0.5px] border-black">
                    {item.quantity}
                  </td>
                  <td className="px-1 py-1 text-right border-[0.5px] border-black whitespace-nowrap">
                    {(item.price - item.price * (item.discount / 100)).toFixed(
                      2
                    )}{" "}
                    $
                  </td>
                  <td className="px-1 py-1 text-right border-[0.5px] border-black whitespace-nowrap">
                    {(
                      (item.price - item.price * (item.discount / 100)) *
                      item.quantity
                    ).toFixed(2)}{" "}
                    $
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-100 ">
              <tr>
                <th className="px-2 py-1 text-right" colSpan="4">
                  Subtotal
                </th>
                <td className="px-2 py-1 text-right whitespace-nowrap">
                  {Number(invoice.subtotal).toFixed(2)} $
                </td>
              </tr>
              <tr>
                <th
                  className="px-2 py-1 text-right whitespace-nowrap"
                  colSpan="4"
                >
                  Discount ({invoice.discount}
                  {invoice.discountType === "dollar" ? " $" : " %"})
                </th>
                <td className="px-2 py-1 text-right whitespace-nowrap">
                  {invoice.discountType === "dollar"
                    ? invoice.discount
                    : (invoice.subtotal * (invoice.discount / 100)).toFixed(
                        2
                      )}{" "}
                  $
                </td>
              </tr>
              <tr>
                <th className="px-2 py-1 text-right" colSpan="4">
                  Total
                </th>
                <td className="px-2 py-1 text-right">
                  {Number(invoice.total).toFixed(2)} $
                </td>
              </tr>
              <tr>
                <th className="px-2 py-1 text-right" colSpan="4">
                  Total (Riel)
                </th>
                <td className="px-2 py-1 text-right whitespace-nowrap">
                  {(Number(invoice.total) * EXCHANGE_RATE)
                    .toFixed(0)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                  ៛
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div class="max-w-[80mm] py-2 space-y-2 text-xs text-center">
          <p class="font-semibold leading-tight text-xs">
            <span class="font-bold underline">Note:</span> All goods sold are
            not refundable.
          </p>
          <div className="text-center">
            <p class="leading-tight text-base py-2">ស្កេនបង់ប្រាក់</p>
            <img src="/ppc_bank_qr.jpeg" className="w-[50%]" alt="qr" />
            <p class="leading-tight text-[13px] py-2">U2BE, BEAUTY CLINIC</p>
          </div>
          {/* <div class="flex items-start gap-2">
            <p class="leading-tight">
              <span class="font-bold">PPC Bank</span>: 1-110-00021880-8
            </p>
          </div> */}

          {/* <div class="flex items-start gap-2">
            <p class="leading-tight">
              <span class="font-bold">Telegram</span>: 069 99 00 62 / 089 99 00
              62
            </p>
          </div> */}
        </div>

        {/* Footer Section */}
        <div className="text-xs text-center mt-4">
          <p>អរគុណ សម្រាប់ការបញ្ជាទិញ</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice80mm;
