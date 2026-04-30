"use client";

import React from "react";
import { TypingDots } from "@/shared/components/TypingDots";
import { Avatar } from "@/shared/components/Avatar";

export interface TypingIndicatorProps {
  name: string;
  initials: string;
}

export function TypingIndicator({ name, initials }: TypingIndicatorProps) {
  return (
    <div className="flex items-end gap-3 mb-4 max-w-[70%]">
      <Avatar initials={initials} size="sm" className="mb-1" />
      <div className="bg-surface border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
        <TypingDots />
        <span className="text-xs text-gray-400 mt-1 block">{name} is typing...</span>
      </div>
    </div>
  );
}
