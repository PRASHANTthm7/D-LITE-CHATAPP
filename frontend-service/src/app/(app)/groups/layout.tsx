import { GroupList } from "@/features/group/components/GroupList";

export default function GroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full overflow-hidden">
      <div className="w-full md:w-[320px] border-r border-border-default bg-surface-1 flex-shrink-0 flex flex-col h-full absolute md:relative z-10 md:z-auto transition-transform">
        <GroupList />
      </div>
      <div className="flex-1 flex flex-col h-full bg-surface-2/30 relative">
        {children}
      </div>
    </div>
  );
}
