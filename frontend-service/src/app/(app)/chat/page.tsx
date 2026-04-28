import { MessageCircle } from "lucide-react";

export default function ChatIndexPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-primary-soft mb-6">
        <MessageCircle className="h-10 w-10 text-brand-primary" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Your Messages</h2>
      <p className="text-text-secondary max-w-sm">
        Select a conversation from the sidebar or start a new chat to begin messaging.
      </p>
    </div>
  );
}
