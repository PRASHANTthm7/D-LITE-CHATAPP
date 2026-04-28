"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { formatDuration } from "@/shared/utils/format"

export function CallTimer() {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-danger animate-pulse" />
      <span className="font-mono text-sm font-medium tabular-nums">{formatDuration(elapsed)}</span>
    </div>
  )
}
