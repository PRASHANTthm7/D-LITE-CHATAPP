"use client";

import React from "react";
import Link from "next/link";
import { Phone, Video, PhoneMissed, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar } from "@/shared/components/Avatar";
import { Pill } from "@/shared/components/Pill";
import { IconButton } from "@/shared/components/IconButton";
import { recentCalls, CallPreview } from "../lib/mock-data";

function CallItem({ call }: { call: CallPreview }) {
  const isMissed = call.status === "missed";
  const CallIcon = isMissed ? PhoneMissed : (call.type === "video" ? Video : Phone);
  
  return (
    <motion.div 
      whileHover={{ x: 4 }}
      className="flex items-center gap-3 py-3 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors"
    >
      <div className="relative">
        <Avatar initials={call.user.initials} online={call.user.isOnline} size="sm" />
        <div className={`absolute -bottom-1 -right-1 p-0.5 rounded-full border border-surface ${isMissed ? "bg-danger text-white" : "bg-gray-100 text-gray-500"}`}>
          <CallIcon size={10} />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 truncate">{call.user.name}</h4>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-gray-400">{call.time}</span>
          {isMissed ? (
            <Pill variant="danger" className="text-[10px] px-1.5 py-0 h-4">Missed</Pill>
          ) : (
            <Pill variant="neutral" className="text-[10px] px-1.5 py-0 h-4">{call.duration}</Pill>
          )}
        </div>
      </div>

      <IconButton size="sm" variant="ghost" className="text-brand-500 hover:text-brand-600 hover:bg-brand-50">
        <PhoneCall size={16} />
      </IconButton>
    </motion.div>
  );
}

export function RecentCallsCard() {
  return (
    <div className="bg-surface border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-accent-pink/10 text-accent-pink">
            <Phone size={16} />
          </div>
          <h3 className="font-bold text-gray-900">Recent Calls</h3>
        </div>
        <Link href="/calls" className="text-xs font-semibold text-brand-500 hover:text-brand-600">
          View all
        </Link>
      </div>

      <div className="flex flex-col flex-1 divide-y divide-gray-50">
        {recentCalls.map((call) => (
          <CallItem key={call.id} call={call} />
        ))}
      </div>
    </div>
  );
}
