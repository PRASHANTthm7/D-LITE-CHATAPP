"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { ConfirmDialog } from "@/shared/ui/overlays/confirm-dialog"

interface ConfirmOptions {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: "default" | "danger"
}

interface ConfirmContextValue {
  confirm: (opts: ConfirmOptions) => Promise<boolean>
}

const ConfirmContext = React.createContext<ConfirmContextValue | null>(null)

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<(ConfirmOptions & { resolve: (v: boolean) => void }) | null>(null)

  const confirm = React.useCallback((opts: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({ ...opts, resolve })
    })
  }, [])

  const handleClose = () => {
    state?.resolve(false)
    setState(null)
  }

  const handleConfirm = () => {
    state?.resolve(true)
    setState(null)
  }

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <ConfirmDialog
        open={!!state}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title={state?.title ?? ""}
        description={state?.description}
        confirmText={state?.confirmText}
        cancelText={state?.cancelText}
        variant={state?.variant}
      />
    </ConfirmContext.Provider>
  )
}

export function useConfirm() {
  const ctx = React.useContext(ConfirmContext)
  if (!ctx) throw new Error("useConfirm must be used within ConfirmProvider")
  return ctx.confirm
}
