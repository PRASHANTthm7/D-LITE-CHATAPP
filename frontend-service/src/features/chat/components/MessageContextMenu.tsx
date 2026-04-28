"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Reply, Copy, Smile, Pencil, Trash2 } from "lucide-react"
import { cn } from "@/shared/utils/cn"

const QUICK_EMOJIS = ["❤️", "😂", "😮", "😢", "👍", "🔥"]

interface MessageContextMenuProps {
  isOwn: boolean
  position: { x: number; y: number }
  onClose: () => void
  onReply: () => void
  onReact: (emoji: string) => void
  onCopy: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export function MessageContextMenu({
  isOwn, position, onClose, onReply, onReact, onCopy, onEdit, onDelete
}: MessageContextMenuProps) {
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800
  const adjustedY = position.y + 200 > viewportHeight ? position.y - 200 : position.y

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <motion.div
        className="fixed z-50 rounded-xl border border-border-default bg-surface-1 shadow-2xl py-1 w-52 overflow-hidden"
        style={{ left: Math.min(position.x, (typeof window !== "undefined" ? window.innerWidth : 800) - 220), top: adjustedY }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.1 }}
      >
        {/* Quick react bar */}
        <div className="flex items-center justify-around px-3 py-2 border-b border-border-subtle">
          {QUICK_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              className="text-xl hover:scale-125 transition-transform"
              onClick={() => { onReact(emoji); onClose() }}
            >
              {emoji}
            </button>
          ))}
        </div>

        <div className="p-1">
          <button className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-text-secondary rounded-lg hover:bg-surface-2 transition-colors" onClick={() => { onReply(); onClose() }}>
            <Reply className="w-4 h-4" /> Reply
          </button>
          <button className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-text-secondary rounded-lg hover:bg-surface-2 transition-colors" onClick={() => { onCopy(); onClose() }}>
            <Copy className="w-4 h-4" /> Copy text
          </button>
          {isOwn && onEdit && (
            <button className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-text-secondary rounded-lg hover:bg-surface-2 transition-colors" onClick={() => { onEdit(); onClose() }}>
              <Pencil className="w-4 h-4" /> Edit
            </button>
          )}
          {isOwn && onDelete && (
            <>
              <div className="h-px bg-border-subtle my-1" />
              <button className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-danger rounded-lg hover:bg-danger/10 transition-colors" onClick={() => { onDelete(); onClose() }}>
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </>
          )}
        </div>
      </motion.div>
    </>
  )
}
