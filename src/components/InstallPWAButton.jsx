"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "use-intl";
import { DownloadIcon } from "lucide-react";

export default function InstallPWAButton({ className }) {
  const t = useTranslations("Index");
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      // Prevent the default prompt
      event.preventDefault();
      // Store the event for later use
      setDeferredPrompt(event);
    };

    // Listen for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check if the app is already installed
    window.addEventListener("appinstalled", () => {
      setIsAppInstalled(true);
    });

    // Cleanup the event listeners
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", () => {
        setIsAppInstalled(true);
      });
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("PWA installed");
      setIsAppInstalled(true);
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
  };

  // // If the app is already installed, don't show the button
  // if (isAppInstalled) {
  //   return null;
  // }

  return (
    <>
      <span className={`cursor-pointer hover:underline ${className}`} onClick={handleInstallClick}>
        <DownloadIcon size={18} /> {t('installApp')}
      </span>
    </>
  );
}
