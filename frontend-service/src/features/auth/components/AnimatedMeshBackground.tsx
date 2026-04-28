"use client"

import { motion } from "framer-motion"

interface Blob {
  color: string
  size: string
  initialX: string
  initialY: string
  delay: number
}

const blobs: Blob[] = [
  { color: "#f97316", size: "50%", initialX: "-10%", initialY: "-10%", delay: 0 },
  { color: "#ec4899", size: "45%", initialX: "60%", initialY: "20%", delay: 2 },
  { color: "#a855f7", size: "40%", initialX: "20%", initialY: "60%", delay: 4 },
]

export function AnimatedMeshBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-30 mix-blend-multiply dark:mix-blend-screen filter blur-[80px]"
          style={{
            backgroundColor: blob.color,
            width: blob.size,
            height: blob.size,
            left: blob.initialX,
            top: blob.initialY,
          }}
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -60, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 10,
            delay: blob.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
