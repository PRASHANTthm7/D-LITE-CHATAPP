"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Plus } from "lucide-react";
import { Input } from "@/shared/components/Input";
import { Badge } from "@/shared/components/Badge";
import { useGroupList } from "../hooks/use-group-list";

export function GroupListSidebar() {
  const [search, setSearch] = useState("");
  const { groups, loading } = useGroupList();
  const pathname = usePathname();

  const filtered = groups.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-[280px] h-full border-r themed-border themed-surface flex flex-col shrink-0">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold themed-text">Groups</h2>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg themed-text-3 hover:themed-surface-2 hover:themed-text transition-colors" title="New group">
            <Plus size={16} />
          </button>
        </div>
        <Input
          placeholder="Search groups..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          iconLeft={<Search size={16} />}
          className="themed-input h-9 py-0 text-sm w-full"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
        {loading ? (
          <div className="text-center text-sm themed-text-3 py-8">Loading...</div>
        ) : filtered.length > 0 ? (
          filtered.map((group) => {
            const isActive = pathname === `/groups/${group.id}`;
            return (
              <Link
                key={group.id}
                href={`/groups/${group.id}`}
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${isActive ? "bg-[var(--row-active-bg)] border-l-[3px] border-[var(--row-active-border)]" : "hover:bg-[var(--row-hover-bg)]"}`}
              >
                <div className="w-10 h-10 rounded-xl brand-grad flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {group.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="text-sm font-semibold themed-text truncate">{group.name}</h4>
                    <span className="text-xs themed-text-3 shrink-0">{group.time}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm themed-text-3 truncate flex-1">{group.lastMessage}</p>
                    {group.unreadCount > 0 && <Badge count={group.unreadCount} />}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="text-center text-sm themed-text-3 py-8">
            {groups.length === 0 ? "No groups yet" : "No groups found"}
          </div>
        )}
      </div>
    </div>
  );
}
