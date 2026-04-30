"use client";

import React from "react";
import { Check, CheckCheck } from "lucide-react";
import { ReplyQuote } from "./ReplyQuote";
import { ReactionPill } from "./ReactionPill";

export interface MessageBubbleProps {
  id: string;
  content: string;
  direction: "in" | "out";
  status?: "sending" | "sent" | "read";
  time: string;
  reactions?: { emoji: string; count: number; active?: boolean }[];
  replyTo?: { authorName: string; content: string };
  onReact?: (emoji: string) => void;
}

export function MessageBubble({
  content,
  direction,
  status = "read",
  time,
  reactions = [],
  replyTo,
  onReact,
}: MessageBubbleProps) {
  const isOut = direction === "out";

  return (
    <div className={`flex w-full mb-4 ${isOut ? "justify-end" : "justify-start"} group relative`}>
      {/* Visual Reaction Picker Stub on Hover */}
      <div className={`absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 ${isOut ? "right-full mr-2" : "left-full ml-2"}`}>
        {["🔥", "👍", "❤️"].map(emoji => (
          <button 
            key={emoji} 
            onClick={() => onReact?.(emoji)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-surface shadow-sm border border-gray-100 hover:scale-110 transition-transform text-sm"
          >
            {emoji}
          </button>
        ))}
      </div>

      <div className={`relative max-w-[70%] flex flex-col ${isOut ? "items-end" : "items-start"}`}>
        <div 
          className={`px-4 py-3 rounded-2xl shadow-sm relative ${
            isOut 
              ? "brand-grad text-white rounded-tr-sm" 
              : "bg-surface border border-gray-100 text-gray-900 rounded-tl-sm"
          }`}
        >
          {replyTo && (
            <ReplyQuote 
              authorName={replyTo.authorName} 
              content={replyTo.content} 
              isOutbound={isOut} 
            />
          )}
          
          <div className="text-[15px] leading-relaxed whitespace-pre-wrap">{content}</div>
          
          <div className={`flex items-center justify-end gap-1 mt-1 text-[11px] ${isOut ? "text-white/80" : "text-gray-400"}`}>
            <span>{time}</span>
            {isOut && (
              <span className="ml-0.5">
                {status === "sending" && <Check size={14} className="opacity-50" />}
                {status === "sent" && <Check size={14} />}
                {status === "read" && <CheckCheck size={14} className="text-orange-200" />}
              </span>
            )}
          </div>
        </div>

        {reactions.length > 0 && (
          <div className={`flex flex-wrap gap-1 mt-1 z-10 ${isOut ? "-mr-2" : "-ml-2"}`}>
            {reactions.map((r, i) => (
              <ReactionPill 
                key={i} 
                emoji={r.emoji} 
                count={r.count} 
                active={r.active} 
                onClick={() => onReact?.(r.emoji)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
