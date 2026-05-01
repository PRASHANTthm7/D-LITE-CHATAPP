"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus, Smile, Send } from "lucide-react";
import { IconButton } from "@/shared/components/IconButton";
import { motion } from "framer-motion";

export interface ComposerProps {
  onSend: (text: string) => void;
  placeholder?: string;
}

export function Composer({ onSend, placeholder = "Type a message..." }: ComposerProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 themed-surface border-t themed-border flex items-end gap-2">
      <IconButton size="md" variant="ghost" className="themed-text-3 hover:text-[var(--brand-text)] mb-1">
        <Plus size={22} />
      </IconButton>

      <div className="flex-1 themed-surface-2 border themed-border rounded-2xl flex items-end overflow-hidden focus-within:border-[var(--input-border-focus)] focus-within:ring-2 focus-within:ring-[var(--brand-200)]/30 transition-shadow transition-colors">
        <IconButton size="sm" variant="ghost" className="themed-text-3 hover:text-[var(--brand-text)] mb-1.5 ml-1">
          <Smile size={20} />
        </IconButton>
        
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-transparent py-3 px-2 outline-none resize-none min-h-[44px] max-h-[120px] text-[15px] themed-text custom-scrollbar"
          rows={1}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSend}
        disabled={!text.trim()}
        className={`w-11 h-11 mb-1 rounded-full flex items-center justify-center transition-all ${
          text.trim() 
            ? "brand-grad text-white send-btn-glow" 
            : "themed-surface-2 themed-text-3 cursor-not-allowed"
        }`}
      >
        <Send size={18} className="ml-1" />
      </motion.button>
    </div>
  );
}
