import { VoiceCallUI } from "@/features/call/components/VoiceCallUI";

export default async function CallRoomPage({ params }: { params: Promise<{ roomId: string }> }) {
  const resolvedParams = await params;
  
  return (
    <div className="flex h-full w-full bg-surface-1">
       <VoiceCallUI roomId={resolvedParams.roomId} />
    </div>
  );
}
