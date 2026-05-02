"use client";

import { useParams } from "next/navigation";
import { ChatHeader } from "@/features/chat/components/ChatHeader";
import { MessageThread, ThreadMessage } from "@/features/chat/components/MessageThread";
import { Composer } from "@/features/chat/components/Composer";
import { useChatMessages } from "@/features/chat/hooks/use-chat-messages";
import { useDMConversations } from "@/features/chat/hooks/use-dm-conversations";

export default function ChatPage() {
  const { peerId } = useParams<{ peerId: string }>();
  const { messages, send, addReaction, loading } = useChatMessages(peerId);
  const { conversations } = useDMConversations();

  const conversation = conversations.find((c) => c.id === peerId);
  const peerUser = conversation?.user ?? { id: peerId, name: "Chat", initials: "?", isOnline: false };

  const threadMessages: ThreadMessage[] = messages.map((m) => ({
    id: m.id,
    direction: m.isOwn ? "out" : "in",
    content: m.content,
    time: m.time,
    status: (m.status === "delivered" ? "sent" : m.status === "failed" ? "sending" : m.status) as ThreadMessage["status"],
    reactions: m.reactions?.map((r) => ({ emoji: r.emoji, count: r.count, active: r.reacted })),
    replyTo: m.replyTo ? { authorName: m.replyTo.sender, content: m.replyTo.content } : undefined,
    onReact: (emoji: string) => addReaction(m.id, emoji),
  }));

  return (
    <div className="flex flex-col h-full bg-canvas relative z-0">
      <ChatHeader user={peerUser} isTyping={false} />
      {loading ? (
        <div className="flex-1 flex items-center justify-center themed-text-3 text-sm">
          Loading messages…
        </div>
      ) : (
        <MessageThread messages={threadMessages} />
      )}
      <Composer onSend={send} />
    </div>
  );
}
