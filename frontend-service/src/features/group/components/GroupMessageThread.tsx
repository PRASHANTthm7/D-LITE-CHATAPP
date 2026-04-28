"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/shared/utils/cn";
import { Avatar } from "@/shared/ui/primitives/avatar";

export function GroupMessageThread({ groupId }: { groupId: string }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  const messages = [
    { id: "1", content: "Hey team! Ready for the sprint planning?", sender: "Alice Smith", role: "Owner", isOwn: false, time: "10:30 AM" },
    { id: "2", content: "Yes, I'll share my screen in a minute.", sender: "Bob Johnson", role: "Admin", isOwn: false, time: "10:32 AM" },
    { id: "3", content: "Great! Let's review the @backend tasks first.", sender: "You", role: "Member", isOwn: true, time: "10:35 AM" },
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col relative">
      <div className="text-center my-6">
        <span className="bg-surface-2 text-text-secondary text-xs px-3 py-1 rounded-full font-medium">
          Today
        </span>
      </div>
      
      {messages.map(msg => (
        <div key={msg.id} className={cn("flex flex-col mb-4 max-w-[85%] relative group animate-in fade-in slide-in-from-bottom-2 duration-300", msg.isOwn ? "ml-auto items-end" : "mr-auto items-start")}>
          {!msg.isOwn && (
             <div className="flex items-center gap-2 mb-1 pl-1">
               <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.sender}`} size="sm" className="w-5 h-5" />
               <span className="text-xs font-semibold text-text-secondary">{msg.sender}</span>
               {msg.role !== 'Member' && (
                  <span className={`text-[8px] font-bold px-1 rounded uppercase ${msg.role === 'Owner' ? 'bg-[#a855f7]/20 text-[#a855f7]' : 'bg-warning/20 text-warning'}`}>
                    {msg.role}
                  </span>
               )}
             </div>
          )}
          <div className={cn(
            "px-4 py-2.5 rounded-2xl relative shadow-sm",
            msg.isOwn 
              ? "bg-brand-gradient text-white rounded-br-sm" 
              : "bg-surface-1 border border-border-default text-text-primary rounded-bl-sm"
          )}>
            <p className="text-[15px] leading-relaxed break-words whitespace-pre-wrap">
              {msg.content.split(/(@\w+)/g).map((part, i) => 
                part.startsWith('@') ? <span key={i} className={cn("px-1 rounded font-medium", msg.isOwn ? "bg-white/20" : "bg-brand-primary-soft text-brand-primary")}>{part}</span> : part
              )}
            </p>
            <div className={cn(
              "flex items-center justify-end gap-1 mt-1 text-[10px]",
              msg.isOwn ? "text-white/80" : "text-text-tertiary"
            )}>
              <span>{msg.time}</span>
            </div>
          </div>
        </div>
      ))}
      
      <div ref={bottomRef} />
    </div>
  );
}
