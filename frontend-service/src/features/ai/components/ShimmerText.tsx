import React from "react";

export function ShimmerText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span
      className={`inline-block font-semibold bg-clip-text text-transparent bg-[linear-gradient(110deg,#f97316,45%,#fbcfe8,55%,#a855f7)] bg-[length:200%_100%] animate-[shimmer_2.5s_linear_infinite] ${className}`}
    >
      {text}
    </span>
  );
}
