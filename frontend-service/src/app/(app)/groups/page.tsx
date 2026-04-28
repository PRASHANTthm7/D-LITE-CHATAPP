import { Users } from "lucide-react";

export default function GroupIndexPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-info/10 mb-6">
        <Users className="h-10 w-10 text-info" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Group Conversations</h2>
      <p className="text-text-secondary max-w-sm">
        Select a group from the sidebar or create a new one to collaborate with your team.
      </p>
    </div>
  );
}
