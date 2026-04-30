import React from "react";

export interface ActionItemProps {
  num: number;
  title: string;
  desc: string;
  colorClass: string; // e.g., "border-brand-500" or "border-accent-pink"
}

export function ActionItem({ num, title, desc, colorClass }: ActionItemProps) {
  return (
    <div className={`flex items-start gap-3 my-3 p-3 bg-gray-50/50 rounded-xl border-l-4 ${colorClass}`}>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-white shadow-sm text-gray-700`}>
        {num}
      </div>
      <div>
        <h5 className="font-bold text-gray-900 text-sm mb-0.5">{title}</h5>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  );
}
