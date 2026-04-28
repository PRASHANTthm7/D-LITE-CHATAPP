"use client"

import * as React from "react"
import { Smile, Mic, Send, BarChart2, Plus } from "lucide-react"
import { Button } from "@/shared/ui/primitives/button"
import { MentionAutocomplete } from "./MentionAutocomplete"
import { PollComposer } from "./PollComposer"
import { AnimatePresence } from "framer-motion"

const MOCK_MEMBERS = [
  { id: "1", name: "Alice Smith", username: "alice", role: "Owner" as const, online: true },
  { id: "2", name: "Bob Johnson", username: "bob", role: "Admin" as const, online: true },
  { id: "3", name: "Charlie Davis", username: "charlie", role: "Member" as const, online: false },
  { id: "4", name: "Diana Prince", username: "diana", role: "Member" as const, online: true },
]

export function GroupComposer() {
  const [message, setMessage] = React.useState("")
  const [showPoll, setShowPoll] = React.useState(false)
  const [mentionQuery, setMentionQuery] = React.useState<string | null>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setMessage(val)
    const cursor = e.target.selectionStart
    const textBefore = val.substring(0, cursor)
    const match = textBefore.match(/@(\w*)$/)
    setMentionQuery(match ? match[1] : null)
  }

  const insertMention = (username: string) => {
    const cursor = textareaRef.current?.selectionStart ?? message.length
    const before = message.substring(0, cursor).replace(/@\w*$/, "")
    setMessage(`${before}@${username} `)
    setMentionQuery(null)
    textareaRef.current?.focus()
  }

  const handleSend = () => {
    if (!message.trim()) return
    setMessage("")
  }

  return (
    <div className="p-4 bg-surface-1 border-t border-border-default relative">
      <AnimatePresence>
        {mentionQuery !== null && (
          <MentionAutocomplete
            query={mentionQuery}
            members={MOCK_MEMBERS}
            onSelect={insertMention}
            onClose={() => setMentionQuery(null)}
          />
        )}
      </AnimatePresence>

      <div className="flex items-end gap-2 bg-surface-2 p-2 rounded-2xl border border-border-default focus-within:border-brand-primary transition-colors shadow-sm">
        <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 rounded-full text-text-secondary">
          <Plus className="w-5 h-5" />
        </Button>

        <textarea
          ref={textareaRef}
          className="flex-1 max-h-32 min-h-[40px] bg-transparent resize-none outline-none py-2 px-2 text-sm"
          placeholder="Message group... (Use @ to mention)"
          rows={1}
          value={message}
          onChange={handleInput}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
        />

        {message.trim().length === 0 ? (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost" size="icon"
              className="h-10 w-10 shrink-0 rounded-full text-brand-primary hover:bg-brand-primary-soft"
              onClick={() => setShowPoll(true)}
            >
              <BarChart2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 rounded-full text-text-secondary">
              <Smile className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 rounded-full text-text-secondary">
              <Mic className="w-5 h-5" />
            </Button>
          </div>
        ) : (
          <Button
            size="icon"
            className="h-10 w-10 shrink-0 rounded-full bg-brand-gradient shadow-accent text-white hover:scale-105"
            onClick={handleSend}
          >
            <Send className="w-4 h-4 ml-0.5" />
          </Button>
        )}
      </div>

      <PollComposer open={showPoll} onClose={() => setShowPoll(false)} />
    </div>
  )
}
