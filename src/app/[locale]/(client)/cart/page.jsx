"use client";

import { useEffect, useState } from "react";
import MyStepper from "@/components/my-stepper";
import MySummary from "@/components/my-summary";
import { Button } from "@/components/ui/button";
import { IMAGE_BOOK_URL } from "@/config/env";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ListX, Trash2Icon, X } from "lucide-react";
import { useTranslations } from "next-intl";
import ScrollToTop from "@/components/scroll-to-top";

const CartPage = () => {
  const t = useTranslations('Index');
  const { cartItems, removeFromCart, clearCart, handleQuantityChange } =
    useCart();
  const [isClient, setIsClient] = useState(false); // Track if it's client-side

  useEffect(() => {
    setIsClient(true); // Set to true once the component is mounted on the client
  }, []);

  if (!isClient) {
    return null; // Don't render anything until it's client-side
  }

  const getTotalPrice = () => {
    return cartItems
      .reduce(
        (total, item) =>
          total +
          (item.price - (item.discount / 100) * item.price) * item.quantity,
        0
      )
      .toFixed(2);
  };

  return (
    <div className="flex flex-col min-h-screen mb-8 lg:px-4">
      <ScrollToTop />

      <MyStepper currentStep={1} />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[4fr_2fr] gap-8 ">
        <div className="p-2 py-4 border rounded-lg shadow-lg lg:p-8 bg-background">
          <div>
            <h1 className="mb-4 text-2xl font-bold">
              {t('shoppingCart')}
            </h1>
            <div className="overflow-x-auto border border-border">
              <ScrollArea className="max-h-[100vh]">
                <table className="min-w-full bg-background">
                  <thead>
                    <tr className="bg-primary/10 dark:bg-border">
                      <th className="p-4 font-normal text-left ">No</th>
                      <th className="p-4 font-normal text-center ">{t('image')}</th>
                      <th className="p-4 font-normal text-left ">{t('title')}</th>
                      <th className="p-4 font-normal text-left ">{t('price')}</th>
                      <th className="p-4 font-normal text-left ">{t('quantity')}</th>
                      <th className="p-4 font-normal text-left ">{t('subTotal')}</th>
                      <th className="p-4 font-normal text-center ">{t('action')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={item.id} className="border-b border-border">
                        <td className="p-4">{index + 1}</td>
                        <td className="flex justify-center w-auto">
                          <Image
                            src={IMAGE_BOOK_URL + item.image}
                            alt={item.title}
                            width={50}
                            height={50}
                            className="py-1.5"
                          />
                        </td>
                        <td className="p-4 pl-0 min-w-40">
                          <h2 className="line-clamp-3">{item.title}</h2>
                        </td>
                        <td className="p-4">
                          {item.discount != 0 ? (
                            <p className="flex space-x-2 overflow-hidden text-lg text-gray-400 whitespace-nowrap text-ellipsis">
                              <span className="line-through whitespace-nowrap">
                                {item.price} $
                              </span>
                              <span className="text-primary">
                                {(
                                  item.price -
                                  (item.discount / 100) * item.price
                                ).toFixed(2)}
                                $
                              </span>
                            </p>
                          ) : (
                            <p className="max-w-full overflow-hidden text-lg text-primary text-ellipsis">
                              {item.price} $
                            </p>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="px-2 py-1 text-sm font-semibold rounded-lg bg-border"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="px-2 py-1 text-sm font-semibold rounded-lg bg-border"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-4">
                          {item.discount != 0 ? (
                            <p className="space-x-2 overflow-hidden text-lg text-gray-400 text-ellipsis">
                              <span className="text-primary">
                                {(
                                  (item.price -
                                    (item.discount / 100) * item.price) *
                                  item.quantity
                                ).toFixed(2)}
                                $
                              </span>
                            </p>
                          ) : (
                            <p className="max-w-full overflow-hidden text-lg text-primary text-ellipsis">
                              {item.price * item.quantity} $
                            </p>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => removeFromCart(item)}
                            className="text-red-400 hover:text-red-700"
                          >
                            <Trash2Icon />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ScrollArea>
            </div>
            <h2 className="p-4 text-2xl font-bold border-b border-l border-r text-end">
              {t('total')}: ${getTotalPrice()}
            </h2>

            {cartItems.length > 0 ? (
              <div className="flex justify-between mt-4">
                <Button onClick={clearCart} variant="destructive">
                  <X /> {t('clearCart')}
                </Button>
                <Button>
                  <Link href="/cart/checkout">{t('checkout')}</Link>
                </Button>
              </div>
            ) : (
              <p className="mt-8 text-center text-gray-500">
                {t('noData')}...
              </p>
            )}
          </div>
        </div>
        <MySummary />
      </main>
    </div>
  );
};

export default CartPage;
