"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mic, MicOff, Volume2, VolumeX, Video, SmilePlus, MoreHorizontal, PhoneOff } from "lucide-react"

const REACTIONS = ["❤️", "😂", "🎉", "👍", "🔥", "😮"]

interface CallControlsProps {
  onEnd: () => void
  onToggleVideo?: () => void
  showVideo?: boolean
}

export function CallControls({ onEnd, onToggleVideo, showVideo }: CallControlsProps) {
  const [muted, setMuted] = useState(false)
  const [speakerOff, setSpeakerOff] = useState(false)
  const [floatingReaction, setFloatingReaction] = useState<{ emoji: string; id: number } | null>(null)
  const [showReactions, setShowReactions] = useState(false)

  const sendReaction = (emoji: string) => {
    const id = Date.now()
    setFloatingReaction({ emoji, id })
    setShowReactions(false)
    setTimeout(() => setFloatingReaction(null), 2000)
  }

  return (
    <div className="relative">
      {floatingReaction && (
        <motion.div
          key={floatingReaction.id}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 text-5xl pointer-events-none z-20"
          initial={{ y: 0, opacity: 1, scale: 0.5 }}
          animate={{ y: -120, opacity: 0, scale: 1.5 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          {floatingReaction.emoji}
        </motion.div>
      )}

      {showReactions && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setShowReactions(false)} />
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2 glass px-4 py-2.5 rounded-2xl">
            {REACTIONS.map((e) => (
              <button key={e} className="text-2xl hover:scale-125 transition-transform" onClick={() => sendReaction(e)}>
                {e}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="h-20 glass-strong flex items-center justify-center gap-4 px-8 rounded-2xl">
        <ControlButton active={muted} activeColor="bg-danger" onClick={() => setMuted(!muted)}>
          {muted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </ControlButton>

        <ControlButton active={speakerOff} activeColor="bg-danger" onClick={() => setSpeakerOff(!speakerOff)}>
          {speakerOff ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </ControlButton>

        {onToggleVideo && (
          <ControlButton onClick={onToggleVideo}>
            <Video className="w-5 h-5" />
          </ControlButton>
        )}

        <ControlButton onClick={() => setShowReactions(!showReactions)}>
          <SmilePlus className="w-5 h-5" />
        </ControlButton>

        <ControlButton onClick={() => {}}>
          <MoreHorizontal className="w-5 h-5" />
        </ControlButton>

        <div className="w-px h-10 bg-white/10 mx-1" />

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnd}
          className="h-14 px-6 rounded-2xl flex items-center gap-2 text-white font-semibold text-sm"
          style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)", boxShadow: "0 8px 32px rgba(239,68,68,0.5)" }}
        >
          <PhoneOff className="w-5 h-5" />
          End
        </motion.button>
      </div>
    </div>
  )
}

function ControlButton({
  children, onClick, active, activeColor = "bg-white/20"
}: { children: React.ReactNode; onClick: () => void; active?: boolean; activeColor?: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white transition-colors ${active ? activeColor : "bg-white/10 hover:bg-white/20"}`}
    >
      {children}
    </motion.button>
  )
}
