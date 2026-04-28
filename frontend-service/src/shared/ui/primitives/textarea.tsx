import * as React from "react"
import { cn } from "@/shared/utils/cn"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "ghost"
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = "default", onChange, ...props }, ref) => {
    const innerRef = React.useRef<HTMLTextAreaElement>(null)

    const combinedRef = (el: HTMLTextAreaElement | null) => {
      (innerRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el
      if (typeof ref === "function") ref(el)
      else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = el
    }

    const autoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const el = e.target
      el.style.height = "auto"
      const rows = Math.min(6, Math.ceil(el.scrollHeight / 24))
      el.style.height = `${rows * 24}px`
      onChange?.(e)
    }

    return (
      <textarea
        ref={combinedRef}
        rows={1}
        className={cn(
          "flex w-full rounded-md text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-50 resize-none overflow-hidden",
          variant === "default" && "border border-border-default bg-surface-1 px-3 py-2 ring-offset-surface-1 placeholder:text-text-tertiary",
          variant === "ghost" && "bg-transparent border-0 px-0 py-0 placeholder:text-text-tertiary",
          className
        )}
        onChange={autoGrow}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
