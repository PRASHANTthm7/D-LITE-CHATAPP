"use client";

import { useEffect, useRef, useState } from "react";
import { AssistantMessage } from "./AssistantMessage";
import { AssistantSuggestions } from "./AssistantSuggestions";
import { Sparkles, Send, Mic, Paperclip } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";

export function AssistantChat() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  const [messages] = useState([
    { id: "1", role: "assistant" as const, content: "Hi there! I'm your Special Friend. I can help you draft messages, translate text, summarize long group catch-ups, or answer questions. How can I assist you today?" },
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col">
        {messages.map(msg => (
          <AssistantMessage key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 md:p-8 pt-0">
        <AssistantSuggestions />
        
        <div className="relative flex items-end gap-2 bg-surface-2/80 backdrop-blur-md p-2 rounded-3xl border border-border-default focus-within:border-[#a855f7]/50 focus-within:shadow-[0_0_15px_rgba(168,85,247,0.1)] transition-all">
          <Button variant="ghost" size="icon" className="h-12 w-12 shrink-0 rounded-full text-text-secondary hover:text-[#a855f7] transition-colors">
            <Paperclip className="w-5 h-5" />
          </Button>
          
          <textarea 
            className="flex-1 max-h-40 min-h-[48px] bg-transparent resize-none outline-none py-3 px-2 text-sm leading-relaxed"
            placeholder="Ask me anything..."
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="flex items-center gap-1 mb-1 mr-1">
            <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 rounded-full text-text-secondary hover:text-[#a855f7] transition-colors">
              <Mic className="w-5 h-5" />
            </Button>
            <Button 
              size="icon" 
              className={`h-10 w-10 shrink-0 rounded-full transition-all ${input.trim() ? 'bg-gradient-to-r from-[#a855f7] to-brand-primary text-white shadow-lg shadow-[#a855f7]/30 hover:scale-105' : 'bg-surface-3 text-text-tertiary'}`}
            >
              {input.trim() ? <Send className="w-4 h-4 ml-0.5" /> : <Sparkles className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        <p className="text-center text-[10px] text-text-tertiary mt-3">
          Special Friend can make mistakes. Consider verifying important information.
        </p>
      </div>
    </div>
  );
}
