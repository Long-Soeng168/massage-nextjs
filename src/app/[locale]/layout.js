import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import { Kantumruy_Pro } from "next/font/google";
import { APP_FAVICON } from "@/config/website-detail";

const kantumruyPro = Kantumruy_Pro({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["khmer"],
});

export const metadata = {
  icons: {
    icon: `${APP_FAVICON}`,
  },
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) {
    console.log("Available locales:", routing.locales);
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <>
      <html lang={locale} suppressHydrationWarning>
        <body className={`${kantumruyPro.className}`}>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </>
  );
}
