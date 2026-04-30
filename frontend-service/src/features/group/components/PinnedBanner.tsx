"use client";

import React, { useState } from "react";
import { Pin, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface PinnedBannerProps {
  text: string;
}

export function PinnedBanner({ text }: PinnedBannerProps) {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-brand-50 border-b border-brand-100 flex items-center justify-between px-6 py-2 overflow-hidden"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Pin size={14} className="text-brand-500 flex-shrink-0" />
            <p className="text-xs font-medium text-brand-700 truncate flex-1">
              Pinned: <span className="font-normal text-brand-600">{text}</span>
            </p>
          </div>
          <div className="flex items-center gap-3 ml-4 flex-shrink-0">
            <button className="text-xs font-semibold text-brand-600 hover:underline">View</button>
            <button onClick={() => setVisible(false)} className="text-brand-400 hover:text-brand-600">
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
