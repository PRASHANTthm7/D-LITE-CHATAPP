"use client"

import * as React from "react"
import { cn } from "@/shared/utils/cn"

export interface ToggleProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
  id?: string
  "aria-label"?: string
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ checked, defaultChecked = false, onCheckedChange, disabled, className, id, "aria-label": ariaLabel }, ref) => {
    const [isOn, setIsOn] = React.useState(checked ?? defaultChecked)

    React.useEffect(() => {
      if (checked !== undefined) setIsOn(checked)
    }, [checked])

    const handleToggle = () => {
      if (disabled) return
      const next = !isOn
      setIsOn(next)
      onCheckedChange?.(next)
    }

    return (
      <button
        ref={ref}
        id={id}
        role="switch"
        type="button"
        aria-checked={isOn}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          isOn ? "bg-brand-primary" : "bg-surface-3",
          className
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200",
            isOn ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
    )
  }
)
Toggle.displayName = "Toggle"

export { Toggle }
