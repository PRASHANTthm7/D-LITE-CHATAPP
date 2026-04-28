"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar } from "@/shared/ui/primitives/avatar"

interface ChatMessage {
  id: number
  text: string
  isOwn: boolean
  reaction?: string
}

const SCRIPT: ChatMessage[] = [
  { id: 1, text: "Hey! Have you tried D-Lite yet?", isOwn: false },
  { id: 2, text: "Just signed up — the UI is amazing 😍", isOwn: true },
  { id: 3, text: "Right?! The calls are crystal clear too", isOwn: false },
  { id: 4, text: "The AI assistant is a game changer!", isOwn: true, reaction: "🔥" },
  { id: 5, text: "Can't go back to anything else now 😂", isOwn: false },
]

export function LiveChatPreview() {
  const [visibleCount, setVisibleCount] = React.useState(0)

  React.useEffect(() => {
    let i = 0
    const tick = () => {
      i++
      setVisibleCount(i)
      if (i < SCRIPT.length) {
        setTimeout(tick, 1400)
      } else {
        // Reset after pause
        setTimeout(() => {
          setVisibleCount(0)
          setTimeout(() => { i = 0; tick() }, 500)
        }, 4000)
      }
    }
    const timer = setTimeout(tick, 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full max-w-sm mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 space-y-3">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-3">
        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span className="text-white/70 text-xs font-medium">Live preview</span>
      </div>
      <AnimatePresence>
        {SCRIPT.slice(0, visibleCount).map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`flex ${msg.isOwn ? "justify-end" : "justify-start"} gap-2`}
          >
            {!msg.isOwn && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex-shrink-0" />
            )}
            <div className="relative max-w-[75%]">
              <div
                className={`px-3 py-2 rounded-2xl text-sm ${
                  msg.isOwn
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-tr-sm"
                    : "bg-white/10 text-white rounded-tl-sm"
                }`}
              >
                {msg.text}
              </div>
              {msg.reaction && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 400 }}
                  className="absolute -bottom-2 -right-1 bg-white rounded-full px-1.5 text-xs shadow-md"
                >
                  {msg.reaction}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
