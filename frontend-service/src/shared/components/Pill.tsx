"use client";

import React from "react";

export interface PillProps {
  children: React.ReactNode;
  variant?: "success" | "warn" | "danger" | "brand" | "neutral";
  dot?: boolean;
  className?: string;
}

export function Pill({ children, variant = "neutral", dot = false, className = "" }: PillProps) {
  const variantStyles = {
    success: "bg-green-100 text-green-800",
    warn: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    brand: "bg-brand-100 text-brand-700",
    neutral: "bg-gray-100 text-gray-800",
  };

  const dotStyles = {
    success: "bg-success",
    warn: "bg-warn",
    danger: "bg-danger",
    brand: "bg-brand-500",
    neutral: "bg-gray-400",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[variant]}`} />}
      {children}
    </span>
  );
}
