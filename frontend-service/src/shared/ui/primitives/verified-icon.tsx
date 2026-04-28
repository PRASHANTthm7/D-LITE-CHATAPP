import * as React from "react"

type VerifiedSize = "xs" | "sm" | "md" | "lg"

const sizeMap: Record<VerifiedSize, number> = {
  xs: 10,
  sm: 12,
  md: 16,
  lg: 20,
}

export function VerifiedIcon({ size = "md", className }: { size?: VerifiedSize; className?: string }) {
  const px = sizeMap[size]
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-label="Verified"
    >
      <path
        d="M12 2L14.09 8.26L20 9.27L15.5 13.97L16.82 20L12 17.27L7.18 20L8.5 13.97L4 9.27L9.91 8.26L12 2Z"
        fill="#3b82f6"
        stroke="#2563eb"
        strokeWidth="0.5"
      />
      <path
        d="M9.5 12.5L11 14L14.5 10.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
