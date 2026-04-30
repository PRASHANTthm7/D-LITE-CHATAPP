"use client";

import React, { useState } from "react";
import { GroupHeader } from "@/features/group/components/GroupHeader";
import { MembersPanel } from "@/features/group/components/MembersPanel";
import { PinnedBanner } from "@/features/group/components/PinnedBanner";
import { GroupMessageBubble } from "@/features/group/components/GroupMessageBubble";
import { Composer } from "@/features/chat/components/Composer";
import { PollCard } from "@/features/group/components/PollCard";
import { activeGroups } from "@/features/dashboard/lib/mock-data";
import { Mention } from "@/features/group/components/Mention";

export default function GroupChatPage() {
  const group = activeGroups[0];
  const [messages, setMessages] = useState<Array<{
    id: string;
    direction: "in" | "out";
    authorName: string;
    role: "owner" | "admin" | "mod" | "member";
    content: string;
    time: string;
    dateStr?: string;
  }>>([
    {
      id: "gm1",
      direction: "in" as const,
      authorName: "Priya Sharma",
      role: "owner" as const,
      content: "Welcome to the Engineering group everyone!",
      time: "10:00 AM",
      dateStr: "Today",
    },
    {
      id: "gm2",
      direction: "in" as const,
      authorName: "Rahul Kumar",
      role: "admin" as const,
      content: "Thanks! Can we get a quick poll on lunch?",
      time: "10:05 AM",
    }
  ]);

  const handleSend = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      direction: "out",
      authorName: "You",
      role: "member",
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
  };

  const membersWithRoles = group.members.map((m, i) => ({
    ...m,
    role: i === 0 ? "owner" : i === 1 ? "admin" : i === 2 ? "mod" : "member"
  })) as any;

  return (
    <div className="flex flex-col h-full w-full relative z-0">
      <GroupHeader group={group} />
      <PinnedBanner text="Q3 Kickoff meeting at 2PM today in main room." />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto p-6 scroll-smooth custom-scrollbar">
            {messages.map((msg) => (
              <React.Fragment key={msg.id}>
                {msg.dateStr && (
                  <div className="flex justify-center my-6">
                    <span className="bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                      {msg.dateStr}
                    </span>
                  </div>
                )}
                <GroupMessageBubble {...msg} />
              </React.Fragment>
            ))}
            <div className="flex flex-col items-start mb-4">
              <div className="flex items-center gap-2 mb-1 pl-1">
                <span className="text-xs font-semibold text-gray-700">Aarav Sharma</span>
                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm bg-gradient-to-r from-blue-400 to-cyan-500 text-white">Mod</span>
              </div>
              <PollCard 
                title="Lunch today?"
                options={[
                  { id: "p1", label: "Pizza", votes: 4 },
                  { id: "p2", label: "Sushi", votes: 2 },
                  { id: "p3", label: "Salad", votes: 0 },
                ]}
                totalVotes={6}
                endsIn="3h"
              />
            </div>
            <div className="flex flex-col items-start mb-4">
               <div className="flex items-center gap-2 mb-1 pl-1">
                 <span className="text-xs font-semibold text-gray-700">Aarav Sharma</span>
               </div>
               <div className="bg-surface border border-gray-100 text-gray-900 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm text-[15px]">
                 Hey <Mention username="priya" /> can you merge the PR?
                 <div className="flex items-center justify-end gap-1 mt-1 text-[11px] text-gray-400">10:42 AM</div>
               </div>
            </div>
          </div>
          <Composer onSend={handleSend} placeholder="Message Engineering Team... use @ to mention" />
        </div>
        <MembersPanel members={membersWithRoles} />
      </div>
    </div>
  );
}
