"use client"

import * as React from "react"
import { cn } from "@/shared/utils/cn"

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ label, error, className, id, value, onChange, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false)
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-")
    const hasValue = value !== undefined ? String(value).length > 0 : false
    const isFloated = focused || hasValue

    return (
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "peer w-full h-14 rounded-xl border bg-surface-1 px-4 pt-5 pb-2 text-sm text-text-primary transition-all outline-none",
            "focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20",
            error ? "border-danger ring-2 ring-danger/20" : "border-border-default",
            className
          )}
          placeholder=" "
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "absolute left-4 transition-all duration-150 pointer-events-none text-text-tertiary",
            isFloated ? "top-2.5 text-[10px] font-semibold uppercase tracking-wider" : "top-4 text-sm",
            focused && !error && "text-brand-primary",
            error && "text-danger"
          )}
        >
          {label}
        </label>
        {error && (
          <p className="text-xs text-danger mt-1 pl-1">{error}</p>
        )}
      </div>
    )
  }
)
FloatingLabelInput.displayName = "FloatingLabelInput"
