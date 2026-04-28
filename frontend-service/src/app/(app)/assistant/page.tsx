import { AssistantChat } from "@/features/ai/components/AssistantChat";
import { Sparkles } from "lucide-react";

export default function AssistantPage() {
  return (
    <div className="flex h-full w-full bg-surface-1 relative overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#a855f7] rounded-full mix-blend-multiply filter blur-[100px] animate-blob" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-primary rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000" />
      </div>

      <div className="flex-1 flex flex-col h-full max-w-4xl mx-auto relative z-10 shadow-2xl border-x border-border-default bg-surface-1/50 backdrop-blur-3xl">
        <div className="h-16 border-b border-border-default/50 flex items-center justify-center px-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#a855f7]" />
            <h1 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-[#a855f7] to-brand-primary">Special Friend</h1>
          </div>
        </div>
        
        <AssistantChat />
      </div>
    </div>
  );
}
