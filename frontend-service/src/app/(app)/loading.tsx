import React from "react";
import { MessageSquare } from "lucide-react";

export default function AppLoading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full w-full themed-canvas animate-in fade-in duration-500">
      <div className="w-16 h-16 rounded-2xl brand-grad flex items-center justify-center shadow-glow text-white mb-6 relative overflow-hidden">
        <MessageSquare size={32} className="relative z-10" />
        <div className="absolute inset-0 bg-white/20 animate-pulse" />
      </div>
      <div className="flex gap-1.5 items-center">
        <div className="w-2 h-2 rounded-full bg-[var(--brand-500)] animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="w-2 h-2 rounded-full bg-[var(--brand-500)] animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="w-2 h-2 rounded-full bg-[var(--brand-500)] animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}
