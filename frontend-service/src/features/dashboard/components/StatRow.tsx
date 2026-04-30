import React from "react";
import { MessageSquare, Users, PhoneCall, Zap } from "lucide-react";
import { StatCard } from "./StatCard";

export function StatRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        label="Messages sent"
        value={1420}
        delta={12}
        icon={<MessageSquare size={20} />}
        iconColorClass="text-brand-500"
      />
      <StatCard
        label="Active calls"
        value={14}
        delta={-2}
        icon={<PhoneCall size={20} />}
        iconColorClass="text-accent-pink"
      />
      <StatCard
        label="Group members"
        value={285}
        delta={5}
        icon={<Users size={20} />}
        iconColorClass="text-accent-purple"
      />
      <StatCard
        label="AI tasks completed"
        value={89}
        delta={24}
        icon={<Zap size={20} />}
        iconColorClass="text-success"
      />
    </div>
  );
}
