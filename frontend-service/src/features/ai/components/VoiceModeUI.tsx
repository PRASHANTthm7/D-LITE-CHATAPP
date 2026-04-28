"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, Square, Sparkles, Send } from "lucide-react"
import { Button } from "@/shared/ui/primitives/button"
import { formatDuration } from "@/shared/utils/format"

type VoiceState = "idle" | "listening" | "thinking" | "speaking"

const CANNED_RESPONSES = [
  "I can help with that! Here's what I found...",
  "Great question! Let me think through this for you.",
  "Based on your conversation context, I suggest...",
  "I've analyzed the situation. Here are my recommendations...",
]

export function VoiceModeUI({ onToggleMode }: { onToggleMode?: () => void }) {
  const [state, setState] = React.useState<VoiceState>("idle")
  const [transcript, setTranscript] = React.useState("")
  const [response, setResponse] = React.useState("")
  const [duration, setDuration] = React.useState(0)
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  const startListening = () => {
    setState("listening")
    setTranscript("")
    setResponse("")
    setDuration(0)
    intervalRef.current = setInterval(() => setDuration((d) => d + 1), 1000)

    // Simulate transcript appearing
    const words = ["How", "can", "I", "help", "improve", "my", "message", "tone?"]
    let i = 0
    const wordTimer = setInterval(() => {
      setTranscript((prev) => prev + (i > 0 ? " " : "") + words[i])
      i++
      if (i >= words.length) {
        clearInterval(wordTimer)
        stopListening()
      }
    }, 200)
  }

  const stopListening = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setState("thinking")
    setTimeout(() => {
      setState("speaking")
      setResponse(CANNED_RESPONSES[Math.floor(Math.random() * CANNED_RESPONSES.length)])
      setTimeout(() => setState("idle"), 4000)
    }, 1500)
  }

  const orbColor = {
    idle: "from-surface-3 to-surface-2",
    listening: "from-orange-500 via-pink-500 to-purple-500",
    thinking: "from-purple-500 to-blue-500",
    speaking: "from-orange-500 to-pink-500",
  }[state]

  const orbScale = state !== "idle" ? [1, 1.08, 1] : [1, 1.02, 1]

  return (
    <div className="flex flex-col h-full items-center justify-between p-8">
      {/* Orb */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <motion.div
          className={`w-36 h-36 rounded-full bg-gradient-to-br ${orbColor} shadow-2xl cursor-pointer`}
          animate={{ scale: orbScale }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          onClick={state === "idle" ? startListening : stopListening}
          style={{ boxShadow: state !== "idle" ? "0 0 40px rgba(249,115,22,0.5)" : undefined }}
        />

        <p className="text-sm text-text-tertiary font-medium">
          {state === "idle" && "Tap to talk"}
          {state === "listening" && "Listening..."}
          {state === "thinking" && "Thinking..."}
          {state === "speaking" && "Speaking..."}
        </p>

        {transcript && (
          <div className="max-w-xs text-center">
            <p className="text-sm text-text-secondary italic">"{transcript}"</p>
            {state === "listening" && (
              <p className="text-xs text-text-tertiary mt-1">{formatDuration(duration)}</p>
            )}
          </div>
        )}

        {response && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xs text-center glass px-4 py-3 rounded-2xl"
          >
            <p className="text-sm text-text-primary">{response}</p>
          </motion.div>
        )}
      </div>

      {/* Bottom button */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={state === "idle" ? startListening : stopListening}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl transition-all ${
            state === "listening"
              ? "bg-gradient-to-br from-danger to-red-700 scale-110"
              : "bg-gradient-to-br from-orange-500 to-pink-500"
          }`}
        >
          {state === "listening" ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>
        {onToggleMode && (
          <button onClick={onToggleMode} className="text-xs text-text-tertiary hover:text-text-primary transition-colors flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Switch to text mode
          </button>
        )}
      </div>
    </div>
  )
}
