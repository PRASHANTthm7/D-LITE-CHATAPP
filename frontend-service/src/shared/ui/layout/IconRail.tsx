"use client";

import { MessageCircle, Hash, PhoneCall, Sparkles, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";

export function IconRail() {
  const pathname = usePathname() || "";

  const navItems = [
    { icon: <MessageCircle className="w-5 h-5" />, href: "/chat", label: "Chats" },
    { icon: <Hash className="w-5 h-5" />, href: "/groups", label: "Groups" },
    { icon: <PhoneCall className="w-5 h-5" />, href: "/calls", label: "Calls" },
    { icon: <Sparkles className="w-5 h-5" />, href: "/assistant", label: "Assistant" },
  ];

  return (
    <div className="w-[72px] flex-shrink-0 flex flex-col items-center py-6 border-r border-border-subtle bg-surface-1 z-10 hidden md:flex">
      <Link href="/dashboard" className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-accent mb-8 hover:scale-105 transition-transform">
        <MessageCircle className="w-5 h-5 text-white" />
      </Link>

      <nav className="flex flex-col gap-4 w-full px-3">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-brand-primary-soft/50 text-brand-primary" 
                  : "text-text-tertiary hover:bg-surface-2 hover:text-text-primary"
              )}
              title={item.label}
            >
              {isActive && (
                <div className="absolute left-0 w-1 h-8 bg-brand-primary rounded-r-full -ml-3" />
              )}
              {item.icon}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-4 w-full px-3">
        <Link
          href="/settings"
          className={cn(
            "flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 text-text-tertiary hover:bg-surface-2 hover:text-text-primary",
            pathname.startsWith("/settings") && "bg-brand-primary-soft/50 text-brand-primary"
          )}
        >
          <Settings className="w-5 h-5" />
        </Link>
        <div className="w-10 h-10 rounded-full bg-surface-3 border-2 border-surface-1 overflow-hidden cursor-pointer mt-2 mx-auto">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user`} alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
