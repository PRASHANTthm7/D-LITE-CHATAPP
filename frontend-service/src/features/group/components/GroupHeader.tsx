"use client";

import { Phone, Video, Search, MoreVertical, Users, ArrowLeft, PanelRightClose } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/ui/primitives/button";

export function GroupHeader({ groupId }: { groupId: string }) {
  const group = {
    name: groupId === "grp-1" ? "Engineering Team" : "Group " + groupId,
    membersCount: 12,
    onlineCount: 4
  };

  return (
    <div className="h-16 border-b border-border-default bg-surface-1 flex items-center justify-between px-4 flex-shrink-0 z-10">
      <div className="flex items-center gap-3">
        <Link href="/groups" className="md:hidden p-2 -ml-2 text-text-secondary hover:text-text-primary">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center text-white">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-bold text-sm">{group.name}</h2>
          <p className="text-xs text-text-secondary">{group.membersCount} members, {group.onlineCount} online</p>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="rounded-full text-text-secondary">
          <Phone className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full text-text-secondary">
          <Video className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full text-text-secondary">
          <PanelRightClose className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full text-text-secondary">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
