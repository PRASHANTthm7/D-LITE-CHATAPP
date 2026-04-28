"use client"

import { ToastProvider } from "@/core/notifications/toast-context"
import { ConfirmProvider } from "@/shared/hooks/use-confirm"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <ConfirmProvider>
        {children}
      </ConfirmProvider>
    </ToastProvider>
  )
}
