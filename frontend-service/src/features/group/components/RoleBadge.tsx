"use client"

import { Badge } from "@/shared/ui/primitives/badge"
import { cn } from "@/shared/utils/cn"

type Role = "Owner" | "Admin" | "Moderator" | "Member"

interface RoleBadgeProps {
  role: Role
  className?: string
}

const styles: Record<Role, string> = {
  Owner:     "text-[#a855f7] border-[#a855f7]/30 bg-[#a855f7]/10",
  Admin:     "text-warning border-warning/30 bg-warning/10",
  Moderator: "text-info border-info/30 bg-info/10",
  Member:    "",
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  if (role === "Member") return null
  return (
    <span className={cn(
      "inline-flex items-center text-[8px] font-bold uppercase tracking-wider px-1 py-0.5 rounded border",
      styles[role],
      className
    )}>
      {role}
    </span>
  )
}
