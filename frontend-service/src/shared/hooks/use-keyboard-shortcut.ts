"use client"

import { useEffect } from "react"

type ModifierKey = "meta" | "ctrl" | "shift" | "alt"

export function useKeyboardShortcut(
  shortcut: string,
  callback: (e: KeyboardEvent) => void,
  options: { enabled?: boolean } = {}
) {
  const { enabled = true } = options

  useEffect(() => {
    if (!enabled) return

    const parts = shortcut.toLowerCase().split("+")
    const key = parts[parts.length - 1]
    const modifiers: ModifierKey[] = parts.slice(0, -1) as ModifierKey[]

    const handler = (e: KeyboardEvent) => {
      const metaOrCtrl = modifiers.includes("meta") || modifiers.includes("ctrl")
        ? e.metaKey || e.ctrlKey
        : true
      const shift = modifiers.includes("shift") ? e.shiftKey : !e.shiftKey || modifiers.length === 0
      const alt = modifiers.includes("alt") ? e.altKey : true

      if (
        e.key.toLowerCase() === key &&
        (modifiers.includes("meta") || modifiers.includes("ctrl") ? e.metaKey || e.ctrlKey : true) &&
        (modifiers.includes("shift") ? e.shiftKey : true) &&
        (modifiers.includes("alt") ? e.altKey : true)
      ) {
        e.preventDefault()
        callback(e)
      }
    }

    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [shortcut, callback, enabled])
}
