"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth-context";
import { LogOut } from "lucide-react";

export function UserAvatar() {
  const { user, logout, isLoggedIn } = useAuth();
  const router = useRouter();

  if (!isLoggedIn) {
    return null;
  }

  const getInitials = (name?: string | null): string => {
    if (!name) return "?";

    const names = name.split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();

    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer h-10 w-10 border-2 border-slate-200 hover:border-slate-300 transition-colors">
          <AvatarImage
            src={user?.image || undefined}
            alt={user?.name || "User"}
          />
          <AvatarFallback className="bg-slate-100 text-slate-700 font-medium">
            {getInitials(user?.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 p-2 rounded-xl border border-slate-200 shadow-lg"
      >
        <div className="px-3 py-2">
          <div className="font-medium text-slate-900">
            {user?.name || "User"}
          </div>
          <div className="text-xs text-slate-500">{user?.email}</div>
        </div>

        <DropdownMenuSeparator className="my-2" />

        {/* Custom styled item that overrides any default hover effects */}
        <div
          onClick={handleLogout}
          className="cursor-pointer px-3 py-2 flex items-center gap-2 bg-red-500 text-white rounded-md mx-1 hover:bg-red-600"
        >
          <LogOut size={16} />
          <span>Log out</span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
