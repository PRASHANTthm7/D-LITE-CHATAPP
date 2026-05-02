"use client";

import React from "react";
import { useParams } from "next/navigation";
import { GroupHeader } from "@/features/group/components/GroupHeader";
import { MembersPanel } from "@/features/group/components/MembersPanel";
import { GroupMessageBubble } from "@/features/group/components/GroupMessageBubble";
import { Composer } from "@/features/chat/components/Composer";
import { useGroupMessages } from "@/features/group/hooks/use-group-messages";

export default function GroupChatPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const { group, members, messages, send, loading } = useGroupMessages(groupId);

  if (loading || !group) {
    return (
      <div className="flex-1 flex items-center justify-center themed-text-3 text-sm">
        Loading group…
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full relative z-0">
      <GroupHeader group={group} />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto p-6 scroll-smooth custom-scrollbar">
            {messages.length === 0 ? (
              <p className="text-center themed-text-3 text-sm py-12">No messages yet. Say hi!</p>
            ) : (
              messages.map((msg) => (
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
              ))
            )}
          </div>
          <Composer onSend={send} placeholder={`Message ${group.name}…`} />
        </div>
        <MembersPanel members={members} />
      </div>
    </div>
  );
}
