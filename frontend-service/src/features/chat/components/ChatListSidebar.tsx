"use client";

import React, { useState } from "react";
import { Edit, Search } from "lucide-react";
import { IconButton } from "@/shared/components/IconButton";
import { Input } from "@/shared/components/Input";
import { ChatListItem } from "./ChatListItem";
import { recentChats } from "@/features/dashboard/lib/mock-data";

export function ChatListSidebar() {
  const [search, setSearch] = useState("");

  const filteredChats = recentChats.filter(chat => 
    chat.user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-[280px] h-full border-r themed-border themed-surface flex flex-col shrink-0">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold themed-text">Chats</h2>
          <IconButton size="sm" variant="secondary" tooltip="New chat">
            <Edit size={16} />
          </IconButton>
        </div>
        <Input 
          placeholder="Search chats..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          iconLeft={<Search size={16} />} 
          className="themed-input h-9 py-0 text-sm w-full"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
        {filteredChats.length > 0 ? (
          filteredChats.map(chat => (
            <ChatListItem key={chat.id} chat={chat} />
          ))
        ) : (
          <div className="text-center text-sm text-gray-500 py-8">No chats found</div>
        )}
      </div>
    </div>
  );
}
