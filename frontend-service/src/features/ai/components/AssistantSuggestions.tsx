"use client";

import { Sparkles, PenLine, Languages, FileText } from "lucide-react";

export function AssistantSuggestions() {
  const suggestions = [
    { icon: <PenLine className="w-4 h-4" />, text: "Draft a polite reply" },
    { icon: <Languages className="w-4 h-4" />, text: "Translate text" },
    { icon: <FileText className="w-4 h-4" />, text: "Summarize chat" },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {suggestions.map((s, i) => (
        <button 
          key={i}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-1 border border-border-default/50 text-sm text-text-secondary hover:text-text-primary hover:border-[#a855f7]/30 hover:bg-[#a855f7]/5 hover:shadow-sm transition-all"
        >
          <span className="text-[#a855f7]">{s.icon}</span>
          {s.text}
        </button>
      ))}
    </div>
  );
}
