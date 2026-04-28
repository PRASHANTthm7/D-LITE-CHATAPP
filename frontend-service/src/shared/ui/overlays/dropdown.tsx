"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/shared/utils/cn"

interface DropdownItem {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  danger?: boolean
  separator?: boolean
}

interface DropdownProps {
  trigger: React.ReactNode
  items: DropdownItem[]
  align?: "left" | "right"
  className?: string
}

function Dropdown({ trigger, items, align = "right", className }: DropdownProps) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKey)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKey)
    }
  }, [])

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen(!open)}>{trigger}</div>

      <AnimatePresence>
        {open && (
          <motion.div
            className={cn(
              "absolute z-50 mt-2 w-52 rounded-xl border border-border-default bg-surface-1 shadow-xl p-1.5",
              align === "right" ? "right-0" : "left-0",
              className
            )}
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {items.map((item, i) => {
              if (item.separator) {
                return <div key={i} className="h-px bg-border-subtle my-1" />
              }
              return (
                <button
                  key={i}
                  className={cn(
                    "flex items-center gap-2.5 w-full px-3 py-2 text-sm rounded-lg transition-colors text-left",
                    item.danger
                      ? "text-danger hover:bg-danger/10"
                      : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
                  )}
                  onClick={() => {
                    item.onClick?.()
                    setOpen(false)
                  }}
                >
                  {item.icon}
                  {item.label}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Dropdown }
export type { DropdownItem }
