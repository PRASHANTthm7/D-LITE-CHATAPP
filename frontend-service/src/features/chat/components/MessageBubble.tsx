"use client";

import { cn } from "@/shared/utils/cn";
import { Check, CheckCheck, Clock } from "lucide-react";

export interface MessageProps {
  id: string;
  content: string;
  isOwn: boolean;
  time: string;
  status?: "sending" | "sent" | "delivered" | "read" | "failed";
}

export function MessageBubble({ message }: { message: MessageProps }) {
  return (
    <div className={cn("flex flex-col mb-4 max-w-[85%] relative group animate-in fade-in slide-in-from-bottom-2 duration-300", message.isOwn ? "ml-auto items-end" : "mr-auto items-start")}>
      <div className={cn(
        "px-4 py-2.5 rounded-2xl relative shadow-sm",
        message.isOwn 
          ? "bg-brand-gradient text-white rounded-br-sm" 
          : "bg-surface-1 border border-border-default text-text-primary rounded-bl-sm"
      )}>
        <p className="text-[15px] leading-relaxed break-words whitespace-pre-wrap">{message.content}</p>
        <div className={cn(
          "flex items-center justify-end gap-1 mt-1 text-[10px]",
          message.isOwn ? "text-white/80" : "text-text-tertiary"
        )}>
          <span>{message.time}</span>
          {message.isOwn && (
            <span className="ml-0.5">
              {message.status === 'sending' && <Clock className="w-3 h-3" />}
              {message.status === 'sent' && <Check className="w-3 h-3" />}
              {message.status === 'delivered' && <CheckCheck className="w-3 h-3 opacity-60" />}
              {message.status === 'read' && <CheckCheck className="w-3 h-3 text-[#fde047]" />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
