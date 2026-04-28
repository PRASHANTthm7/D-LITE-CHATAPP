import { PhoneCall } from "lucide-react";

export default function CallsIndexPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-success/10 mb-6">
        <PhoneCall className="h-10 w-10 text-success" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Call History</h2>
      <p className="text-text-secondary max-w-sm">
        Start a new call from a chat or view your recent calls here.
      </p>
    </div>
  );
}
