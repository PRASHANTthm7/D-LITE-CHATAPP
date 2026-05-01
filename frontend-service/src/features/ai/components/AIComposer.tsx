"use client";

import React, { useState, useRef, useEffect } from "react";
import { Paperclip, Mic, Send } from "lucide-react";
import { IconButton } from "@/shared/components/IconButton";
import { motion } from "framer-motion";

export interface AIComposerProps {
  onSend: (text: string) => void;
  value?: string;
  onChange?: (val: string) => void;
}

export function AIComposer({ onSend, value = "", onChange }: AIComposerProps) {
  const [internalText, setInternalText] = useState(value);
  const text = onChange ? value : internalText;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) onChange(e.target.value);
    else setInternalText(e.target.value);
  };

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      if (onChange) onChange("");
      else setInternalText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-6 py-4 themed-surface border-t themed-border flex flex-col">
      <div className="flex items-end gap-2 max-w-4xl mx-auto w-full">
        <IconButton size="md" variant="ghost" className="themed-text-3 hover:text-[var(--brand-text)] mb-1">
          <Paperclip size={20} />
        </IconButton>

        <div className="flex-1 themed-surface border-2 border-[var(--brand-100)] rounded-2xl flex items-end overflow-hidden focus-within:border-[var(--brand-400)] focus-within:ring-4 focus-within:ring-[var(--brand-50)] transition-all shadow-card">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything... or use ✨ for actions"
            className="w-full bg-transparent py-3.5 px-4 outline-none resize-none min-h-[52px] max-h-[120px] text-[15px] custom-scrollbar themed-text"
            rows={1}
          />
          <IconButton size="sm" variant="ghost" className="themed-text-3 hover:text-[var(--brand-text)] mb-1.5 mr-1">
            <Mic size={20} />
          </IconButton>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={!text.trim()}
          className={`w-12 h-12 mb-0.5 rounded-xl flex items-center justify-center transition-all ${
            text.trim() 
              ? "brand-grad text-white shadow-glow" 
              : "themed-surface-2 themed-text-3 cursor-not-allowed"
          }`}
        >
          <Send size={18} className="ml-0.5" />
        </motion.button>
      </div>
      <div className="text-center mt-3 text-[11px] themed-text-3">
        AI can make mistakes. Verify important information.
      </div>
    </div>
  );
}
