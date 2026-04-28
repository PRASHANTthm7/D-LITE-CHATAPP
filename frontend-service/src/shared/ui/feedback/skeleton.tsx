import * as React from "react"
import { cn } from "@/shared/utils/cn"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circle" | "rect"
  width?: number | string
  height?: number | string
}

function Skeleton({ className, variant = "rect", width, height, style, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-surface-3",
        variant === "text" && "rounded h-4",
        variant === "circle" && "rounded-full",
        variant === "rect" && "rounded-md",
        className
      )}
      style={{
        width: width,
        height: height,
        ...style,
      }}
      {...props}
    />
  )
}

export { Skeleton }
