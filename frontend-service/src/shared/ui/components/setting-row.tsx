import React from "react"
import { cn } from "@/shared/utils/cn"

interface SettingRowProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  noBorder?: boolean
}

export function SettingRow({ title, description, children, className, noBorder }: SettingRowProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4 py-4", !noBorder && "border-b border-border-subtle", className)}>
      <div className="flex-1">
        <p className="text-sm font-medium text-text-primary">{title}</p>
        {description && <p className="text-xs text-text-tertiary mt-0.5">{description}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  )
}
