"use client";

import React, { useRef, useEffect } from "react";
import { MessageBubble, MessageBubbleProps } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";

export interface ThreadMessage extends MessageBubbleProps {
  id: string;
  dateStr?: string; // Optional separator before this message
}

export interface MessageThreadProps {
  messages: ThreadMessage[];
  typingUser?: { name: string; initials: string };
}

export function MessageThread({ messages, typingUser }: MessageThreadProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUser]);

  return (
    <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
      {messages.map((msg) => (
        <React.Fragment key={msg.id}>
          {msg.dateStr && (
            <div className="flex justify-center my-6">
              <span className="bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                {msg.dateStr}
              </span>
            </div>
          )}
          <MessageBubble {...msg} />
        </React.Fragment>
      ))}

      {typingUser && (
        <TypingIndicator name={typingUser.name} initials={typingUser.initials} />
      )}
      <div ref={bottomRef} className="h-4" />
    </div>
  );
}
