"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, BarChart2, X, Clock } from "lucide-react"
import { Modal } from "@/shared/ui/overlays/modal"
import { Button } from "@/shared/ui/primitives/button"
import { Toggle } from "@/shared/ui/primitives/toggle"

interface PollComposerProps {
  open: boolean
  onClose: () => void
  onCreate?: (poll: PollData) => void
}

interface PollData {
  question: string
  options: string[]
  allowMultiple: boolean
  duration: string
}

const DURATIONS = ["1h", "6h", "24h", "7d", "No expiry"]

export function PollComposer({ open, onClose, onCreate }: PollComposerProps) {
  const [question, setQuestion] = React.useState("")
  const [options, setOptions] = React.useState(["", ""])
  const [allowMultiple, setAllowMultiple] = React.useState(false)
  const [duration, setDuration] = React.useState("24h")

  const addOption = () => setOptions((prev) => prev.length < 6 ? [...prev, ""] : prev)
  const removeOption = (i: number) => setOptions((prev) => prev.filter((_, idx) => idx !== i))
  const updateOption = (i: number, val: string) => setOptions((prev) => prev.map((o, idx) => idx === i ? val : o))

  const handleCreate = () => {
    if (!question.trim()) return
    const validOptions = options.filter((o) => o.trim())
    if (validOptions.length < 2) return
    onCreate?.({ question: question.trim(), options: validOptions, allowMultiple, duration })
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Create Poll" className="max-w-lg">
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1.5 block">Question</label>
          <textarea
            className="w-full rounded-lg border border-border-default bg-surface-2 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary"
            rows={2}
            maxLength={200}
            placeholder="Ask your group something..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <p className="text-xs text-text-tertiary text-right mt-1">{question.length}/200</p>
        </div>

        <div>
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2 block">Options</label>
          <div className="space-y-2">
            {options.map((opt, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className="flex-1 h-10 rounded-lg border border-border-default bg-surface-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => updateOption(i, e.target.value)}
                />
                {options.length > 2 && (
                  <button onClick={() => removeOption(i)} className="w-10 h-10 rounded-lg border border-border-default flex items-center justify-center text-text-tertiary hover:text-danger hover:border-danger transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {options.length < 6 && (
            <button onClick={addOption} className="mt-2 flex items-center gap-1.5 text-sm text-brand-primary hover:underline">
              <Plus className="w-4 h-4" /> Add option
            </button>
          )}
        </div>

        <div className="flex items-center justify-between py-3 border-t border-border-subtle">
          <div>
            <p className="text-sm font-medium text-text-primary">Allow multiple votes</p>
            <p className="text-xs text-text-tertiary">Members can select more than one option</p>
          </div>
          <Toggle checked={allowMultiple} onCheckedChange={setAllowMultiple} />
        </div>

        <div>
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2 block">Duration</label>
          <div className="flex gap-2 flex-wrap">
            {DURATIONS.map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${duration === d ? "border-brand-primary bg-brand-primary-soft text-brand-primary" : "border-border-default text-text-secondary hover:bg-surface-2"}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2 border-t border-border-subtle">
          <Button variant="secondary" onClick={onClose} className="flex-1">Cancel</Button>
          <Button onClick={handleCreate} className="flex-1" disabled={!question.trim() || options.filter(Boolean).length < 2}>
            <BarChart2 className="w-4 h-4 mr-1.5" /> Create Poll
          </Button>
        </div>
      </div>
    </Modal>
  )
}
