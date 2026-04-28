"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export function QuickSwitcher() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-surface-1/80 backdrop-blur-sm z-50 animate-in fade-in" onClick={() => setOpen(false)} />
      <div className="fixed left-[50%] top-[20%] z-50 w-full max-w-2xl translate-x-[-50%] bg-surface-1 border border-border-strong shadow-2xl rounded-2xl overflow-hidden animate-in fade-in zoom-in-95">
        <div className="flex items-center border-b border-border-default px-4 h-14">
          <Search className="w-5 h-5 text-text-tertiary mr-3" />
          <input 
            autoFocus
            className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-text-tertiary"
            placeholder="Search messages, people, groups..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border border-border-default bg-surface-2 px-2 font-mono text-[10px] font-medium text-text-secondary opacity-100">
            ESC
          </kbd>
        </div>
        <div className="p-4 py-8 text-center text-sm text-text-tertiary">
          {query ? "No results found for your query." : "Type a command or search..."}
        </div>
      </div>
    </>
  );
}
