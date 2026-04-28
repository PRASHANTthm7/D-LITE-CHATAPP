"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/shared/utils/cn"

type TooltipPosition = "top" | "bottom" | "left" | "right"

interface TooltipProps {
  content: React.ReactNode
  position?: TooltipPosition
  delay?: number
  children: React.ReactNode
  className?: string
}

function Tooltip({ content, position = "top", delay = 200, children, className }: TooltipProps) {
  const [visible, setVisible] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = () => {
    timer.current = setTimeout(() => setVisible(true), delay)
  }
  const hide = () => {
    if (timer.current) clearTimeout(timer.current)
    setVisible(false)
  }

  const positionClasses: Record<TooltipPosition, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }

  return (
    <div className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            className={cn(
              "absolute z-50 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none",
              "bg-surface-3 text-text-primary border border-border-default shadow-lg",
              positionClasses[position],
              className
            )}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Tooltip }
