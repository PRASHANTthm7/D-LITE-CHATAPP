"use client";

import { Mic, MicOff, PhoneOff, Video } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/shared/ui/primitives/avatar";

export function VoiceCallUI({ roomId }: { roomId: string }) {
  const [muted, setMuted] = useState(false);

  return (
    <div className="flex flex-col h-full w-full relative overflow-hidden bg-surface-2 animate-in fade-in duration-500">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-primary-soft rounded-full mix-blend-multiply filter blur-[100px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-[#ec4899]/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="flex flex-col items-center mb-12">
          <div className="bg-surface-1/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-border-default mb-2 flex items-center gap-2 shadow-sm">
             <div className="w-2 h-2 rounded-full bg-danger animate-pulse" />
             <span className="text-sm font-medium">10:45</span>
             <span className="text-xs text-text-tertiary ml-1">Voice · HD</span>
          </div>
          <div className="bg-success/10 text-success px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            End-to-End Encrypted
          </div>
        </div>

        <div className="relative mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-brand-primary/20 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-[-20%] rounded-full bg-[#ec4899]/10 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
          
          <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${roomId}`} size="xl" className="w-40 h-40 shadow-2xl relative z-10 border-4 border-surface-1" />
        </div>

        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-brand-gradient mb-1">
          Peer {roomId}
        </h2>
        <p className="text-text-secondary">@peer_{roomId} · San Francisco</p>
      </div>

      <div className="h-24 bg-surface-1/80 backdrop-blur-xl border-t border-border-default flex items-center justify-center gap-6 z-10 px-6">
        <button 
          onClick={() => setMuted(!muted)}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${muted ? 'bg-surface-3 text-text-primary' : 'bg-surface-2 text-text-secondary hover:bg-surface-3'}`}
        >
          {muted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>
        
        <button className="w-14 h-14 rounded-full bg-surface-2 flex items-center justify-center text-text-secondary hover:bg-surface-3 transition-colors">
          <Video className="w-6 h-6" />
        </button>
        
        <div className="w-[1px] h-10 bg-border-default mx-2" />
        
        <button className="w-16 h-16 rounded-full bg-danger flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform hover:shadow-danger/50 hover:shadow-2xl">
          <PhoneOff className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}
