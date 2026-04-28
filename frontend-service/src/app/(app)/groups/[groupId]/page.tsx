import { GroupHeader } from "@/features/group/components/GroupHeader";
import { GroupMessageThread } from "@/features/group/components/GroupMessageThread";
import { GroupComposer } from "@/features/group/components/GroupComposer";
import { MembersPanel } from "@/features/group/components/MembersPanel";
import { SummaryCard } from "@/features/ai/components/SummaryCard";

export default async function GroupThreadPage({ params }: { params: Promise<{ groupId: string }> }) {
  const resolvedParams = await params;
  return (
    <div className="flex h-full w-full relative overflow-hidden">
      <div className="flex-1 flex flex-col h-full relative">
        <GroupHeader groupId={resolvedParams.groupId} />
        <SummaryCard />
        <GroupMessageThread groupId={resolvedParams.groupId} />
        <GroupComposer />
      </div>
      <MembersPanel groupId={resolvedParams.groupId} />
    </div>
  );
}
