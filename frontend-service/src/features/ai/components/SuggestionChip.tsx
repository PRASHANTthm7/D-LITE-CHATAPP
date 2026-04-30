"use client";

import React from "react";
import { motion } from "framer-motion";

export interface SuggestionChipProps {
  emoji: string;
  label: string;
  onClick?: () => void;
}

export function SuggestionChip({ emoji, label, onClick }: SuggestionChipProps) {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex items-center gap-2 bg-surface border border-gray-200 shadow-sm px-3 py-2 rounded-full text-sm text-gray-700 hover:border-brand-300 hover:text-brand-700 transition-colors"
    >
      <span>{emoji}</span>
      <span>{label}</span>
    </motion.button>
  );
}
