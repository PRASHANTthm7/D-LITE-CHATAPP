"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn, ZoomOut, Download, ChevronLeft, ChevronRight } from "lucide-react"

interface ImageLightboxProps {
  images: string[]
  startIndex?: number
  open: boolean
  onClose: () => void
}

export function ImageLightbox({ images, startIndex = 0, open, onClose }: ImageLightboxProps) {
  const [index, setIndex] = React.useState(startIndex)
  const [zoom, setZoom] = React.useState(1)

  React.useEffect(() => {
    setIndex(startIndex)
    setZoom(1)
  }, [startIndex, open])

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1))
      if (e.key === "ArrowRight") setIndex((i) => Math.min(images.length - 1, i + 1))
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, images.length, onClose])

  if (!open || images.length === 0) return null

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black/95">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 h-14 z-10">
        <span className="text-white/60 text-sm">{index + 1} / {images.length}</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setZoom((z) => Math.min(z + 0.5, 4))} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button onClick={() => setZoom((z) => Math.max(z - 0.5, 0.5))} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <ZoomOut className="w-4 h-4" />
          </button>
          <a href={images[index]} download className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <Download className="w-4 h-4" />
          </a>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="flex-1 flex items-center justify-center relative" onClick={onClose}>
        <AnimatePresence mode="popLayout">
          <motion.img
            key={index}
            src={images[index]}
            alt={`Image ${index + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            style={{ transform: `scale(${zoom})`, cursor: zoom > 1 ? "zoom-out" : "default" }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: zoom }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setIndex((i) => Math.max(0, i - 1)) }}
              className="absolute left-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-30"
              disabled={index === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setIndex((i) => Math.min(images.length - 1, i + 1)) }}
              className="absolute right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-30"
              disabled={index === images.length - 1}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
