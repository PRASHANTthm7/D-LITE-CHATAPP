"use client"

import { motion } from "framer-motion"

interface MessageReactionsProps {
  reactions: { emoji: string; count: number; reacted: boolean }[]
  onReact: (emoji: string) => void
  isOwn: boolean
}

export function MessageReactions({ reactions, onReact, isOwn }: MessageReactionsProps) {
  if (!reactions || reactions.length === 0) return null

  return (
    <div className={`flex gap-1 mt-1 flex-wrap ${isOwn ? "justify-end" : "justify-start"}`}>
      {reactions.map((r) => (
        <motion.button
          key={r.emoji}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onReact(r.emoji)}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs shadow-sm border transition-colors ${
            r.reacted
              ? "bg-brand-primary-soft border-brand-primary/30 text-brand-primary"
              : "bg-surface-1 border-border-default text-text-secondary hover:bg-surface-2"
          }`}
        >
          <span>{r.emoji}</span>
          <span className="font-medium tabular-nums">{r.count}</span>
        </motion.button>
      ))}
    </div>
  )
}
