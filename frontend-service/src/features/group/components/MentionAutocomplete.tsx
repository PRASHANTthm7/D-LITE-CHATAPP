"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar } from "@/shared/ui/primitives/avatar"
import { RoleBadge } from "./RoleBadge"

interface Member {
  id: string
  name: string
  username: string
  role: "Owner" | "Admin" | "Moderator" | "Member"
  online: boolean
}

interface MentionAutocompleteProps {
  query: string
  members: Member[]
  onSelect: (username: string) => void
  onClose: () => void
}

export function MentionAutocomplete({ query, members, onSelect, onClose }: MentionAutocompleteProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.username.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 6)

  React.useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1)) }
      if (e.key === "ArrowUp")   { e.preventDefault(); setSelectedIndex((i) => Math.max(i - 1, 0)) }
      if (e.key === "Enter")     { e.preventDefault(); if (filtered[selectedIndex]) onSelect(filtered[selectedIndex].username) }
      if (e.key === "Escape")    { onClose() }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [filtered, selectedIndex, onSelect, onClose])

  if (filtered.length === 0) return null

  return (
    <motion.div
      className="absolute bottom-full left-3 mb-2 z-50 w-72 rounded-xl border border-border-default bg-surface-1 shadow-xl py-2 overflow-hidden"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.15 }}
    >
      <div className="px-3 py-1 mb-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary">Mention members</span>
      </div>
      {filtered.map((member, i) => (
        <button
          key={member.id}
          className={`flex items-center gap-2.5 w-full px-3 py-2 text-left transition-colors ${i === selectedIndex ? "bg-brand-primary-soft/30" : "hover:bg-surface-2"}`}
          onClick={() => onSelect(member.username)}
          onMouseEnter={() => setSelectedIndex(i)}
        >
          <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} status={member.online ? "online" : undefined} size="sm" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-text-primary">{member.name}</span>
              <RoleBadge role={member.role} />
            </div>
            <p className="text-xs text-text-tertiary">@{member.username}</p>
          </div>
        </button>
      ))}
    </motion.div>
  )
}
