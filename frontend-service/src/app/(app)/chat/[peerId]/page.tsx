import { ChatHeader } from "@/features/chat/components/ChatHeader";
import { MessageThread } from "@/features/chat/components/MessageThread";
import { Composer } from "@/features/chat/components/Composer";

export default async function ChatThreadPage({ params }: { params: Promise<{ peerId: string }> }) {
  const resolvedParams = await params;
  return (
    <div className="flex flex-col h-full w-full relative">
      <ChatHeader peerId={resolvedParams.peerId} />
      <MessageThread peerId={resolvedParams.peerId} />
      <Composer />
    </div>
  );
}
