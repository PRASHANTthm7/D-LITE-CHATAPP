"use client"

import { getPasswordStrength } from "@/shared/utils/validate"
import { cn } from "@/shared/utils/cn"

export function PasswordStrengthMeter({ password }: { password: string }) {
  const { score, feedback, label, color } = getPasswordStrength(password)

  if (!password) return null

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              i <= score ? color : "bg-surface-3"
            )}
          />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xs text-text-tertiary">{feedback}</p>
        {label && (
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-wide",
            score <= 1 ? "text-danger" : score === 2 ? "text-warning" : score === 3 ? "text-info" : "text-success"
          )}>
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
