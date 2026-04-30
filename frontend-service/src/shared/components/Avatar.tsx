"use client";

import React from "react";
import { Check } from "lucide-react";

export interface AvatarProps {
  src?: string;
  initials?: string;
  size?: "sm" | "md" | "lg" | "xl";
  online?: boolean;
  verified?: boolean;
  className?: string;
}

export function Avatar({
  src,
  initials,
  size = "md",
  online = false,
  verified = false,
  className = "",
}: AvatarProps) {
  const sizeMap = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl",
  };

  const ringStyles = online ? "online-ring" : "";

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className={`rounded-full flex items-center justify-center overflow-hidden font-medium text-white ${sizeMap[size]} ${ringStyles}`}
      >
        {src ? (
          <img src={src} alt={initials || "Avatar"} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full brand-grad flex items-center justify-center">
            {initials || ""}
          </div>
        )}
      </div>

      {verified && (
        <div className="absolute -bottom-1 -right-1 bg-info text-white rounded-full p-[2px] border-2 border-white flex items-center justify-center">
          <Check size={size === "sm" ? 10 : 12} strokeWidth={3} />
        </div>
      )}
    </div>
  );
}
