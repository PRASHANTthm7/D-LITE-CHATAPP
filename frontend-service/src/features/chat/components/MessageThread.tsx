"use client"

import * as React from "react"
import { MessageBubble } from "./MessageBubble"
import { ReplyPreview } from "./ReplyPreview"
import { useChatMessages, type Message } from "@/features/chat/hooks/use-chat-messages"
import { EmptyState } from "@/shared/ui/feedback/empty-state"
import { MessageCircle } from "lucide-react"

interface MessageThreadProps {
  peerId: string
  replyTo: Message | null
  setReplyTo: (msg: Message | null) => void
}

export function MessageThread({ peerId, replyTo, setReplyTo }: MessageThreadProps) {
  const bottomRef = React.useRef<HTMLDivElement>(null)
  const { messages, addReaction, deleteMessage } = useChatMessages(peerId)

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto flex flex-col relative">
      <div className="p-4 flex flex-col flex-1">
        {messages.length === 0 ? (
          <EmptyState
            illustration={<MessageCircle className="w-16 h-16" />}
            title="No messages yet"
            description="Start the conversation by saying hello!"
            className="flex-1 justify-center"
          />
        ) : (
          <>
            <div className="text-center my-6">
              <span className="bg-surface-2 text-text-secondary text-xs px-3 py-1 rounded-full font-medium">Today</span>
            </div>
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                onReply={setReplyTo}
                onReact={addReaction}
                onDelete={deleteMessage}
              />
            ))}
          </>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
