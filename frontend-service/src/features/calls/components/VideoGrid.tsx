"use client";

import React from "react";
import { ParticipantVideo } from "./ParticipantVideo";

export function VideoGrid() {
  const participants = [
    { id: "1", name: "Aarav Sharma", isSpeaking: true },
    { id: "2", name: "Priya Sharma" },
    { id: "3", name: "Rahul Kumar", isMuted: true },
    { id: "4", name: "Sneha Kapoor" },
  ];

  return (
    <div className="flex-1 p-6 grid grid-cols-2 gap-4 auto-rows-fr">
      {participants.map((p) => (
        <ParticipantVideo key={p.id} {...p} />
      ))}
    </div>
  );
}
