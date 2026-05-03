"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/core/auth/supabase-client"

export interface GroupListItem {
  id: string
  name: string
  initials: string
  lastMessage: string
  time: string
  unreadCount: number
}

export function useGroupList() {
  const [groups, setGroups] = useState<GroupListItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      const { data: memberships } = await supabase
        .from("group_members")
        .select(`
          group:groups(
            id, name,
            messages:group_messages(content, created_at)
          )
        `)
        .eq("user_id", user.id)

      if (!memberships) { setLoading(false); return }

      const items: GroupListItem[] = (memberships as any[]).flatMap((m) => {
        const g = m.group
        if (!g) return []
        const name: string = g.name || "Unnamed Group"
        const initials = name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()
        const sorted = [...(g.messages || [])].sort(
          (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        const last = sorted[0]
        return [{
          id: g.id,
          name,
          initials,
          lastMessage: last?.content || "No messages yet",
          time: last ? new Date(last.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "",
          unreadCount: 0,
        }]
      })

      setGroups(items)
      setLoading(false)
    }

    load()

    const channel = supabase
      .channel("group_list_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "group_messages" }, load)
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  return { groups, loading }
}
