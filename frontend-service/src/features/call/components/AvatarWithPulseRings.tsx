"use client"

import { motion } from "framer-motion"
import { Avatar } from "@/shared/ui/primitives/avatar"

interface AvatarWithPulseRingsProps {
  src?: string
  name: string
  size?: number
  speaking?: boolean
}

export function AvatarWithPulseRings({ src, name, size = 160, speaking = false }: AvatarWithPulseRingsProps) {
  const rings = [
    { color: "#f97316", delay: 0 },
    { color: "#ec4899", delay: 0.4 },
    { color: "#a855f7", delay: 0.8 },
  ]

  return (
    <div className="relative flex items-center justify-center" style={{ width: size + 100, height: size + 100 }}>
      {rings.map((ring, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: size + (i + 1) * 40,
            height: size + (i + 1) * 40,
            border: `2px solid ${ring.color}`,
            opacity: speaking ? 0.6 : 0.2,
          }}
          animate={{ scale: [1, speaking ? 1.2 : 1.08], opacity: [speaking ? 0.6 : 0.2, 0] }}
          transition={{ duration: 1.5, delay: ring.delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}

      {/* Rotating dashed ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size + 20,
          height: size + 20,
          border: "2px dashed rgba(255,255,255,0.15)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <div
        className="relative z-10 rounded-full overflow-hidden border-4 border-surface-1 shadow-2xl"
        style={{
          width: size,
          height: size,
          boxShadow: speaking ? "0 0 0 4px rgba(249,115,22,0.4), 0 20px 60px rgba(0,0,0,0.5)" : "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #f97316, #ec4899, #a855f7)" }}>
            <span className="text-white font-bold" style={{ fontSize: size / 3 }}>{name[0]}</span>
          </div>
        )}
      </div>
    </div>
  )
}
