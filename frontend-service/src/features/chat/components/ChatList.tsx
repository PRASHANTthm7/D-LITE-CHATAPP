"use client";

import { Input } from "@/shared/ui/primitives/input";
import { Avatar } from "@/shared/ui/primitives/avatar";
import { Search, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";

export function ChatList() {
  const pathname = usePathname();

  // Mock data for UI
  const chats = [
    { id: "peer-1", name: "Alice Smith", lastMsg: "See you tomorrow!", time: "10:42 AM", unread: 2, status: "online" as const },
    { id: "peer-2", name: "Bob Johnson", lastMsg: "typing...", time: "Just now", unread: 0, status: "online" as const, typing: true },
    { id: "peer-3", name: "Charlie Davis", lastMsg: "Sounds good.", time: "Yesterday", unread: 0, status: "offline" as const },
  ];

  return (
    <>
      <div className="p-4 border-b border-border-default">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-xl">Chats</h2>
          <button className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center text-text-secondary hover:text-brand-primary transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-text-tertiary" />
          <Input className="pl-9 h-11 bg-surface-2 border-transparent" placeholder="Search chats..." />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => {
          const isActive = pathname === `/chat/${chat.id}`;
          return (
            <Link 
              key={chat.id} 
              href={`/chat/${chat.id}`}
              className={cn(
                "flex items-center gap-3 p-4 border-b border-border-subtle hover:bg-surface-2 transition-colors relative group",
                isActive && "bg-brand-primary-soft/20"
              )}
            >
              {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary rounded-r-full" />}
              
              <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.name}`} status={chat.status} size="lg" />
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-medium truncate text-sm">{chat.name}</h3>
                  <span className={cn("text-xs flex-shrink-0 ml-2", chat.unread > 0 ? "text-brand-primary font-medium" : "text-text-tertiary")}>
                    {chat.time}
                  </span>
                </div>
                <p className={cn("text-sm truncate", chat.typing ? "text-brand-primary italic" : "text-text-secondary")}>
                  {chat.lastMsg}
                </p>
              </div>

              {chat.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center text-[10px] font-bold text-white shadow-accent">
                  {chat.unread}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
}
