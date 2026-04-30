import React from "react";
import { VideoGrid } from "@/features/calls/components/VideoGrid";
import { CallControls } from "@/features/calls/components/CallControls";
import { ParticipantList } from "@/features/calls/components/ParticipantList";
import { mockUsers } from "@/features/dashboard/lib/mock-data";

export default function CallPage() {
  const participants = [
    { ...mockUsers.aarav, isMuted: false, videoOff: false },
    { ...mockUsers.priya, isMuted: false, videoOff: false },
    { ...mockUsers.rahul, isMuted: true, videoOff: false },
    { ...mockUsers.sneha, isMuted: false, videoOff: true },
  ];

  return (
    <div className="flex h-screen w-full bg-gray-950 overflow-hidden">
      <div className="flex-1 flex flex-col h-full relative z-0">
        <VideoGrid />
        <CallControls />
      </div>
      <ParticipantList participants={participants} />
    </div>
  );
}
