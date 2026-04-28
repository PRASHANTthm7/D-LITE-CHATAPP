"use client";

import { Languages } from "lucide-react";

export function TranslationOverlay({ text, translatedText }: { text: string, translatedText: string }) {
  return (
    <div className="mt-2 pt-2 border-t border-white/20">
      <div className="flex items-center gap-1.5 mb-1 opacity-70">
        <Languages className="w-3 h-3" />
        <span className="text-[10px] uppercase font-bold tracking-wider">Translated from Spanish</span>
      </div>
      <p className="text-[14px] leading-relaxed">{translatedText}</p>
    </div>
  );
}
