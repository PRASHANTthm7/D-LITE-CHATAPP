"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mic, MicOff, Video, VideoOff, ScreenShare, MessageSquare, PhoneOff, Settings } from "lucide-react";
import { IconButton } from "@/shared/components/IconButton";
import { motion } from "framer-motion";

export function CallControls() {
  const router = useRouter();
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  return (
    <div className="h-24 shrink-0 bg-surface/80 backdrop-blur-md border-t border-gray-100 flex items-center justify-center gap-4 px-6 z-10">
      <IconButton 
        size="lg" 
        variant={muted ? "secondary" : "ghost"} 
        className={muted ? "text-danger bg-red-50 hover:bg-red-100" : "text-gray-600 hover:text-brand-500 bg-gray-50"} 
        onClick={() => setMuted(!muted)}
        tooltip={muted ? "Unmute" : "Mute"}
      >
        {muted ? <MicOff size={22} /> : <Mic size={22} />}
      </IconButton>

      <IconButton 
        size="lg" 
        variant={videoOff ? "secondary" : "ghost"} 
        className={videoOff ? "text-danger bg-red-50 hover:bg-red-100" : "text-gray-600 hover:text-brand-500 bg-gray-50"} 
        onClick={() => setVideoOff(!videoOff)}
        tooltip={videoOff ? "Start Video" : "Stop Video"}
      >
        {videoOff ? <VideoOff size={22} /> : <Video size={22} />}
      </IconButton>

      <IconButton size="lg" variant="ghost" className="text-gray-600 hover:text-brand-500 bg-gray-50" tooltip="Share Screen">
        <ScreenShare size={22} />
      </IconButton>

      <IconButton size="lg" variant="ghost" className="text-gray-600 hover:text-brand-500 bg-gray-50" tooltip="Chat">
        <MessageSquare size={22} />
      </IconButton>

      <div className="w-px h-8 bg-gray-200 mx-2" />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/dashboard")}
        className="h-14 px-8 rounded-2xl bg-danger text-white flex items-center gap-2 font-bold shadow-lg shadow-red-500/20"
      >
        <PhoneOff size={20} />
        Leave Call
      </motion.button>

      <div className="w-px h-8 bg-gray-200 mx-2" />

      <IconButton size="lg" variant="ghost" className="text-gray-600 hover:text-brand-500 bg-gray-50" tooltip="Settings">
        <Settings size={22} />
      </IconButton>
    </div>
  );
}
