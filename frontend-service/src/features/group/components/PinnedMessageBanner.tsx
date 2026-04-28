"use client"

import { motion } from "framer-motion"
import { Pin } from "lucide-react"
import { formatTime } from "@/shared/utils/format"

interface PinnedMessageBannerProps {
  message: string
  pinnedBy: string
  pinnedAt: Date
  onView?: () => void
}

export function PinnedMessageBanner({ message, pinnedBy, pinnedAt, onView }: PinnedMessageBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="flex items-center gap-3 px-4 py-2.5 bg-brand-primary-soft/30 border-b border-brand-primary/20"
    >
      <div className="w-6 h-6 rounded-lg bg-brand-gradient flex items-center justify-center flex-shrink-0">
        <Pin className="w-3 h-3 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-brand-primary font-semibold uppercase tracking-wide">Pinned by {pinnedBy} · {formatTime(pinnedAt)}</p>
        <p className="text-xs text-text-secondary truncate">{message}</p>
      </div>
      <button onClick={onView} className="text-xs text-brand-primary font-medium hover:underline flex-shrink-0">
        View
      </button>
    </motion.div>
  )
}
