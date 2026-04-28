"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/shared/utils/cn"

const STEPS = ["Install App", "Scan QR", "Verify", "Backup Codes"]

export function TwoFactorStepIndicator({ currentStep }: { currentStep: 0 | 1 | 2 | 3 }) {
  return (
    <div className="flex items-center justify-center gap-0 w-full">
      {STEPS.map((label, i) => {
        const done = i < currentStep
        const active = i === currentStep

        return (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-2">
              <div className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all font-bold text-sm",
                done && "bg-brand-primary border-brand-primary text-white",
                active && "border-brand-primary text-brand-primary ring-4 ring-brand-primary/20",
                !done && !active && "border-border-default text-text-tertiary"
              )}>
                {done ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={cn("text-[10px] font-medium uppercase tracking-wide w-16 text-center",
                active ? "text-brand-primary" : done ? "text-text-secondary" : "text-text-tertiary"
              )}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn("h-0.5 flex-1 mb-6 transition-colors", done ? "bg-brand-primary" : "bg-border-subtle")} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
