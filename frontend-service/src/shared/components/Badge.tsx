"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export interface BadgeProps {
  count: number;
  max?: number;
  className?: string;
}

export function Badge({ count, max = 99, className = "" }: BadgeProps) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (count > 0) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 300);
      return () => clearTimeout(timer);
    }
  }, [count]);

  if (count === 0) return null;

  const displayCount = count > max ? `${max}+` : count;

  return (
    <motion.span
      animate={pulse ? { scale: [1, 1.2, 1] } : { scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-brand-500 rounded-full shadow-sm ${className}`}
    >
      {displayCount}
    </motion.span>
  );
}
