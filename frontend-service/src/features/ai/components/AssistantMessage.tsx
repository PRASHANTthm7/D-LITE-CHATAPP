"use client";

import { Sparkles, Copy, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export interface AssistantMessageProps {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function AssistantMessage({ message }: { message: AssistantMessageProps }) {
  const isAssistant = message.role === "assistant";

  return (
    <div className={cn("flex gap-4 w-full mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500", isAssistant ? "" : "flex-row-reverse")}>
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 shadow-sm",
        isAssistant ? "bg-gradient-to-br from-[#a855f7] to-brand-primary text-white" : "bg-surface-3"
      )}>
        {isAssistant ? <Sparkles className="w-4 h-4" /> : <span className="text-xs font-bold">U</span>}
      </div>

      <div className={cn("flex flex-col gap-2 max-w-[80%]", isAssistant ? "items-start" : "items-end")}>
        <div className={cn(
          "px-5 py-3.5 text-[15px] leading-relaxed rounded-3xl shadow-sm",
          isAssistant 
            ? "bg-surface-1 border border-border-default/50 text-text-primary rounded-tl-sm" 
            : "bg-surface-3 text-text-primary rounded-tr-sm"
        )}>
          {message.content}
        </div>

        {isAssistant && (
          <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ opacity: 1 }}>
            <button className="p-1.5 text-text-tertiary hover:text-text-primary rounded-md hover:bg-surface-2 transition-colors" title="Copy">
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 text-text-tertiary hover:text-success rounded-md hover:bg-surface-2 transition-colors" title="Helpful">
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 text-text-tertiary hover:text-danger rounded-md hover:bg-surface-2 transition-colors" title="Not helpful">
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
            <div className="w-[1px] h-3 bg-border-subtle mx-1" />
            <button className="p-1.5 text-text-tertiary hover:text-text-primary rounded-md hover:bg-surface-2 transition-colors flex items-center gap-1.5 text-xs font-medium" title="Retry">
              <RotateCcw className="w-3 h-3" />
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
