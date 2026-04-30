import React from "react";
import { Avatar } from "@/shared/components/Avatar";
import { AtSign, MessageSquare, PhoneMissed } from "lucide-react";

export interface NotificationItemProps {
  id: string;
  type: "mention" | "reply" | "missed_call";
  user: { name: string; initials: string; avatarUrl?: string };
  content: string;
  time: string;
  isRead: boolean;
  groupName?: string;
}

export function NotificationItem({ type, user, content, time, isRead, groupName }: NotificationItemProps) {
  const icons = {
    mention: <AtSign size={14} className="text-white" />,
    reply: <MessageSquare size={14} className="text-white" />,
    missed_call: <PhoneMissed size={14} className="text-white" />,
  };

  const bgColors = {
    mention: "bg-accent-pink",
    reply: "bg-brand-500",
    missed_call: "bg-danger",
  };

  return (
    <div className={`p-4 rounded-xl border flex items-start gap-4 cursor-pointer transition-all ${
      isRead ? "bg-surface border-gray-100 opacity-70" : "bg-brand-50 border-brand-100 shadow-sm"
    }`}>
      <div className="relative mt-1">
        <Avatar initials={user.initials} size="md" />
        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-surface ${bgColors[type]}`}>
          {icons[type]}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between mb-0.5">
          <span className="font-semibold text-gray-900 text-sm">
            {user.name}
            {groupName && <span className="text-gray-500 font-normal"> in {groupName}</span>}
          </span>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
        <p className={`text-sm ${isRead ? "text-gray-500" : "text-gray-800 font-medium"}`}>
          {content}
        </p>
      </div>
      {!isRead && <div className="w-2.5 h-2.5 rounded-full bg-brand-500 shrink-0 mt-2" />}
    </div>
  );
}
