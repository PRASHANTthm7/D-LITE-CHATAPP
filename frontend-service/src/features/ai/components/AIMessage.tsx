"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export function AIMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-4 w-full mb-6">
      <div className="w-8 h-8 rounded-full brand-grad flex items-center justify-center text-white shrink-0 mt-1 shadow-sm">
        <Sparkles size={14} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="themed-surface border border-[var(--brand-200)]/50 rounded-2xl rounded-tl-sm p-4 shadow-card themed-text leading-relaxed text-[15px]">
          {children}
        </div>
      </div>
    </div>
  );
}
