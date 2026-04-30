"use client";

import React, { useState } from "react";
import { AIHistorySidebar } from "@/features/ai/components/AIHistorySidebar";
import { AIHeader } from "@/features/ai/components/AIHeader";
import { AIMessage } from "@/features/ai/components/AIMessage";
import { ActionItem } from "@/features/ai/components/ActionItem";
import { AIActions } from "@/features/ai/components/AIActions";
import { SuggestionChip } from "@/features/ai/components/SuggestionChip";
import { AIComposer } from "@/features/ai/components/AIComposer";
import { ShimmerText } from "@/features/ai/components/ShimmerText";
import { MessageBubble } from "@/features/chat/components/MessageBubble";
import { Sparkles } from "lucide-react";

export default function AIPage() {
  const [messages, setMessages] = useState<{ id: string, type: "user" | "ai", content?: string, isThinking?: boolean }[]>([]);
  const [composerVal, setComposerVal] = useState("");

  const handleSend = (text: string) => {
    const userMsgId = Date.now().toString();
    setMessages(prev => [...prev, { id: userMsgId, type: "user", content: text }]);
    
    // Simulate thinking state
    const aiThinkingId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: aiThinkingId, type: "ai", isThinking: true }]);

    // Resolve after 1.5s
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === aiThinkingId ? { id: aiThinkingId, type: "ai", isThinking: false } : m));
    }, 1500);
  };

  const suggestions = [
    { emoji: "📊", label: "Summarize active groups" },
    { emoji: "✍️", label: "Draft a polite decline" },
    { emoji: "🔍", label: "Find unread messages" }
  ];

  return (
    <div className="flex h-full w-full overflow-hidden bg-canvas">
      <AIHistorySidebar />
      <div className="flex-1 flex flex-col h-full relative z-0">
        <AIHeader />
        
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth custom-scrollbar flex flex-col items-center">
          <div className="w-full max-w-4xl">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[50vh] animate-in fade-in zoom-in-95 duration-500">
                <div className="w-16 h-16 rounded-2xl brand-grad flex items-center justify-center shadow-accent text-white mb-6">
                  <Sparkles size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">How can I help you today?</h2>
                <div className="flex flex-wrap justify-center gap-3 mt-8">
                  {suggestions.map((s, i) => (
                    <SuggestionChip 
                      key={i} 
                      emoji={s.emoji} 
                      label={s.label} 
                      onClick={() => setComposerVal(s.label)} 
                    />
                  ))}
                </div>
              </div>
            ) : (
              messages.map(m => (
                <div key={m.id}>
                  {m.type === "user" && (
                    <MessageBubble id={m.id} direction="out" content={m.content || ""} time="Just now" status="read" />
                  )}
                  {m.type === "ai" && m.isThinking && (
                    <div className="flex gap-4 w-full mb-6">
                      <div className="w-8 h-8 rounded-full brand-grad flex items-center justify-center text-white shrink-0 mt-1 shadow-sm">
                        <Sparkles size={14} />
                      </div>
                      <div className="flex items-center text-sm pt-2">
                        <ShimmerText text="thinking..." className="lowercase" />
                      </div>
                    </div>
                  )}
                  {m.type === "ai" && !m.isThinking && (
                    <AIMessage>
                      <p className="mb-4">Here is the summarized information you requested:</p>
                      <ActionItem num={1} title="Check Engineering updates" desc="Priya merged the PR and requested review on staging." colorClass="border-brand-500" />
                      <ActionItem num={2} title="Design Sync" desc="New Figma links were shared by Sneha yesterday." colorClass="border-accent-pink" />
                      <ActionItem num={3} title="Missed Call" desc="Tanvi tried to reach you yesterday at 4:15 PM." colorClass="border-accent-purple" />
                      <AIActions />
                    </AIMessage>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <AIComposer value={composerVal} onChange={setComposerVal} onSend={handleSend} />
      </div>
    </div>
  );
}
