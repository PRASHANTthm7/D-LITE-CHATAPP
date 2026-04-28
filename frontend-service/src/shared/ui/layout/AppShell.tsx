"use client";

import { IconRail } from "./IconRail";
import { AppTopBar } from "./AppTopBar";
import { QuickSwitcher } from "@/features/notifications/components/QuickSwitcher";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-surface-1 text-text-primary overflow-hidden">
      <IconRail />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppTopBar />
        <main className="flex-1 overflow-auto bg-surface-2/50 rounded-tl-2xl border-l border-t border-border-default shadow-sm relative">
          {children}
        </main>
      </div>
      <QuickSwitcher />
    </div>
  );
}
