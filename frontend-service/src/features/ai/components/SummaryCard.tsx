"use client";

import { Sparkles, X } from "lucide-react";
import { useState } from "react";

export function SummaryCard() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="mx-4 my-6 bg-gradient-to-br from-[#a855f7]/10 to-brand-primary-soft/20 border border-[#a855f7]/20 rounded-2xl p-4 shadow-sm relative animate-in fade-in zoom-in-95 duration-500">
      <button 
        onClick={() => setVisible(false)}
        className="absolute top-3 right-3 text-text-tertiary hover:text-text-primary transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-[#a855f7] flex items-center justify-center text-white shadow-sm shadow-[#a855f7]/40">
          <Sparkles className="w-3 h-3" />
        </div>
        <h3 className="font-bold text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#a855f7] to-brand-primary">
          While you were away...
        </h3>
      </div>
      
      <p className="text-sm text-text-secondary leading-relaxed mb-3">
        <span className="font-semibold text-text-primary">Alice</span> shared the new design mocks for the dashboard. <span className="font-semibold text-text-primary">Bob</span> suggested changes to the color palette, and the team agreed to review it in the next meeting at 2 PM.
      </p>
      
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium px-2 py-1 bg-surface-1 rounded-md shadow-sm border border-border-subtle">
          Design
        </span>
        <span className="text-xs font-medium px-2 py-1 bg-surface-1 rounded-md shadow-sm border border-border-subtle">
          Meeting at 2 PM
        </span>
      </div>
    </div>
  );
}
