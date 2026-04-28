"use client"

import { useToastContext } from "@/core/notifications/toast-context"
import type { ToastOptions } from "@/core/notifications/toast-context"

export function useToast() {
  const { showToast } = useToastContext()
  return { toast: showToast }
}
