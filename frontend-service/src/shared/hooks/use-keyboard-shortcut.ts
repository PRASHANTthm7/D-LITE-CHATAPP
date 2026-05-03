"use client"

import { useEffect, useRef } from "react"

type ModifierKey = "meta" | "ctrl" | "shift" | "alt"

export function useKeyboardShortcut(
  shortcut: string,
  callback: (e: KeyboardEvent) => void,
  options: { enabled?: boolean } = {}
) {
  const { enabled = true } = options
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    if (!enabled) return

    const parts = shortcut.toLowerCase().split("+")
    const key = parts[parts.length - 1]
    const modifiers: ModifierKey[] = parts.slice(0, -1) as ModifierKey[]

    const handler = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === key &&
        (modifiers.includes("meta") || modifiers.includes("ctrl") ? e.metaKey || e.ctrlKey : true) &&
        (modifiers.includes("shift") ? e.shiftKey : true) &&
        (modifiers.includes("alt") ? e.altKey : true)
      ) {
        e.preventDefault()
        callbackRef.current(e)
      }
    }

    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [shortcut, enabled])
}
