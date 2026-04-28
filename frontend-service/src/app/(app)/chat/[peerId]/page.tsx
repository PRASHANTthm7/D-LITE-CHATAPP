import { ChatConversation } from "@/features/chat/components/ChatConversation"

export default async function ChatThreadPage({ params }: { params: Promise<{ peerId: string }> }) {
  const resolvedParams = await params
  return <ChatConversation peerId={resolvedParams.peerId} />
}

