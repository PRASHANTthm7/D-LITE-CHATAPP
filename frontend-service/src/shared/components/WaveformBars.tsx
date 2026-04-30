"use client";

import React from "react";

export interface WaveformBarsProps {
  count?: number;
  color?: string;
  className?: string;
}

export function WaveformBars({ count = 20, color = "bg-brand-500", className = "" }: WaveformBarsProps) {
  return (
    <div className={`flex items-center gap-0.5 h-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`w-1 rounded-full ${color}`}
          style={{
            animation: "wave-bar 1s ease-in-out infinite both",
            animationDelay: `${Math.random() * -1}s`,
          }}
        />
      ))}
    </div>
  );
}
