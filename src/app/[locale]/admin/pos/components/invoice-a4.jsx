import { EXCHANGE_RATE } from "@/config/env";
import {
  APP_CONTACT,
  APP_EMAIL,
  APP_LOGO,
  APP_NAME,
  APP_NAME_KH,
  APP_PAYMENT_MAYTHOD,
  APP_WEBSITE,
} from "@/config/website-detail";

const InvoiceA4 = ({ invoice, contentRef }) => {
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
    <div className="relative mb-4 overflow-auto border border-gray-300 border-dashed rounded-lg custom-scrollbar">
      <div
        ref={contentRef}
        className="max-w-4xl p-4 mx-auto text-black bg-white"
      >
        {/* Header Section */}
        <div className="flex items-center gap-2">
          <img
            alt=""
            width={250}
            height={250}
            src={APP_LOGO}
            className="object-contain w-40 h-full"
          />
          <div className="flex flex-col flex-1 h-full text-start">
            <p className="text-3xl font-bold text-gray-800">{APP_NAME_KH}</p>
            <p className="text-xl text-gray-800">ឯកទេសព្យាបាលមុនដោយមិនញេច</p>
            <p className="mt-2 text-sm text-gray-600">
              <span>Tel:</span> 069 990 062 / 089 990 062
            </p>
            {/* <p className="text-sm text-gray-600">
              <strong>Email:</strong> {APP_EMAIL}
            </p> */}
            {/* <p className="text-sm text-gray-600">
              <strong>Website:</strong>{" "}
              <a href={APP_WEBSITE} className="text-blue-500 hover:underline">
                {APP_WEBSITE}
              </a>
            </p> */}
          </div>
        </div>

        <hr className="mt-4 border-black border-dashed" />

        <div className="py-4">
          {/* <h2 className="mb-4 text-2xl font-semibold text-center text-gray-800">
            INVOICE
          </h2> */}
          {/* Customer Details */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                <strong>Customer:</strong> {invoice?.customer?.name || "N/A"}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Telephone:</strong> {invoice?.customer?.phone || "N/A"}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Address:</strong> {invoice?.customer?.address || "N/A"}
              </p>

              {/* {invoice?.customer?.credit >= 0 && ( */}
              <p className="text-sm text-black">
                <strong>Credit Remain:</strong> ${" "}
                {invoice?.customer?.credit || "0"}
              </p>
              {/* )} */}
            </div>
            <div className="flex items-end flex-1 flex-col gap-0.5">
              <p className="text-sm text-gray-700">
                <strong>{invoice?.inv_id ? 'INV_ID' : 'ID'}: </strong>
                {new Intl.NumberFormat("en", {
                  minimumIntegerDigits: 6,
                  useGrouping: false,
                }).format(invoice?.inv_id ? invoice.inv_id : invoice.id)}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Date: </strong>
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
                <p className="text-sm text-black">
                  <strong>Pay By: </strong> {invoice?.payment?.name || "N/A"}
                </p>
              )}
              {invoice?.paymentTypeId == 0 && (
                <p className="text-sm text-black">
                  <strong>Pay By: </strong> Credit
                </p>
              )}
              {invoice?.user?.name && (
                <p className="text-sm text-black">
                  <strong>Seller: </strong> {invoice?.user?.name || "N/A"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="mb-4 overflow-x-auto">
          <table className="w-full text-sm border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-1 border">No</th>
                <th className="px-2 py-1 border">Description</th>
                <th className="px-2 py-1 text-right border">Quantity</th>
                <th className="px-2 py-1 text-right border">Unit Price</th>
                <th className="px-2 py-1 text-right border">Amount</th>
              </tr>
            </thead>
            <tbody>
              {products?.length > 0 && (
                <tr>
                  <td
                    className="px-2 py-1 text-center border-[0.5px] border-black"
                    colSpan={5}
                  >
                    Products
                  </td>
                </tr>
              )}
              {products?.map((item, index) => (
                <tr key={item.id} className="border-collapse">
                  <td className="px-2 py-1 border-[0.5px] border-black">
                    {index + 1}
                  </td>
                  <td className="px-2 py-1 border-[0.5px] border-black">
                    {item.title}
                  </td>
                  <td className="px-2 py-1 text-right border-[0.5px] border-black">
                    {item.quantity}
                  </td>
                  <td className="px-2 py-1 text-right border-[0.5px] border-black whitespace-nowrap">
                    {(item.price - item.price * (item.discount / 100)).toFixed(
                      2
                    )}{" "}
                    $
                  </td>
                  <td className="px-2 py-1 text-right border-[0.5px] border-black whitespace-nowrap">
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
                    className="px-2 py-1 text-center border-[0.5px] border-black"
                    colSpan={5}
                  >
                    Services
                  </td>
                </tr>
              )}
              {services?.map((item, index) => (
                <tr key={item.id} className="border-collapse">
                  <td className="px-2 py-1 border-[0.5px] border-black">
                    {index + 1}
                  </td>
                  <td className="px-2 py-1 border-[0.5px] border-black">
                    {item.title}
                  </td>
                  <td className="px-2 py-1 text-right border-[0.5px] border-black">
                    {item.quantity}
                  </td>
                  <td className="px-2 py-1 text-right border-[0.5px] border-black whitespace-nowrap">
                    {(item.price - item.price * (item.discount / 100)).toFixed(
                      2
                    )}{" "}
                    $
                  </td>
                  <td className="px-2 py-1 text-right border-[0.5px] border-black whitespace-nowrap">
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
                    className="px-2 py-1 text-center border-[0.5px] border-black"
                    colSpan={5}
                  >
                    Packages
                  </td>
                </tr>
              )}
              {packages?.map((item, index) => (
                <tr key={item.id} className="border-collapse">
                  <td className="px-2 py-1 border-[0.5px] border-black">
                    {index + 1}
                  </td>
                  <td className="px-2 py-1 border-[0.5px] border-black">
                    {item.title}
                  </td>
                  <td className="px-2 py-1 text-right border-[0.5px] border-black">
                    {item.quantity}
                  </td>
                  <td className="px-2 py-1 text-right border-[0.5px] border-black whitespace-nowrap">
                    {(item.price - item.price * (item.discount / 100)).toFixed(
                      2
                    )}{" "}
                    $
                  </td>
                  <td className="px-2 py-1 text-right border-[0.5px] border-black whitespace-nowrap">
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
                    className="px-2 py-1 text-center border-[0.5px] border-black"
                    colSpan={5}
                  >
                    Use Package
                  </td>
                </tr>
              )}
              {use_packages?.map((item, index) => (
                <tr key={item.id} className="border-collapse">
                  <td className="px-2 py-1 border-[0.5px] border-black">
                    {index + 1}
                  </td>
                  <td className="px-2 py-1 border-[0.5px] border-black">
                    {item.title}
                    {invoice.customer.packages?.map((packageItem) => {
                      if (packageItem.id == item.product_id) {
                        return (
                          <span key={packageItem.id} className="text-sm">
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
                  <td className="px-2 py-1 text-right border-[0.5px] border-black">
                    {item.quantity}
                  </td>
                  <td className="px-2 py-1 text-right border-[0.5px] border-black whitespace-nowrap">
                    {(item.price - item.price * (item.discount / 100)).toFixed(
                      2
                    )}{" "}
                    $
                  </td>
                  <td className="px-2 py-1 text-right border-[0.5px] border-black whitespace-nowrap">
                    {(
                      (item.price - item.price * (item.discount / 100)) *
                      item.quantity
                    ).toFixed(2)}{" "}
                    $
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-100">
              <tr>
                <th className="px-2 py-1 text-right border-t" colSpan="4">
                  Subtotal
                </th>
                <td className="px-2 py-1 text-right border-t whitespace-nowrap">
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
                  {(Number(invoice.total) * EXCHANGE_RATE).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ៛
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Footer Section */}
        <div>
          {/* Payment Methods Section */}
          {/* <div
            className="space-y-2"
            dangerouslySetInnerHTML={{ __html: APP_PAYMENT_MAYTHOD }}
          ></div> */}
          <p className="font-semibold">
            <span class="font-bold underline">Note : </span>All goods sold are
            not refundable.
          </p>

          <div class="py-4 space-y-4">
            <div className="text-start w-[40mm]">
              <p class="leading-tight text-base py-2 text-center">
                ស្កេនបង់ប្រាក់
              </p>
              <img src="/ppc_bank_qr.jpeg" className="w-[40mm]" alt="qr" />
            </div>
            {/* <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-blue-500 rounded"></div>
              <p>
                <span class="font-bold">PPC Bank</span> : 1-110-00021880-8
              </p>
            </div> */}

            <div class="flex items-center gap-2">
              <p className="flex">
                <span class="font-bold flex items-center gap-1">
                  <div class="w-4 h-4 bg-blue-500 rounded"></div>
                  PPC Name
                </span>{" "}
                : U2BE,BEAUTY CLINIC
              </p>
            </div>

            <div class="flex items-center gap-2">
              <p className="flex">
                <span class="font-bold flex items-center gap-1">
                  <div class="w-4 h-4 bg-blue-500 rounded"></div>
                  Telegram
                </span>{" "}
                : 069 99 00 62 / 089 99 00 62
              </p>
            </div>

            <div class="flex items-start gap-2">
              <p className="flex items-start">
                <span class="font-bold flex items-center gap-1">
                  <div class="w-4 h-4 bg-blue-500 rounded"></div>
                  Facebook
                </span>{" "}
                : U2BE Beauty Clinic ឯកទេសព្យាបាលមុនដោយមិនញេច
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="flex whitespace-nowrap justify-between gap-4 mt-10 text-center">
            <div className="w-52">
              {/* <p className="text-sm text-gray-700">
                <strong>ហត្ថលេខាអតិថិជន</strong>
              </p> */}
              <p className="text-sm text-gray-700">
                <strong>Issued By</strong>
              </p>
              <hr className="mx-4 border-black mt-14" />
            </div>
            <div className="w-52">
              {/* <p className="text-sm text-gray-700">
                <strong>ហត្ថលេខាអ្នកលក់</strong>
              </p> */}
              <p className="text-sm text-gray-700">
                <strong>Customer Signature</strong>
              </p>
              <hr className="mx-4 max-w-sm border-black mt-14" />
            </div>
          </div>

          <div className="text-sm text-center mt-4">
            <p>អរគុណ សម្រាប់ការបញ្ជាទិញ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceA4;
