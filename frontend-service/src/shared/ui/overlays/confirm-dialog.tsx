"use client"

import * as React from "react"
import { Modal } from "./modal"
import { Button } from "@/shared/ui/primitives/button"

interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: "default" | "danger"
  loading?: boolean
}

function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  loading,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      {description && (
        <p className="text-sm text-text-secondary mb-6">{description}</p>
      )}
      <div className="flex gap-3 justify-end">
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          {cancelText}
        </Button>
        <Button
          variant={variant === "danger" ? "danger" : "default"}
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "..." : confirmText}
        </Button>
      </div>
    </Modal>
  )
}

export { ConfirmDialog }
