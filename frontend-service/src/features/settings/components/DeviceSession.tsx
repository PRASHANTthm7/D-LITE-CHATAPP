import React from "react";
import { Monitor, Smartphone } from "lucide-react";
import { Button } from "@/shared/components/Button";

export function DeviceSession({ device, location, time, isCurrent = false, isMobile = false }: { device: string, location: string, time: string, isCurrent?: boolean, isMobile?: boolean }) {
  const Icon = isMobile ? Smartphone : Monitor;

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-0">
      <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 shrink-0">
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-semibold text-gray-900 text-sm truncate">{device}</span>
          {isCurrent && <span className="bg-success/10 text-success text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">Current</span>}
        </div>
        <div className="text-xs text-gray-500">
          {location} • {time}
        </div>
      </div>
      {!isCurrent && (
        <Button variant="secondary" size="sm" className="text-danger hover:bg-red-50 hover:text-red-600 hover:border-red-200">
          Log out
        </Button>
      )}
    </div>
  );
}
