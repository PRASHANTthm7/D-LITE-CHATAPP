"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Users, Phone, Sparkles, Settings, LogOut } from "lucide-react";
import { Avatar } from "@/shared/components/Avatar";
import { Badge } from "@/shared/components/Badge";
import { ThemeToggle } from "@/shared/components/ThemeToggle";
import { signOut } from "@/core/auth/actions";

interface IconRailProps {
  userInitials?: string;
  userAvatarUrl?: string;
}

export function IconRail({ userInitials = "DL", userAvatarUrl }: IconRailProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/chat", icon: MessageSquare, label: "Chat", badge: 3 },
    { href: "/groups", icon: Users, label: "Groups" },
    { href: "/calls", icon: Phone, label: "Calls" },
    { href: "/ai", icon: Sparkles, label: "AI Assistant" },
  ];

  return (
    <div className="w-[60px] h-screen themed-surface border-r themed-border flex flex-col items-center py-4 justify-between shrink-0">
      <div className="flex flex-col items-center gap-6 w-full">
        <Link href="/dashboard" className="w-10 h-10 rounded-xl brand-grad flex items-center justify-center shadow-accent mb-2">
          <MessageSquare size={20} className="text-white" />
        </Link>

        <div className="flex flex-col gap-4 w-full px-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center justify-center w-11 h-11 mx-auto rounded-xl transition-all ${
                  isActive
                    ? "brand-grad text-white shadow-accent"
                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
                }`}
                title={item.label}
              >
                <Icon size={20} className={isActive ? "text-white" : ""} />
                {item.badge && (
                  <div className="absolute -top-1 -right-1">
                    <Badge count={item.badge} className="scale-75 origin-top-right border-2 border-surface" />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 w-full">
        <ThemeToggle />
        <Link
          href="/settings"
          className={`flex items-center justify-center w-11 h-11 rounded-xl transition-colors ${
            pathname.startsWith("/settings") ? "bg-gray-100 text-brand-600" : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
          }`}
          title="Settings"
        >
          <Settings size={20} />
        </Link>

        <form action={signOut}>
          <button
            type="submit"
            className="flex items-center justify-center w-11 h-11 rounded-xl transition-colors text-gray-400 hover:text-red-500 hover:bg-red-50"
            title="Sign out"
          >
            <LogOut size={20} />
          </button>
        </form>

        <Link href="/settings">
          <Avatar
            initials={userInitials}
            src={userAvatarUrl}
            online
            size="sm"
            className="hover:scale-105 transition-transform cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
}
