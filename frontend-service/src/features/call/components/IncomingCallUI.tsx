"use client"

import * as React from "react"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { Shield, VolumeX, Volume2 } from "lucide-react"
import { AvatarWithPulseRings } from "./AvatarWithPulseRings"
import { AcceptDeclineButtons } from "./AcceptDeclineButtons"

interface IncomingCallUIProps {
  caller: {
    name: string
    username: string
    verified?: boolean
    avatar?: string
  }
  callType: "voice" | "video"
  onAccept: () => void
  onDecline: () => void
  onQuickReply?: (msg: string) => void
}

const QUICK_REPLIES = [
  { icon: "💬", text: "Can't talk now" },
  { icon: "📞", text: "Call you back" },
  { icon: "🚗", text: "On my way" },
]

export function IncomingCallUI({ caller, callType, onAccept, onDecline, onQuickReply }: IncomingCallUIProps) {
  const [muted, setMuted] = React.useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDecline()
      if (e.key === " ") { e.preventDefault(); onAccept() }
    }
    document.addEventListener("keydown", handler)

    // Auto-decline after 30s
    const timer = setTimeout(onDecline, 30000)

    return () => {
      document.removeEventListener("keydown", handler)
      clearTimeout(timer)
    }
  }, [onAccept, onDecline])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between py-12 px-6 overflow-hidden bg-surface-1">
      {/* Aurora */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-25 blur-[100px] animate-blob" style={{ backgroundColor: "#f97316" }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[60%] rounded-full opacity-25 blur-[100px] animate-blob animation-delay-2000" style={{ backgroundColor: "#a855f7" }} />
      </div>

      {/* Mute ringtone button */}
      <div className="relative z-10 self-end">
        <button
          onClick={() => setMuted(!muted)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${muted ? "bg-danger text-white" : "glass text-text-secondary"}`}
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Badge */}
        <div className="glass px-4 py-2 rounded-full">
          <p className="text-xs font-bold uppercase tracking-widest text-warning">
            Incoming {callType} call
          </p>
        </div>

        <AvatarWithPulseRings
          src={caller.avatar}
          name={caller.name}
          size={150}
        />

        <div className="text-center">
          <h2 className="text-3xl font-bold brand-gradient-text mb-1">{caller.name}</h2>
          {caller.verified && (
            <div className="flex items-center justify-center gap-1 mb-1">
              <Shield className="w-3 h-3 text-info" />
              <span className="text-xs text-info">Verified contact</span>
            </div>
          )}
          <div className="flex items-center justify-center gap-1 text-sm text-text-secondary">
            Ringing
            <span className="typing-dot mx-0.5">.</span>
            <span className="typing-dot mx-0.5">.</span>
            <span className="typing-dot mx-0.5">.</span>
          </div>
          <p className="text-xs text-text-tertiary mt-1">@{caller.username}</p>
        </div>
      </div>

      {/* Quick replies */}
      <div className="relative z-10 flex flex-col items-center gap-6 w-full">
        <div className="flex gap-2 flex-wrap justify-center">
          {QUICK_REPLIES.map((r) => (
            <button
              key={r.text}
              onClick={() => { onQuickReply?.(r.text); onDecline() }}
              className="glass px-3 py-1.5 rounded-full text-xs text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5"
            >
              {r.icon} {r.text}
            </button>
          ))}
        </div>

        <AcceptDeclineButtons onAccept={onAccept} onDecline={onDecline} />
      </div>
    </div>
  )
}
