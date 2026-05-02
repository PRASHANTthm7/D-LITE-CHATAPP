import { createClient } from "@/core/auth/supabase-server";
import type { ChatPreview, GroupPreview, CallPreview } from "@/features/dashboard/lib/mock-data";

export async function getRecentConversations(userId: string): Promise<ChatPreview[]> {
  const supabase = await createClient();

  const { data: messages } = await supabase
    .from("direct_messages")
    .select(`
      id, content, created_at, sender_id, receiver_id,
      sender:profiles!direct_messages_sender_id_fkey(id, display_name, username, avatar_url, status),
      receiver:profiles!direct_messages_receiver_id_fkey(id, display_name, username, avatar_url, status)
    `)
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order("created_at", { ascending: false })
    .limit(30);

  if (!messages) return [];

  const seen = new Set<string>();
  const convos: ChatPreview[] = [];

  for (const msg of messages as any[]) {
    const peer = msg.sender_id === userId ? msg.receiver : msg.sender;
    if (!peer || seen.has(peer.id)) continue;
    seen.add(peer.id);

    const name: string = peer.display_name || peer.username || "Unknown";
    const initials = name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();

    convos.push({
      id: peer.id,
      user: { id: peer.id, name, initials, isOnline: peer.status === "Online" },
      lastMessage: msg.content || "",
      time: new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      unreadCount: 0,
    });

    if (convos.length >= 6) break;
  }

  return convos;
}

export async function getActiveGroups(userId: string): Promise<GroupPreview[]> {
  const supabase = await createClient();

  const { data: memberships } = await supabase
    .from("group_members")
    .select(`
      group:groups(
        id, name,
        members:group_members(profile:profiles(id, display_name, username)),
        messages:group_messages(content, created_at, sender:profiles(display_name, username))
      )
    `)
    .eq("user_id", userId)
    .limit(5);

  if (!memberships) return [];

  return (memberships as any[]).flatMap((m) => {
    const g = m.group;
    if (!g) return [];
    const members = (g.members || []).slice(0, 3).flatMap((mem: any) => {
      const p = mem.profile;
      if (!p) return [];
      const name: string = p.display_name || p.username || "?";
      return [{
        id: p.id,
        name,
        initials: name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
        isOnline: false,
      }];
    });

    const sorted = [...(g.messages || [])].sort(
      (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    const lastMsg = sorted[0];

    return {
      id: g.id,
      name: g.name || "Unnamed Group",
      members,
      lastMessage: lastMsg
        ? `${lastMsg.sender?.display_name || lastMsg.sender?.username || "Someone"}: ${lastMsg.content}`
        : "No messages yet",
      time: lastMsg
        ? new Date(lastMsg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "",
      unreadCount: 0,
    };
  });
}

export async function getRecentCalls(userId: string): Promise<CallPreview[]> {
  const supabase = await createClient();

  const { data: calls } = await supabase
    .from("calls")
    .select(`
      id, type, status, started_at, ended_at,
      caller:profiles!calls_caller_id_fkey(id, display_name, username, avatar_url, status),
      receiver:profiles!calls_receiver_id_fkey(id, display_name, username, avatar_url, status)
    `)
    .or(`caller_id.eq.${userId},receiver_id.eq.${userId}`)
    .order("started_at", { ascending: false })
    .limit(10);

  if (!calls) return [];

  return (calls as any[]).map((c) => {
    const peer = c.caller?.id === userId ? c.receiver : c.caller;
    const name: string = peer?.display_name || peer?.username || "Unknown";
    const initials = name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();

    let duration: string | undefined;
    if (c.ended_at && c.started_at) {
      const secs = Math.floor(
        (new Date(c.ended_at).getTime() - new Date(c.started_at).getTime()) / 1000
      );
      duration = `${Math.floor(secs / 60)}m ${secs % 60}s`;
    }

    const callStatus: "missed" | "completed" =
      c.status === "missed" ? "missed" : "completed";

    return {
      id: c.id,
      user: { id: peer?.id || "", name, initials, isOnline: peer?.status === "Online" },
      type: (c.type || "audio") as "audio" | "video",
      status: callStatus,
      duration,
      time:
        new Date(c.started_at).toLocaleDateString([], { month: "short", day: "numeric" }) +
        ", " +
        new Date(c.started_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  });
}
