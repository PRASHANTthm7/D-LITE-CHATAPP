"use client"

import { X, Reply } from "lucide-react"
import { cn } from "@/shared/utils/cn"

interface ReplyPreviewProps {
  sender: string
  content: string
  onCancel?: () => void
  className?: string
}

export function ReplyPreview({ sender, content, onCancel, className }: ReplyPreviewProps) {
  return (
    <div className={cn("flex items-start gap-2 px-4 py-2 bg-surface-2 border-l-2 border-brand-primary", className)}>
      <Reply className="w-3.5 h-3.5 text-brand-primary mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-brand-primary">{sender}</p>
        <p className="text-xs text-text-secondary truncate">{content}</p>
      </div>
      {onCancel && (
        <button
          onClick={onCancel}
          className="text-text-tertiary hover:text-text-primary transition-colors flex-shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  )
}
