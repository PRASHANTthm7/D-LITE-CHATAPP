"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@/shared/components/Avatar";
import { Badge } from "@/shared/components/Badge";
import { ChatPreview } from "@/features/dashboard/lib/mock-data";

export function ChatListItem({ chat }: { chat: ChatPreview }) {
  const pathname = usePathname();
  const isActive = pathname.includes(`/chat/${chat.id}`);

  return (
    <Link 
      href={`/chat/${chat.id}`}
      className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${isActive ? "bg-brand-50" : "hover:bg-gray-50"}`}
    >
      <Avatar initials={chat.user.initials} online={chat.user.isOnline} verified={chat.user.isVerified} size="md" />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-0.5">
          <h4 className="text-sm font-semibold text-gray-900 truncate">{chat.user.name}</h4>
          <span className={`text-xs whitespace-nowrap ml-2 ${isActive ? "text-brand-600" : "text-gray-400"}`}>
            {chat.time}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          {chat.isTyping ? (
            <span className="text-xs text-brand-500 font-medium italic">typing...</span>
          ) : (
            <p className={`text-sm truncate ${isActive || chat.unreadCount > 0 ? "text-gray-900 font-medium" : "text-gray-500"}`}>
              {chat.lastMessage}
            </p>
          )}
          {chat.unreadCount > 0 && <Badge count={chat.unreadCount} />}
        </div>
      </div>
    </Link>
  );
}
