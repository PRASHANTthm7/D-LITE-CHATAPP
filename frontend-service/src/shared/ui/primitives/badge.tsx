import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/shared/utils/cn"

const badgeVariants = cva(
  "inline-flex items-center gap-1 font-semibold uppercase tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default:   "bg-surface-2 text-text-secondary border border-border-default",
        brand:     "bg-brand-primary-soft text-brand-primary border border-brand-primary/20",
        gradient:  "bg-brand-gradient text-white border-0",
        success:   "bg-success/10 text-success border border-success/20",
        warning:   "bg-warning/10 text-warning border border-warning/20",
        danger:    "bg-danger/10 text-danger border border-danger/20",
        info:      "bg-info/10 text-info border border-info/20",
      },
      size: {
        sm: "text-[9px] px-1.5 py-0.5 rounded",
        md: "text-[10px] px-2 py-0.5 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
