"use client"

import { useEffect, useRef, useState } from "react"

export function WaveformVisualizer({ level = 0 }: { level?: number }) {
  const BAR_COUNT = 40

  const getHeight = (i: number, lv: number) => {
    const center = BAR_COUNT / 2
    const distance = Math.abs(i - center)
    const base = Math.max(0.1, 1 - distance / center) * 0.4
    return Math.max(2, (base + lv * (1 - distance / center)) * 32)
  }

  return (
    <div className="flex items-center justify-center gap-0.5 h-10">
      {Array.from({ length: BAR_COUNT }, (_, i) => (
        <div
          key={i}
          className="w-1 rounded-full transition-all duration-75"
          style={{
            height: `${getHeight(i, level)}px`,
            background: `linear-gradient(to top, #f97316, #ec4899, #a855f7)`,
            opacity: 0.7 + level * 0.3,
          }}
        />
      ))}
    </div>
  )
}
