"use client";

import React from "react";
import { MicOff } from "lucide-react";
import { WaveformBars } from "@/shared/components/WaveformBars";

export interface ParticipantVideoProps {
  name: string;
  avatarUrl?: string;
  isSpeaking?: boolean;
  isMuted?: boolean;
}

export function ParticipantVideo({ name, avatarUrl, isSpeaking, isMuted }: ParticipantVideoProps) {
  return (
    <div className={`relative w-full h-full bg-gray-900 rounded-2xl overflow-hidden shadow-md transition-all ${isSpeaking ? "ring-4 ring-brand-500" : ""}`}>
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="w-full h-full object-cover opacity-80" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center brand-grad opacity-80">
          <span className="text-white text-5xl font-bold">{name.charAt(0)}</span>
        </div>
      )}
      
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <div className="bg-black/50 backdrop-blur-md text-white text-sm font-semibold px-3 py-1.5 rounded-lg flex items-center gap-2">
          {name}
          {isMuted && <MicOff size={14} className="text-danger" />}
        </div>
        {isSpeaking && !isMuted && (
          <div className="bg-brand-500 text-white p-1.5 rounded-lg">
            <WaveformBars />
          </div>
        )}
      </div>
    </div>
  );
}
