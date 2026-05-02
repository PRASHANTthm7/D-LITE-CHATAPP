import { MessageSquare, Users, PhoneCall, Zap } from "lucide-react";
import { StatCard } from "./StatCard";
import { createClient } from "@/core/auth/supabase-server";
import { getUser } from "@/core/auth/get-user";

export async function StatRow() {
  const user = await getUser();
  let messages = 0, groups = 0, calls = 0;

  if (user) {
    const supabase = await createClient();
    const [msgRes, groupRes, callRes] = await Promise.all([
      supabase
        .from("direct_messages")
        .select("id", { count: "exact", head: true })
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`),
      supabase
        .from("group_members")
        .select("group_id", { count: "exact", head: true })
        .eq("user_id", user.id),
      supabase
        .from("calls")
        .select("id", { count: "exact", head: true })
        .or(`caller_id.eq.${user.id},receiver_id.eq.${user.id}`),
    ]);
    messages = msgRes.count ?? 0;
    groups = groupRes.count ?? 0;
    calls = callRes.count ?? 0;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard label="Messages sent" value={messages} delta={0} icon={<MessageSquare size={20} />} iconColorClass="text-brand-500" />
      <StatCard label="Active calls" value={calls} delta={0} icon={<PhoneCall size={20} />} iconColorClass="text-accent-pink" />
      <StatCard label="Groups joined" value={groups} delta={0} icon={<Users size={20} />} iconColorClass="text-accent-purple" />
      <StatCard label="AI tasks completed" value={0} delta={0} icon={<Zap size={20} />} iconColorClass="text-success" />
    </div>
  );
}
