"use client";

import React from "react";
import { Phone, Video, MoreVertical } from "lucide-react";
import { Avatar } from "@/shared/components/Avatar";
import { IconButton } from "@/shared/components/IconButton";
import { TypingDots } from "@/shared/components/TypingDots";
import { User } from "@/features/dashboard/lib/mock-data";

export interface ChatHeaderProps {
  user: User;
  isTyping?: boolean;
}

export function ChatHeader({ user, isTyping }: ChatHeaderProps) {
  return (
    <div className="h-[72px] shrink-0 border-b themed-border themed-surface/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 cursor-pointer group">
        <Avatar initials={user.initials} online={user.isOnline} verified={user.isVerified} size="md" />
        <div>
          <h3 className="font-bold themed-text group-hover:text-[var(--brand-text)] transition-colors">
            {user.name}
          </h3>
          <div className="text-xs themed-text-2 flex items-center h-4">
            {isTyping ? (
              <div className="flex items-center gap-1.5 text-brand-500">
                <TypingDots /> <span className="italic">typing...</span>
              </div>
            ) : (
              user.isOnline ? "Online now" : "Last seen recently"
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <IconButton size="md" variant="ghost" className="themed-text-2 hover:text-[var(--brand-text)] hover:bg-[var(--row-hover-bg)]" tooltip="Audio Call">
          <Phone size={20} />
        </IconButton>
        <IconButton size="md" variant="ghost" className="themed-text-2 hover:text-[var(--brand-text)] hover:bg-[var(--row-hover-bg)]" tooltip="Video Call">
          <Video size={20} />
        </IconButton>
        <div className="w-px h-6 themed-border bg-[var(--border-soft)] mx-1" />
        <IconButton size="md" variant="ghost" className="themed-text-2 hover:themed-text" tooltip="More">
          <MoreVertical size={20} />
        </IconButton>
      </div>
    </div>
  );
}
