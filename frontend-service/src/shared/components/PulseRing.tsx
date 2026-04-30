"use client";

import React from "react";

export interface PulseRingProps {
  color?: string;
  delay?: string;
  size?: string;
  className?: string;
}

export function PulseRing({
  color = "border-brand-500",
  delay = "0s",
  size = "w-full h-full",
  className = "",
}: PulseRingProps) {
  return (
    <div
      className={`absolute inset-0 m-auto rounded-full border-2 ${color} ${size} ${className}`}
      style={{
        animation: "pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite both",
        animationDelay: delay,
      }}
    />
  );
}
