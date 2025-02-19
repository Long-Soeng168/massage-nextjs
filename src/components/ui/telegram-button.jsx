import { APP_TELEGRAM } from "@/config/website-detail";
import { ChevronUp } from "lucide-react";
import Link from "next/link";

export default function TelegramButton() {
  return (
    <>
      {
        <Link
          href={APP_TELEGRAM}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <img className="object-contain w-16 transition-all duration-300 hover:scale-105" src="/images/icons/telegram_square.png" />
        </Link>
      }
    </>
  );
}
