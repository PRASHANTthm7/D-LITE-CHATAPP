import React from "react";
import { Greeting } from "@/features/dashboard/components/Greeting";
import { StatRow } from "@/features/dashboard/components/StatRow";
import { RecentChatsGrid } from "@/features/dashboard/components/RecentChatsGrid";
import { ActiveGroupsCard } from "@/features/dashboard/components/ActiveGroupsCard";
import { RecentCallsCard } from "@/features/dashboard/components/RecentCallsCard";

export default function DashboardPage() {
  return (
    <div className="p-8 lg:px-12 max-w-7xl mx-auto w-full">
      <Greeting name="Aarav" />
      <StatRow />
      <RecentChatsGrid />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ActiveGroupsCard />
        <RecentCallsCard />
      </div>
    </div>
  );
}
