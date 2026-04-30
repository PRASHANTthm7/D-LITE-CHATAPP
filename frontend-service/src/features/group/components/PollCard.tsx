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
    <div className="bg-surface border border-gray-100 rounded-xl p-4 w-[300px] shadow-sm mb-4">
      <h4 className="font-bold text-sm text-gray-900 mb-3">{title}</h4>
      <div className="space-y-2 mb-3">
        {options.map((opt) => {
          const percent = totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100);
          const isSelected = selectedId === opt.id;
          
          return (
            <div 
              key={opt.id} 
              onClick={() => handleVote(opt.id)}
              className={`relative h-10 rounded-lg overflow-hidden border cursor-pointer transition-colors ${
                isSelected ? "border-brand-500 bg-brand-50" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <motion.div 
                className={`absolute inset-0 opacity-20 ${isSelected ? "bg-brand-500" : "bg-gray-300"}`}
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <div className="relative z-10 flex items-center justify-between h-full px-3">
                <span className={`text-sm font-medium ${isSelected ? "text-brand-700" : "text-gray-700"}`}>
                  {opt.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${isSelected ? "text-brand-600 font-bold" : "text-gray-500"}`}>
                    {percent}%
                  </span>
                  {isSelected && <CheckCircle2 size={14} className="text-brand-500" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-xs text-gray-400 flex justify-between items-center">
        <span>{totalVotes} votes</span>
        <span>Ends in {endsIn}</span>
      </div>
    </div>
  );
}
