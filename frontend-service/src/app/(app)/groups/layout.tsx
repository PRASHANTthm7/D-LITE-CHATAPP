import { GroupListSidebar } from "@/features/group/components/GroupListSidebar";

export default function GroupsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full overflow-hidden bg-canvas">
      <GroupListSidebar />
      <div className="flex-1 flex flex-col h-full relative">
        {children}
      </div>
    </div>
  );
}
