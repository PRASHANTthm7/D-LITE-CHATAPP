import * as React from "react"
import { cn } from "@/shared/utils/cn"

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean
}

function Pill({ className, active, ...props }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer select-none",
        active
          ? "bg-brand-primary-soft text-brand-primary border border-brand-primary/30"
          : "bg-surface-2 text-text-secondary border border-border-subtle hover:bg-surface-3 hover:text-text-primary",
        className
      )}
      {...props}
    />
  )
}

export { Pill }
