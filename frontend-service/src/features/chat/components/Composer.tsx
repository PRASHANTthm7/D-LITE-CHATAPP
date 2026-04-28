"use client";

import { Plus, Smile, Mic, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/ui/primitives/button";

export function Composer() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    setMessage("");
  };

  return (
    <div className="p-4 bg-surface-1 border-t border-border-default">
      <div className="flex items-end gap-2 bg-surface-2 p-2 rounded-2xl border border-border-default focus-within:border-brand-primary transition-colors shadow-sm">
        <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 rounded-full text-text-secondary">
          <Plus className="w-5 h-5" />
        </Button>
        
        <textarea 
          className="flex-1 max-h-32 min-h-[40px] bg-transparent resize-none outline-none py-2 px-2 text-sm"
          placeholder="Message..."
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        {message.trim().length === 0 ? (
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 rounded-full text-text-secondary">
              <Smile className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 rounded-full text-text-secondary">
              <Mic className="w-5 h-5" />
            </Button>
          </div>
        ) : (
          <Button 
            size="icon" 
            className="h-10 w-10 shrink-0 rounded-full bg-brand-gradient shadow-accent text-white hover:scale-105"
            onClick={handleSend}
          >
            <Send className="w-4 h-4 ml-0.5" />
          </Button>
        )}
      </div>
    </div>
  );
}
