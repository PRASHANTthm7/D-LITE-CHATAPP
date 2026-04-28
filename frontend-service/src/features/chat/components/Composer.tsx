"use client"

import * as React from "react"
import { Plus, Smile, Mic, Send, X } from "lucide-react"
import { Button } from "@/shared/ui/primitives/button"
import { Textarea } from "@/shared/ui/primitives/textarea"
import { ReplyPreview } from "./ReplyPreview"
import type { Message } from "@/features/chat/hooks/use-chat-messages"

const QUICK_EMOJIS = ["😊", "😂", "❤️", "👍", "🎉", "🔥", "😢", "😮", "🙏", "💯", "✅", "👀",
  "😎", "🤔", "😅", "💪", "🫡", "🥳", "😍", "🤝", "😤", "🙌", "⚡", "✨"]

interface ComposerProps {
  replyTo?: Message | null
  onCancelReply?: () => void
  onSend?: (content: string) => void
}

export function Composer({ replyTo, onCancelReply, onSend }: ComposerProps) {
  const [message, setMessage] = React.useState("")
  const [showEmoji, setShowEmoji] = React.useState(false)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (!message.trim()) return
    onSend?.(message.trim())
    setMessage("")
    textareaRef.current?.focus()
  }

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
    if (e.key === "Escape" && replyTo) onCancelReply?.()
  }

  const insertEmoji = (emoji: string) => {
    setMessage((prev) => prev + emoji)
    textareaRef.current?.focus()
  }

  return (
    <div className="border-t border-border-default bg-surface-1">
      {replyTo && (
        <ReplyPreview
          sender={replyTo.isOwn ? "You" : "Peer"}
          content={replyTo.content}
          onCancel={onCancelReply}
        />
      )}

      {showEmoji && (
        <div className="p-3 border-t border-border-subtle">
          <div className="grid grid-cols-12 gap-1">
            {QUICK_EMOJIS.map((e) => (
              <button key={e} className="text-xl hover:scale-125 transition-transform" onClick={() => insertEmoji(e)}>
                {e}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-end gap-2 bg-surface-2 m-3 p-2 rounded-2xl border border-border-default focus-within:border-brand-primary transition-colors">
        <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 rounded-full text-text-secondary">
          <Plus className="w-5 h-5" />
        </Button>

        <Textarea
          ref={textareaRef}
          variant="ghost"
          className="flex-1 py-2 min-h-[40px] text-[15px] leading-relaxed"
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
          onKeyDown={handleKey}
          aria-label="Message input"
        />

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={`h-10 w-10 shrink-0 rounded-full transition-colors ${showEmoji ? "text-brand-primary bg-brand-primary-soft" : "text-text-secondary"}`}
            onClick={() => setShowEmoji(!showEmoji)}
          >
            <Smile className="w-5 h-5" />
          </Button>

          {message.trim() ? (
            <Button
              size="icon"
              className="h-10 w-10 shrink-0 rounded-full bg-brand-gradient shadow-accent text-white hover:scale-105"
              onClick={handleSend}
            >
              <Send className="w-4 h-4 ml-0.5" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 rounded-full text-text-secondary">
              <Mic className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
