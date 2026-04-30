"use client";

import React from "react";
import { User } from "@/features/dashboard/lib/mock-data";
import { Avatar } from "@/shared/components/Avatar";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

export function ParticipantList({ participants }: { participants: (User & { isMuted?: boolean, videoOff?: boolean })[] }) {
  return (
    <div className="w-[300px] h-full border-l border-gray-100 bg-surface flex flex-col shrink-0">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-bold text-gray-900">Participants ({participants.length})</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {participants.map((p) => (
          <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Avatar initials={p.initials} size="sm" />
            <span className="flex-1 font-semibold text-sm text-gray-900 truncate">{p.name}</span>
            <div className="flex gap-2 text-gray-400">
              {p.isMuted ? <MicOff size={16} className="text-danger" /> : <Mic size={16} />}
              {p.videoOff ? <VideoOff size={16} className="text-danger" /> : <Video size={16} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
