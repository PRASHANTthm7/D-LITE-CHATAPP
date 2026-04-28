"use client"

import { cn } from "@/shared/utils/cn"

interface ConnectionQualityPillProps {
  tier?: "excellent" | "good" | "fair" | "poor"
  rttMs?: number
}

const tierConfig = {
  excellent: { bars: 4, label: "Excellent", color: "text-success", barColor: "bg-success" },
  good:      { bars: 3, label: "Good",      color: "text-success", barColor: "bg-success" },
  fair:      { bars: 2, label: "Fair",       color: "text-warning", barColor: "bg-warning" },
  poor:      { bars: 1, label: "Poor",       color: "text-danger",  barColor: "bg-danger"  },
}

export function ConnectionQualityPill({ tier = "excellent", rttMs = 28 }: ConnectionQualityPillProps) {
  const config = tierConfig[tier]

  return (
    <div className="glass flex items-center gap-2 px-3 py-1.5 rounded-full">
      <div className="flex items-end gap-0.5 h-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "w-1 rounded-sm transition-all",
              i <= config.bars ? config.barColor : "bg-white/20"
            )}
            style={{ height: `${i * 3}px` }}
          />
        ))}
      </div>
      <span className={cn("text-xs font-medium", config.color)}>{config.label}</span>
      <span className="text-[10px] text-white/50">{rttMs}ms</span>
    </div>
  )
}
