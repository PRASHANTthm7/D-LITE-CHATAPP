import React from "react";
import Link from "next/link";
import { RecentChatCard } from "./RecentChatCard";
import { recentChats } from "../lib/mock-data";

export function RecentChatsGrid() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Recent Chats</h2>
        <Link href="/chat" className="text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentChats.map((chat) => (
          <RecentChatCard key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
}
