"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";
import { ProfileMenu } from "./ProfileMenu";

export function AppTopBar() {
  return (
    <header className="h-[68px] flex items-center justify-between px-6 bg-surface-1/80 backdrop-blur-md z-10 sticky top-0 flex-shrink-0">
      <div className="flex items-center gap-4">
        {/* Cmd+K trigger visual */}
        <Button variant="secondary" className="hidden md:flex justify-start w-64 text-text-tertiary font-normal px-3 border-border-subtle hover:border-border-default bg-surface-2 shadow-none" onClick={() => {
            const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
            document.dispatchEvent(event);
        }}>
          <Search className="w-4 h-4 mr-2" />
          Search everything...
          <kbd className="ml-auto pointer-events-none inline-flex h-5 items-center gap-1 rounded border border-border-default bg-surface-1 px-1.5 font-mono text-[10px] font-medium text-text-secondary opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="w-5 h-5 text-text-secondary" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-primary border-2 border-surface-1" />
        </Button>
        <ProfileMenu />
      </div>
    </header>
  );
}
