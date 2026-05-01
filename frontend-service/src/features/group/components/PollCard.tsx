"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export interface PollCardProps {
  title: string;
  options: PollOption[];
  totalVotes: number;
  endsIn: string;
}

export function PollCard({ title, options: initialOptions, totalVotes: initialTotal, endsIn }: PollCardProps) {
  const [options, setOptions] = useState(initialOptions);
  const [totalVotes, setTotalVotes] = useState(initialTotal);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleVote = (id: string) => {
    if (selectedId) return; // already voted
    setSelectedId(id);
    setTotalVotes(prev => prev + 1);
    setOptions(prev => prev.map(opt => opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt));
  };

  return (
    <div className="themed-surface border themed-border rounded-xl p-4 w-[300px] shadow-card mb-4">
      <h4 className="font-bold text-sm themed-text mb-3">{title}</h4>
      <div className="space-y-2 mb-3">
        {options.map((opt) => {
          const percent = totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100);
          const isSelected = selectedId === opt.id;
          
          return (
            <div 
              key={opt.id} 
              onClick={() => handleVote(opt.id)}
              className={`relative h-10 rounded-lg overflow-hidden border cursor-pointer transition-colors ${
                isSelected ? "border-[var(--brand-500)] bg-[var(--row-active-bg)]" : "themed-border hover:border-[var(--brand-400)]"
              }`}
            >
              <motion.div 
                className={`absolute inset-0 opacity-20 ${isSelected ? "bg-[var(--brand-500)]" : "bg-[var(--brand-200)]"}`}
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <div className="relative z-10 flex items-center justify-between h-full px-3">
                <span className={`text-sm font-medium ${isSelected ? "text-[var(--brand-text)]" : "themed-text-2"}`}>
                  {opt.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${isSelected ? "text-[var(--brand-text)] font-bold" : "themed-text-3"}`}>
                    {percent}%
                  </span>
                  {isSelected && <CheckCircle2 size={14} className="text-[var(--brand-500)]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-xs themed-text-3 flex justify-between items-center">
        <span>{totalVotes} votes</span>
        <span>Ends in {endsIn}</span>
      </div>
    </div>
  );
}
