"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, MessageCircle } from "lucide-react"
import { formatDuration } from "@/shared/utils/format"
import { Avatar } from "@/shared/ui/primitives/avatar"
import { Button } from "@/shared/ui/primitives/button"
import Link from "next/link"

interface CallEndedScreenProps {
  peerName: string
  durationSeconds: number
  peerAvatar?: string
  onCallAgain?: () => void
}

export function CallEndedScreen({ peerName, durationSeconds, peerAvatar, onCallAgain }: CallEndedScreenProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-border-default shadow-xl">
        {peerAvatar
          ? <img src={peerAvatar} alt={peerName} className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center bg-surface-3 text-3xl font-bold">{peerName[0]}</div>
        }
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary">{peerName}</h2>
        <p className="text-text-tertiary text-sm mt-1">Call ended · {formatDuration(durationSeconds)}</p>
      </div>
      <div className="flex gap-3">
        <Button variant="secondary" onClick={onCallAgain}>
          <Phone className="w-4 h-4 mr-1.5" /> Call again
        </Button>
        <Link href="/chat">
          <Button variant="ghost">
            <MessageCircle className="w-4 h-4 mr-1.5" /> Back to chat
          </Button>
        </Link>
      </div>
    </div>
  )
}
