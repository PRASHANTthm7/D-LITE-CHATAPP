"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export interface StatCardProps {
  label: string;
  value: number;
  delta: number;
  icon: React.ReactNode;
  iconColorClass?: string;
  suffix?: string;
}

export function StatCard({ label, value, delta, icon, iconColorClass = "text-brand-500", suffix = "" }: StatCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalDuration = 1000;
    let incrementTime = (totalDuration / end) * 2;
    
    // Cap increment time so large numbers animate reasonably
    if (incrementTime > 50) incrementTime = 50;

    const timer = setInterval(() => {
      start += Math.max(1, Math.floor(end / 20));
      if (start > end) start = end;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  const isPositive = delta >= 0;

  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.01 }}
      className="themed-surface border themed-border rounded-2xl p-5 shadow-card transition-shadow hover:shadow-elevated"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl themed-surface-2 border themed-border ${iconColorClass}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${isPositive ? "text-success bg-green-50" : "text-danger bg-red-50"}`}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(delta)}%
        </div>
      </div>
      <div>
        <p className="text-sm font-medium themed-text-3 mb-1">{label}</p>
        <h3 className="text-2xl font-bold themed-text">
          {count}{suffix}
        </h3>
      </div>
    </motion.div>
  );
}
