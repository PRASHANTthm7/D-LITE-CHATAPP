import * as React from "react"
import { Button } from "@/shared/ui/primitives/button"
import { cn } from "@/shared/utils/cn"

interface EmptyStateProps {
  illustration?: React.ReactNode
  title: string
  description?: string
  action?: { label: string; onClick: () => void }
  className?: string
}

function EmptyState({ illustration, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8 gap-4", className)}>
      {illustration && (
        <div className="w-24 h-24 flex items-center justify-center text-text-tertiary opacity-60">
          {illustration}
        </div>
      )}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg text-text-primary">{title}</h3>
        {description && <p className="text-sm text-text-secondary max-w-xs">{description}</p>}
      </div>
      {action && (
        <Button onClick={action.onClick} variant="secondary">
          {action.label}
        </Button>
      )}
    </div>
  )
}

export { EmptyState }
