"use client";

import React from "react";
import { User } from "@/features/dashboard/lib/mock-data";
import { Avatar } from "@/shared/components/Avatar";
import { RoleBadge } from "./RoleBadge";

export interface MembersPanelProps {
  members: (User & { role?: "owner" | "admin" | "mod" | "member" })[];
}

export function MembersPanel({ members }: MembersPanelProps) {
  const online = members.filter(m => m.isOnline);
  const offline = members.filter(m => !m.isOnline);

  const renderMember = (m: User & { role?: string }) => (
    <div key={m.id} className="flex items-center gap-3 py-2 cursor-pointer hover:bg-gray-50 px-2 rounded-lg -mx-2 transition-colors">
      <Avatar initials={m.initials} online={m.isOnline} size="sm" />
      <div className="flex-1 min-w-0">
        <h5 className="text-sm font-semibold text-gray-900 truncate">{m.name}</h5>
        <div className="text-[10px] text-gray-500">
          {m.isOnline ? "Online" : "Last seen recently"}
        </div>
      </div>
      {m.role && m.role !== "member" && <RoleBadge role={m.role as any} />}
    </div>
  );

  return (
    <div className="w-[220px] h-full border-l border-gray-100 bg-surface flex flex-col shrink-0">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 text-sm">Members ({members.length})</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="mb-6">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Online — {online.length}</h4>
          <div className="space-y-1">
            {online.map(renderMember)}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Offline — {offline.length}</h4>
          <div className="space-y-1">
            {offline.map(renderMember)}
          </div>
        </div>
      </div>
    </div>
  );
}
