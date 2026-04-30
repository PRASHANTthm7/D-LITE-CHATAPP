import React from "react";
import { User } from "@/features/dashboard/lib/mock-data";

export interface StackedAvatarProps {
  members: User[];
  max?: number;
}

export function StackedAvatar({ members, max = 3 }: StackedAvatarProps) {
  const visible = members.slice(0, max);
  const excess = members.length - max;

  return (
    <div className="flex -space-x-2">
      {visible.map((member, i) => (
        <div 
          key={member.id} 
          className={`w-10 h-10 rounded-full border-2 border-surface bg-brand-${300 + i*100} flex items-center justify-center text-white text-xs font-bold z-${30-i*10}`}
        >
          {member.initials}
        </div>
      ))}
      {excess > 0 && (
        <div className="w-10 h-10 rounded-full border-2 border-surface bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-bold z-0">
          +{excess}
        </div>
      )}
    </div>
  );
}
