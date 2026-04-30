"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

export interface PasswordStrengthMeterProps {
  password?: string;
}

export function PasswordStrengthMeter({ password = "" }: PasswordStrengthMeterProps) {
  const strength = useMemo(() => {
    let score = 0;
    if (!password) return score;

    if (password.length > 8) score += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    return score; // 0 to 4
  }, [password]);

  const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
  const colors = ["bg-gray-200", "bg-danger", "bg-warn", "bg-success", "bg-brand-500"];

  const activeColor = (score: number) => {
    if (score === 0) return colors[0];
    if (score === 1) return colors[1];
    if (score === 2) return colors[2];
    if (score === 3) return colors[3];
    return colors[4];
  };

  return (
    <div className="mt-2">
      <div className="flex gap-1 h-1.5 mb-1.5">
        {[1, 2, 3, 4].map((level) => (
          <motion.div
            key={level}
            layout
            className={`flex-1 rounded-full transition-colors duration-300 ${
              strength >= level ? activeColor(strength) : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <div className="text-xs text-gray-500 text-right">
        {password ? labels[strength] : "Password strength"}
      </div>
    </div>
  );
}
