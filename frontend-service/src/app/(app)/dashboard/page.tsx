import { Greeting } from "@/features/dashboard/components/Greeting";
import { StatRow } from "@/features/dashboard/components/StatRow";
import { RecentChatsGrid } from "@/features/dashboard/components/RecentChatsGrid";
import { ActiveGroupsCard } from "@/features/dashboard/components/ActiveGroupsCard";
import { RecentCallsCard } from "@/features/dashboard/components/RecentCallsCard";
import { getUser } from "@/core/auth/get-user";

export default async function DashboardPage() {
  const user = await getUser();
  const fullName = user?.user_metadata?.full_name as string | undefined;
  const firstName = fullName?.split(" ")[0] ?? user?.email?.split("@")[0] ?? "there";

  return (
    <div className="p-8 lg:px-12 max-w-7xl mx-auto w-full">
      <Greeting name={firstName} />
      <StatRow />
      <RecentChatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ActiveGroupsCard />
        <RecentCallsCard />
      </div>
    </div>
  );
}
