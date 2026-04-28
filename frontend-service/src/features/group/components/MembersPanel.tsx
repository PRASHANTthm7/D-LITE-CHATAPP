"use client";

import { Avatar } from "@/shared/ui/primitives/avatar";
import { MoreHorizontal } from "lucide-react";

export function MembersPanel({ groupId }: { groupId: string }) {
  const members = [
    { id: "1", name: "Alice Smith", role: "Owner", online: true },
    { id: "2", name: "Bob Johnson", role: "Admin", online: true },
    { id: "3", name: "Charlie Davis", role: "Member", online: false },
    { id: "4", name: "Diana Prince", role: "Member", online: true },
  ];

  return (
    <div className="w-[280px] border-l border-border-default bg-surface-1 flex-shrink-0 flex flex-col h-full hidden lg:flex z-10">
      <div className="p-4 border-b border-border-default h-16 flex items-center">
        <h3 className="font-bold text-sm">Group Members</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {members.map(member => (
          <div key={member.id} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} status={member.online ? "online" : undefined} size="sm" />
              <div>
                <p className="text-sm font-medium leading-none mb-1">{member.name}</p>
                {member.role !== "Member" && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                    member.role === 'Owner' ? 'bg-[#a855f7]/20 text-[#a855f7]' : 'bg-warning/20 text-warning'
                  }`}>
                    {member.role}
                  </span>
                )}
              </div>
            </div>
            <button className="text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
