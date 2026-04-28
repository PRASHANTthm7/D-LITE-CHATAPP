"use client"

import * as React from "react"
import { Copy, Check } from "lucide-react"

const MOCK_CODES = ["AKZS-M3PD", "T7GN-2QXL", "BR4H-JWPY", "XQ9V-CDLT", "SZNR-8MFE", "PH6W-K2YA", "VM3J-DNQX", "CL7E-PBGS"]

export function RecoveryCodes() {
  const [copied, setCopied] = React.useState(false)

  const copyAll = () => {
    navigator.clipboard.writeText(MOCK_CODES.join("\n"))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const download = () => {
    const blob = new Blob([MOCK_CODES.join("\n")], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = "dlite-recovery-codes.txt"; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="px-3 py-2.5 rounded-lg bg-warning/10 border border-warning/20">
        <p className="text-xs text-warning font-medium">⚠️ Each code works only once. Store them somewhere safe.</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {MOCK_CODES.map((code) => (
          <div key={code} className="font-mono text-sm text-text-primary bg-surface-2 px-3 py-2 rounded-lg border border-border-subtle text-center tracking-wider">
            {code}
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={copyAll}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-default text-sm text-text-secondary hover:bg-surface-2 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied!" : "Copy all"}
        </button>
        <button onClick={download} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-default text-sm text-text-secondary hover:bg-surface-2 transition-colors">
          Download .txt
        </button>
        <button onClick={() => window.print()} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-default text-sm text-text-secondary hover:bg-surface-2 transition-colors">
          Print
        </button>
      </div>
    </div>
  )
}
