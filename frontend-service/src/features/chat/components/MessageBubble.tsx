"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/shared/utils/cn"
import { ReplyPreview } from "./ReplyPreview"
import { MessageReactions } from "./MessageReactions"
import { MessageContextMenu } from "./MessageContextMenu"
import { Check, CheckCheck, Clock, AlertTriangle, Reply, Smile, MoreHorizontal, Pencil } from "lucide-react"
import type { Message } from "@/features/chat/hooks/use-chat-messages"

interface MessageBubbleProps {
  message: Message
  onReply: (msg: Message) => void
  onReact: (id: string, emoji: string) => void
  onDelete: (id: string) => void
}

const statusIcon = {
  sending:   <Clock className="w-3 h-3 opacity-60" />,
  sent:      <Check className="w-3 h-3 opacity-60" />,
  delivered: <CheckCheck className="w-3 h-3 opacity-60" />,
  read:      <CheckCheck className="w-3 h-3 text-yellow-300" />,
  failed:    <AlertTriangle className="w-3 h-3 text-danger" />,
}

export function MessageBubble({ message, onReply, onReact, onDelete }: MessageBubbleProps) {
  const [contextMenu, setContextMenu] = React.useState<{ x: number; y: number } | null>(null)

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex flex-col mb-3 max-w-[85%] group",
        message.isOwn ? "ml-auto items-end" : "mr-auto items-start"
      )}
    >
      {/* Reply preview above bubble */}
      {message.replyTo && (
        <div className={cn("mb-1 px-2", message.isOwn ? "items-end" : "items-start")}>
          <div className={cn("border-l-2 border-brand-primary pl-2 text-xs text-text-tertiary max-w-[200px]", message.isOwn ? "text-right" : "text-left")}>
            <span className="font-semibold text-brand-primary">{message.replyTo.sender}</span>
            <p className="truncate">{message.replyTo.content}</p>
          </div>
        </div>
      )}

      <div className="relative flex items-end gap-1.5">
        {/* Hover actions for incoming */}
        {!message.isOwn && (
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
            <button onClick={() => onReply(message)} className="w-7 h-7 rounded-full bg-surface-2 flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-surface-3 transition-colors">
              <Reply className="w-3.5 h-3.5" />
            </button>
            <button onClick={(e) => setContextMenu({ x: e.clientX, y: e.clientY })} className="w-7 h-7 rounded-full bg-surface-2 flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-surface-3 transition-colors">
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div
          className={cn(
            "px-4 py-2.5 rounded-2xl relative shadow-soft cursor-pointer",
            message.isOwn
              ? "bg-brand-gradient text-white rounded-br-sm"
              : "bg-surface-1 border border-border-default text-text-primary rounded-bl-sm"
          )}
          onContextMenu={handleContextMenu}
        >
          <p className="text-[15px] leading-relaxed break-words whitespace-pre-wrap">{message.content}</p>
          <div className={cn("flex items-center justify-end gap-1 mt-1 text-[10px]", message.isOwn ? "text-white/70" : "text-text-tertiary")}>
            {message.edited && <span className="italic mr-1">edited</span>}
            <span>{message.time}</span>
            {message.isOwn && message.status && statusIcon[message.status]}
          </div>
        </div>

        {/* Hover actions for own */}
        {message.isOwn && (
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
            <button onClick={() => onReply(message)} className="w-7 h-7 rounded-full bg-surface-2 flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-surface-3 transition-colors">
              <Reply className="w-3.5 h-3.5" />
            </button>
            <button onClick={(e) => setContextMenu({ x: e.clientX, y: e.clientY })} className="w-7 h-7 rounded-full bg-surface-2 flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-surface-3 transition-colors">
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      <MessageReactions
        reactions={message.reactions ?? []}
        onReact={(emoji) => onReact(message.id, emoji)}
        isOwn={message.isOwn}
      />

      <AnimatePresence>
        {contextMenu && (
          <MessageContextMenu
            isOwn={message.isOwn}
            position={contextMenu}
            onClose={() => setContextMenu(null)}
            onReply={() => onReply(message)}
            onReact={(emoji) => onReact(message.id, emoji)}
            onCopy={handleCopy}
            onDelete={() => onDelete(message.id)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
