"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export interface ReactionPillProps {
  emoji: string;
  count: number;
  active?: boolean;
  onClick?: () => void;
}

export function ReactionPill({ emoji, count, active = false, onClick }: ReactionPillProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border shadow-sm transition-colors ${
        active
          ? "bg-brand-50 border-brand-200 text-brand-700"
          : "bg-surface border-gray-100 text-gray-600 hover:border-gray-200 hover:bg-gray-50"
      }`}
    >
      <span>{emoji}</span>
      <span className={active ? "text-brand-600" : "text-gray-500"}>
        {count + (isHovered && !active ? 1 : 0)}
      </span>
    </motion.button>
  );
}
