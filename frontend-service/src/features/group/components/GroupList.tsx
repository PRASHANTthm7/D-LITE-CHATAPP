"use client";

import { Input } from "@/shared/ui/primitives/input";
import { Search, Plus, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";

export function GroupList() {
  const pathname = usePathname();

  const groups = [
    { id: "grp-1", name: "Engineering Team", lastMsg: "Alice: The deploy is live!", time: "11:45 AM", unread: 5 },
    { id: "grp-2", name: "Product Design", lastMsg: "Bob shared a file", time: "2:30 PM", unread: 0 },
    { id: "grp-3", name: "Marketing Q3", lastMsg: "You: Let's review the copy.", time: "Yesterday", unread: 0 },
  ];

  return (
    <>
      <div className="p-4 border-b border-border-default">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-xl">Groups</h2>
          <button className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center text-text-secondary hover:text-brand-primary transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-text-tertiary" />
          <Input className="pl-9 h-11 bg-surface-2 border-transparent" placeholder="Search groups..." />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {groups.map((group) => {
          const isActive = pathname === `/groups/${group.id}`;
          return (
            <Link 
              key={group.id} 
              href={`/groups/${group.id}`}
              className={cn(
                "flex items-center gap-3 p-4 border-b border-border-subtle hover:bg-surface-2 transition-colors relative group",
                isActive && "bg-brand-primary-soft/20"
              )}
            >
              {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary rounded-r-full" />}
              
              <div className="relative w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                <Users className="w-6 h-6" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-medium truncate text-sm">{group.name}</h3>
                  <span className={cn("text-xs flex-shrink-0 ml-2", group.unread > 0 ? "text-brand-primary font-medium" : "text-text-tertiary")}>
                    {group.time}
                  </span>
                </div>
                <p className="text-sm truncate text-text-secondary">
                  {group.lastMsg}
                </p>
              </div>

              {group.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center text-[10px] font-bold text-white shadow-accent">
                  {group.unread}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
}
