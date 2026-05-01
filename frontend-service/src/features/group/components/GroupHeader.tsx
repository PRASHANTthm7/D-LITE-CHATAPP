"use client";

import React from "react";
import { Phone, Video, MoreVertical, Hash, Lock } from "lucide-react";
import { IconButton } from "@/shared/components/IconButton";
import { StackedAvatar } from "./StackedAvatar";
import { Pill } from "@/shared/components/Pill";
import { GroupPreview } from "@/features/dashboard/lib/mock-data";

export interface GroupHeaderProps {
  group: GroupPreview;
  isPrivate?: boolean;
}

export function GroupHeader({ group, isPrivate = false }: GroupHeaderProps) {
  const onlineCount = group.members.filter(m => m.isOnline).length;

  return (
    <div className="h-[72px] shrink-0 border-b themed-border themed-surface/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 cursor-pointer group">
        <StackedAvatar members={group.members} max={3} />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold themed-text group-hover:text-[var(--brand-text)] transition-colors">
              {group.name}
            </h3>
            <Pill variant={isPrivate ? "neutral" : "success"} className="text-[10px] px-1.5 py-0 h-4 flex items-center gap-1">
              {isPrivate ? <Lock size={10} /> : <Hash size={10} />}
              {isPrivate ? "Private" : "Public"}
            </Pill>
          </div>
          <div className="text-xs themed-text-3 flex items-center h-4 mt-0.5">
            <span className="text-success font-medium">{onlineCount} online</span>
            <span className="mx-1.5">·</span>
            <span>{group.members.length} members</span>
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
