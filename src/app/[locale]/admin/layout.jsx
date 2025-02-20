"use client";
import MyLoadingAnimation from "@/components/ui/my-loading-animation";
import { Toaster } from "@/components/ui/toaster";
import { BASE_API_URL } from "@/config/env";
import { POSCartProvider } from "@/contexts/POSContext";
import { POSDetailProvider } from "@/contexts/POSDetailContext";
import { InvoiceProvider } from "@/contexts/POSInvoiceContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      // Ensure this runs only on the client side
      if (typeof window === "undefined") {
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      const isAuthenticated = !!token;

      if (!isAuthenticated) {
        setLoading(false);
        router.push("/login");
        return;
      }

      try {
        const url = `${BASE_API_URL}/user`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user: ${response.statusText}`);
        }

        const result = await response.json();

        if (result.isSuccess) {
          setLoading(false);
        } else {
          throw new Error("User data is not valid");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
      }
    };

    checkAuthentication();
  }, [router]);

  return loading ? (
    <MyLoadingAnimation />
  ) : (
    <POSCartProvider>
      <POSDetailProvider>
        <InvoiceProvider>{children}</InvoiceProvider>
        <Toaster />
      </POSDetailProvider>
    </POSCartProvider>
  );
};

export default AdminLayout;
