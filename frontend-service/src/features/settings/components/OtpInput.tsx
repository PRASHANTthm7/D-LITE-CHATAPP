"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/shared/utils/cn"

interface OtpInputProps {
  value?: string
  onChange?: (val: string) => void
  className?: string
}

export function OtpInput({ value = "", onChange, className }: OtpInputProps) {
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([])

  const digits = Array.from({ length: 6 }, (_, i) => value[i] ?? "")

  const handleChange = (i: number, val: string) => {
    const digit = val.replace(/\D/g, "").slice(-1)
    const next = digits.map((d, idx) => (idx === i ? digit : d)).join("")
    onChange?.(next)
    if (digit && i < 5) inputsRef.current[i + 1]?.focus()
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    onChange?.(pasted.padEnd(6, "").slice(0, 6))
    e.preventDefault()
  }

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputsRef.current[i - 1]?.focus()
    }
  }

  return (
    <div className={cn("flex items-center gap-2 justify-center", className)}>
      {digits.slice(0, 3).map((d, i) => (
        <OtpCell key={i} inputRef={(el) => { inputsRef.current[i] = el }} value={d} onChange={(v) => handleChange(i, v)} onKeyDown={(e) => handleKeyDown(i, e)} onPaste={handlePaste} />
      ))}
      <div className="w-2 h-2 rounded-full bg-border-default" />
      {digits.slice(3).map((d, i) => (
        <OtpCell key={i + 3} inputRef={(el) => { inputsRef.current[i + 3] = el }} value={d} onChange={(v) => handleChange(i + 3, v)} onKeyDown={(e) => handleKeyDown(i + 3, e)} onPaste={handlePaste} />
      ))}
    </div>
  )
}

function OtpCell({ inputRef, value, onChange, onKeyDown, onPaste }: {
  inputRef: (el: HTMLInputElement | null) => void
  value: string
  onChange: (v: string) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  onPaste: (e: React.ClipboardEvent) => void
}) {
  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
      className={cn(
        "w-11 h-13 text-center text-2xl font-bold tabular-nums rounded-xl border-2 bg-surface-2 outline-none transition-all",
        value ? "border-brand-primary text-brand-primary" : "border-border-default text-text-primary",
        "focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
      )}
      style={{ height: "52px" }}
    />
  )
}
