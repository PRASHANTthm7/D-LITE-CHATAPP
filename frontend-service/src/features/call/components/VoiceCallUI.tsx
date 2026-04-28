"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield } from "lucide-react"
import { CallTimer } from "./CallTimer"
import { ConnectionQualityPill } from "./ConnectionQualityPill"
import { WaveformVisualizer } from "./WaveformVisualizer"
import { AvatarWithPulseRings } from "./AvatarWithPulseRings"
import { CallControls } from "./CallControls"
import { useRouter } from "next/navigation"

export function VoiceCallUI({ roomId }: { roomId: string }) {
  const router = useRouter()
  const peerName = `Peer ${roomId}`

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden py-10 px-6 bg-surface-3">
      {/* Aurora blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-30 blur-[100px] animate-blob" style={{ backgroundColor: "#f97316" }} />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full opacity-30 blur-[100px] animate-blob animation-delay-2000" style={{ backgroundColor: "#ec4899" }} />
        <div className="absolute bottom-[-10%] left-[30%] w-[40%] h-[40%] rounded-full opacity-20 blur-[100px] animate-blob animation-delay-4000" style={{ backgroundColor: "#a855f7" }} />
      </div>

      {/* Top bar */}
      <div className="relative z-10 flex w-full justify-between items-start">
        <div className="glass flex items-center gap-2.5 px-4 py-2 rounded-full">
          <CallTimer />
          <span className="text-text-tertiary text-xs">·</span>
          <span className="text-xs text-text-secondary">Voice · HD</span>
        </div>
        <ConnectionQualityPill tier="excellent" rttMs={28} />
      </div>

      {/* Center */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="glass px-3 py-1 rounded-full flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-success" />
          <span className="text-[11px] text-success font-medium">End-to-End Encrypted</span>
        </div>

        <AvatarWithPulseRings
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${peerName}`}
          name={peerName}
          size={160}
          speaking={false}
        />

        <div className="text-center">
          <h2 className="text-4xl font-bold brand-gradient-text mb-1">{peerName}</h2>
          <p className="text-text-secondary">@peer_{roomId} · Voice call</p>
        </div>

        {/* Waveform */}
        <div className="glass px-6 py-3 rounded-2xl">
          <WaveformVisualizer level={0.2} />
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-10 w-full flex justify-center">
        <CallControls onEnd={() => router.push("/calls")} />
      </div>
    </div>
  )
}
