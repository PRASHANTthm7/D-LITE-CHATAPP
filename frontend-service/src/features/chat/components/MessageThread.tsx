"use client";

import { MessageBubble } from "./MessageBubble";
import { useEffect, useRef } from "react";

export function MessageThread({ peerId }: { peerId: string }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  const messages = [
    { id: "1", content: "Hey! How are you doing?", isOwn: false, time: "10:30 AM", status: "read" as const },
    { id: "2", content: "I'm doing great, just working on the new chat app design.", isOwn: true, time: "10:32 AM", status: "read" as const },
    { id: "3", content: "That sounds awesome. Can't wait to see it!", isOwn: false, time: "10:35 AM", status: "read" as const },
    { id: "4", content: "I'll send you a preview later today.", isOwn: true, time: "10:38 AM", status: "read" as const },
    { id: "5", content: "Perfect.", isOwn: false, time: "10:40 AM", status: "read" as const },
    { id: "6", content: "See you tomorrow!", isOwn: false, time: "10:42 AM", status: "read" as const },
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
        <MessageBubble key={msg.id} message={msg} />
      ))}
      
      <div ref={bottomRef} />
    </div>
  );
}
