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
    <div className="p-4 bg-surface border-t border-gray-100 flex items-end gap-2">
      <IconButton size="md" variant="ghost" className="text-gray-400 hover:text-brand-500 mb-1">
        <Plus size={22} />
      </IconButton>

      <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl flex items-end overflow-hidden focus-within:border-brand-300 focus-within:ring-2 focus-within:ring-brand-100 transition-shadow transition-colors">
        <IconButton size="sm" variant="ghost" className="text-gray-400 hover:text-brand-500 mb-1.5 ml-1">
          <Smile size={20} />
        </IconButton>
        
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-transparent py-3 px-2 outline-none resize-none min-h-[44px] max-h-[120px] text-[15px] custom-scrollbar"
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
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        <Send size={18} className="ml-1" />
      </motion.button>
    </div>
  );
}
