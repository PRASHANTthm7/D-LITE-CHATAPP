"use client";

import { User, Palette, Bell, Sparkles, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";

export function SettingsSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/settings", label: "My Account", icon: <User className="w-5 h-5" />, exact: true },
    { href: "/settings/appearance", label: "Appearance", icon: <Palette className="w-5 h-5" /> },
    { href: "/settings/notifications", label: "Notifications", icon: <Bell className="w-5 h-5" /> },
    { href: "/settings/ai", label: "AI Preferences", icon: <Sparkles className="w-5 h-5" /> },
    { href: "/settings/privacy", label: "Privacy & Security", icon: <Shield className="w-5 h-5" /> },
  ];

  return (
    <div className="w-[280px] border-r border-border-default h-full p-4 hidden md:block flex-shrink-0 bg-surface-1">
      <h2 className="font-bold text-2xl mb-6 px-2 mt-4 text-text-primary">Settings</h2>
      <nav className="flex flex-col gap-1">
        {links.map((link) => {
          const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-brand-primary-soft text-brand-primary" 
                  : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
              )}
            >
              {link.icon}
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
