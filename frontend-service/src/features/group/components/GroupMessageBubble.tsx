"use client";

import React from "react";
import { MessageBubble, MessageBubbleProps } from "@/features/chat/components/MessageBubble";
import { RoleBadge } from "./RoleBadge";

export interface GroupMessageBubbleProps extends MessageBubbleProps {
  authorName: string;
  role?: "owner" | "admin" | "mod" | "member";
}

export function GroupMessageBubble({ authorName, role = "member", ...props }: GroupMessageBubbleProps) {
  const isOut = props.direction === "out";

  return (
    <div className={`flex flex-col ${isOut ? "items-end" : "items-start"}`}>
      {!isOut && (
        <div className="flex items-center gap-2 mb-1 pl-1">
          <span className="text-xs font-semibold themed-text-2">{authorName}</span>
          <RoleBadge role={role} />
        </div>
      )}
      <MessageBubble {...props} />
    </div>
  );
}
