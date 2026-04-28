"use client"

import * as React from "react"
import { UploadCloud, X } from "lucide-react"
import { cn } from "@/shared/utils/cn"

interface AvatarDropzoneProps {
  value?: File | null
  onChange?: (file: File | null) => void
  className?: string
}

export function AvatarDropzone({ value, onChange, className }: AvatarDropzoneProps) {
  const [preview, setPreview] = React.useState<string | null>(null)
  const [dragging, setDragging] = React.useState(false)
  const [error, setError] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (!value) { setPreview(null); return }
    const url = URL.createObjectURL(value)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [value])

  const processFile = (file: File) => {
    setError("")
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File must be less than 5MB")
      return
    }
    onChange?.(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "relative w-24 h-24 rounded-full border-2 border-dashed transition-all overflow-hidden",
          dragging ? "border-brand-primary bg-brand-primary-soft/30 scale-105" : "border-border-default hover:border-brand-primary hover:bg-surface-2"
        )}
      >
        {preview ? (
          <img src={preview} alt="Avatar preview" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-text-tertiary gap-1">
            <UploadCloud className="w-6 h-6" />
            <span className="text-[10px]">Upload</span>
          </div>
        )}
        {preview && (
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-xs font-medium">Change</span>
          </div>
        )}
      </button>

      {preview && (
        <button
          type="button"
          onClick={() => { onChange?.(null); setPreview(null) }}
          className="text-xs text-danger hover:underline flex items-center gap-1"
        >
          <X className="w-3 h-3" /> Remove
        </button>
      )}

      {error && <p className="text-xs text-danger text-center">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  )
}
