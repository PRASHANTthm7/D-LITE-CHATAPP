import { ChatListSidebar } from "@/features/chat/components/ChatListSidebar";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full overflow-hidden bg-canvas">
      <ChatListSidebar />
      <div className="flex-1 flex flex-col h-full relative">
        {children}
      </div>
    </div>
  );
}
