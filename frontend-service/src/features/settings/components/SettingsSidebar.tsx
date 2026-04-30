"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Palette, Bell, Shield, KeyRound } from "lucide-react";

export function SettingsSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/settings", icon: User, label: "Profile", exact: true },
    { href: "/settings/appearance", icon: Palette, label: "Appearance" },
    { href: "/settings/notifications", icon: Bell, label: "Notifications" },
    { href: "/settings/privacy", icon: Shield, label: "Privacy & Safety" },
    { href: "/settings/2fa", icon: KeyRound, label: "Two-Factor Auth" },
  ];

  return (
    <div className="w-[260px] h-full border-r border-gray-100 bg-surface flex flex-col shrink-0">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Settings</h2>
        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                  isActive 
                    ? "bg-brand-50 text-brand-700" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={18} className={isActive ? "text-brand-600" : "text-gray-400"} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
