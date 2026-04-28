"use client"

import * as React from "react"
import { ChatHeader } from "@/features/chat/components/ChatHeader"
import { MessageThread } from "@/features/chat/components/MessageThread"
import { Composer } from "@/features/chat/components/Composer"
import { SmartReplyStrip } from "@/features/ai/components/SmartReplyStrip"
import { useChatMessages, type Message } from "@/features/chat/hooks/use-chat-messages"

export function ChatConversation({ peerId }: { peerId: string }) {
  const [replyTo, setReplyTo] = React.useState<Message | null>(null)
  const { send } = useChatMessages(peerId)

  const handleSend = (content: string) => {
    send(content, replyTo?.id)
    setReplyTo(null)
  }

  return (
    <div className="flex flex-col h-full w-full relative">
      <ChatHeader peerId={peerId} />
      <MessageThread peerId={peerId} replyTo={replyTo} setReplyTo={setReplyTo} />
      <SmartReplyStrip />
      <Composer replyTo={replyTo} onCancelReply={() => setReplyTo(null)} onSend={handleSend} />
    </div>
  )
}
