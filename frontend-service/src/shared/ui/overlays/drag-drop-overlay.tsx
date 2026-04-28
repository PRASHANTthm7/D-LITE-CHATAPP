"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { UploadCloud } from "lucide-react"

export function DragDropOverlay({ onFiles }: { onFiles?: (files: File[]) => void }) {
  const [active, setActive] = React.useState(false)
  const counter = React.useRef(0)

  React.useEffect(() => {
    const onEnter = (e: DragEvent) => {
      if (!e.dataTransfer?.types.includes("Files")) return
      counter.current++
      setActive(true)
    }
    const onLeave = () => {
      counter.current = Math.max(0, counter.current - 1)
      if (counter.current === 0) setActive(false)
    }
    const onDrop = (e: DragEvent) => {
      e.preventDefault()
      counter.current = 0
      setActive(false)
      const files = Array.from(e.dataTransfer?.files ?? [])
      if (files.length > 0) onFiles?.(files)
    }
    const onOver = (e: DragEvent) => { e.preventDefault() }

    window.addEventListener("dragenter", onEnter)
    window.addEventListener("dragleave", onLeave)
    window.addEventListener("drop", onDrop)
    window.addEventListener("dragover", onOver)
    return () => {
      window.removeEventListener("dragenter", onEnter)
      window.removeEventListener("dragleave", onLeave)
      window.removeEventListener("drop", onDrop)
      window.removeEventListener("dragover", onOver)
    }
  }, [onFiles])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-4 pointer-events-none"
          style={{ background: "rgba(234,88,12,0.08)", backdropFilter: "blur(4px)" }}
        >
          <div className="rounded-3xl border-2 border-dashed border-brand-primary bg-brand-primary-soft/30 p-12 flex flex-col items-center gap-4 shadow-xl">
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <UploadCloud className="w-16 h-16 text-brand-primary" />
            </motion.div>
            <h3 className="text-2xl font-bold text-brand-primary">Drop files to send</h3>
            <p className="text-sm text-text-secondary text-center">Images, videos, PDFs · up to 25 MB each</p>
            <div className="flex gap-2">
              {["Photos", "Videos", "Files"].map((type) => (
                <span key={type} className="px-3 py-1 rounded-full bg-brand-primary-soft text-brand-primary text-xs font-medium">
                  {type}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
