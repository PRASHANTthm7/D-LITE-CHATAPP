import React from "react";

export interface ReplyQuoteProps {
  authorName: string;
  content: string;
  isOutbound?: boolean;
}

export function ReplyQuote({ authorName, content, isOutbound }: ReplyQuoteProps) {
  return (
    <div 
      className={`mb-2 pl-3 py-1 border-l-2 text-sm rounded-r-md ${
        isOutbound 
          ? "border-white/40 bg-white/10 text-white/90" 
          : "border-[var(--brand-500)] bg-[var(--row-active-bg)] themed-text-2"
      }`}
    >
      <div className={`font-semibold text-xs mb-0.5 ${isOutbound ? "text-white" : "text-[var(--brand-text)]"}`}>
        {authorName}
      </div>
      <div className="truncate opacity-80">{content}</div>
    </div>
  );
}
