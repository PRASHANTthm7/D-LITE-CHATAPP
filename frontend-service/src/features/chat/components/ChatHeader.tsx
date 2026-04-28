"use client";

import { Avatar } from "@/shared/ui/primitives/avatar";
import { Phone, Video, Search, MoreVertical, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/ui/primitives/button";

export function ChatHeader({ peerId }: { peerId: string }) {
  const peer = {
    name: peerId === "peer-1" ? "Alice Smith" : "Peer " + peerId,
    status: "online" as const,
    lastSeen: "Online"
  };

  return (
    <div className="h-16 border-b border-border-default bg-surface-1 flex items-center justify-between px-4 flex-shrink-0 z-10">
      <div className="flex items-center gap-3">
        <Link href="/chat" className="md:hidden p-2 -ml-2 text-text-secondary hover:text-text-primary">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${peer.name}`} status={peer.status} size="md" />
        <div>
          <h2 className="font-bold text-sm">{peer.name}</h2>
          <p className="text-xs text-brand-primary">{peer.lastSeen}</p>
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
          <Search className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full text-text-secondary">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
