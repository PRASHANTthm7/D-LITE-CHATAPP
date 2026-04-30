import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-surface border border-brand-500/10 rounded-2xl shadow-[0_4px_20px_-4px_rgba(234,88,12,0.08)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
