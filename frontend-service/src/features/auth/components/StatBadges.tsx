import React from "react";
import { Activity, Clock, Lock } from "lucide-react";

export function StatBadges() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-surface rounded-xl p-3 text-center border border-gray-100 shadow-sm flex flex-col items-center justify-center">
        <Activity size={20} className="text-brand-500 mb-2" />
        <span className="block text-sm font-bold text-gray-900">99.9%</span>
        <span className="block text-xs text-gray-500">Uptime</span>
      </div>
      <div className="bg-surface rounded-xl p-3 text-center border border-gray-100 shadow-sm flex flex-col items-center justify-center">
        <Clock size={20} className="text-accent-pink mb-2" />
        <span className="block text-sm font-bold text-gray-900">&lt;50ms</span>
        <span className="block text-xs text-gray-500">Latency</span>
      </div>
      <div className="bg-surface rounded-xl p-3 text-center border border-gray-100 shadow-sm flex flex-col items-center justify-center">
        <Lock size={20} className="text-accent-purple mb-2" />
        <span className="block text-sm font-bold text-gray-900">256-bit</span>
        <span className="block text-xs text-gray-500">Encrypted</span>
      </div>
    </div>
  );
}
