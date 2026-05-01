"use client";

import React from "react";
import Link from "next/link";
import { Users } from "lucide-react";
import { motion } from "framer-motion";
import { activeGroups, GroupPreview } from "../lib/mock-data";
import { Badge } from "@/shared/components/Badge";

function GroupItem({ group }: { group: GroupPreview }) {
  return (
    <motion.div 
      whileHover={{ x: 4 }}
      className="flex items-center gap-4 py-3 cursor-pointer hover:bg-[var(--row-hover-bg)] rounded-lg px-2 -mx-2 transition-colors"
    >
      <div className="flex -space-x-2">
        {group.members.slice(0, 3).map((member, i) => (
          <div key={member.id} className={`w-8 h-8 rounded-full border-2 themed-border bg-brand-${300 + i*100} flex items-center justify-center text-white text-[10px] font-bold z-${30-i*10}`}>
            {member.initials}
          </div>
        ))}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-0.5">
          <h4 className="text-sm font-semibold themed-text truncate">{group.name}</h4>
          <span className="text-xs themed-text-3">{group.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs themed-text-2 truncate flex-1">{group.lastMessage}</p>
          {group.unreadCount > 0 && <Badge count={group.unreadCount} />}
        </div>
      </div>
    </motion.div>
  );
}

export function ActiveGroupsCard() {
  return (
    <div className="themed-surface border themed-border rounded-2xl p-6 shadow-card flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-accent-purple/10 text-accent-purple">
            <Users size={16} />
          </div>
          <h3 className="font-bold themed-text">Active Groups</h3>
        </div>
        <Link href="/groups" className="text-xs font-semibold text-[var(--brand-500)] hover:text-[var(--brand-600)]">
          View all
        </Link>
      </div>

      <div className="flex flex-col flex-1 divide-y themed-border">
        {activeGroups.map((group) => (
          <GroupItem key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}
