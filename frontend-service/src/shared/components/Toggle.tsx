"use client";

import React from "react";
import { motion } from "framer-motion";

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function Toggle({ checked, onChange, disabled }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)] focus:ring-offset-2 ${
        checked ? "bg-[var(--brand-600)]" : "bg-[var(--border-soft)]"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${checked ? 'on' : ''} toggle`}
    >
      <motion.span
        layout
        className="inline-block h-4 w-4 transform rounded-full bg-[var(--surface)] shadow-card"
        initial={false}
        animate={{
          x: checked ? 24 : 4,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />
    </button>
  );
}
