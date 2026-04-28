"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { PhoneOff, Phone } from "lucide-react"

interface AcceptDeclineButtonsProps {
  onAccept: () => void
  onDecline: () => void
}

export function AcceptDeclineButtons({ onAccept, onDecline }: AcceptDeclineButtonsProps) {
  return (
    <div className="flex items-end justify-center gap-16">
      {/* Decline */}
      <div className="flex flex-col items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDecline}
          className="w-[70px] h-[70px] rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #ef4444, #dc2626)",
            boxShadow: "0 8px 32px rgba(239,68,68,0.5)"
          }}
        >
          <PhoneOff className="w-7 h-7 text-white" style={{ transform: "rotate(135deg)" }} />
        </motion.button>
        <span className="text-sm text-white/70">Decline</span>
      </div>

      {/* Accept */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full"
              style={{ border: "2px solid rgba(16,185,129,0.5)" }}
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 1, delay: i * 0.4, repeat: Infinity }}
            />
          ))}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAccept}
            className="relative w-[70px] h-[70px] rounded-full flex items-center justify-center z-10"
            style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              boxShadow: "0 8px 32px rgba(16,185,129,0.5)"
            }}
          >
            <Phone className="w-7 h-7 text-white" />
          </motion.button>
        </div>
        <span className="text-sm text-white/70">Accept</span>
      </div>
    </div>
  )
}
