"use client";

import { Sparkles } from "lucide-react";

export function SmartReplyStrip() {
  const replies = ["Sounds great!", "Let me check and get back to you.", "Can we reschedule?"];

  return (
    <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto no-scrollbar border-t border-border-default bg-surface-1/50 backdrop-blur-sm animate-in slide-in-from-bottom-2">
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#a855f7]/10 flex-shrink-0">
        <Sparkles className="w-3.5 h-3.5 text-[#a855f7]" />
      </div>
      {replies.map((reply, i) => (
        <button 
          key={i}
          className="whitespace-nowrap px-3 py-1.5 rounded-full bg-surface-2 border border-border-subtle text-sm text-text-secondary hover:bg-surface-3 hover:text-text-primary transition-colors flex-shrink-0"
        >
          {reply}
        </button>
      ))}
    </div>
  );
}
