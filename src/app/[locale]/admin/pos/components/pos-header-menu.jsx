"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BASE_API_URL, BASE_BACKEND_URL } from "@/config/env"; 
import {
  AlignLeft,
  Layout,
  LogOut,
  PanelsTopLeft,
  PanelTop,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const POSHeaderMenu = ({ className }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const router = useRouter();
  if (!token) {
    router.push("/login");
  }
  const handleLogout = async () => {
    // API URL for logout (update with your backend's actual URL)
    const url = `${BASE_API_URL}/logout`;

    try {
      // Send a logout request to the server
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      // console.log(result)

      if (response.ok) {
        // If logout is successful, remove the token from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Redirect to the login page
        router.push("/login");
      } else {
        // Handle error (e.g., show an error message)
        console.error("Logout failed", response);
      }
    } catch (error) {
      console.error("Logout error", error);
    }
  };
  return (
    <div className={`${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 h-11 border-[0.5px]"
          >
            <AlignLeft className="text-primary" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-48">
          <DropdownMenuLabel>
            <span className="flex items-center justify-between w-full">
              Toggle Mode <ModeToggle />
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/`} className="flex items-center gap-1">
              <PanelTop size={18} />
              Frontend Page
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={BASE_BACKEND_URL} className="flex items-center gap-1">
              <PanelsTopLeft size={18} />
              Admin Page
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <div>
              <p className="font-semibold line-clamp-1">{user?.name}</p>
              <p className="line-clamp-2">{user?.email}</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              onClick={() => handleLogout()}
              className="flex items-center gap-1"
            >
              <LogOut size={18} /> Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
    </div>
  );
};

export default POSHeaderMenu;
