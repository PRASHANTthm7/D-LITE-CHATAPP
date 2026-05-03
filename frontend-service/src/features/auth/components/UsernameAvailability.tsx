"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface UsernameAvailabilityProps {
  username?: string;
  onAvailabilityChange?: (isAvailable: boolean) => void;
}

export function UsernameAvailability({ username, onAvailabilityChange }: UsernameAvailabilityProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "available" | "taken">("idle");
  const callbackRef = useRef(onAvailabilityChange);
  callbackRef.current = onAvailabilityChange;

  useEffect(() => {
    if (!username || username.length < 3) {
      setStatus("idle");
      callbackRef.current?.(false);
      return;
    }

    setStatus("loading");

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/check-username?username=${encodeURIComponent(username)}`);
        const data = await res.json();
        const isAvailable = data.available ?? true;
        setStatus(isAvailable ? "available" : "taken");
        callbackRef.current?.(isAvailable);
      } catch {
        setStatus("idle");
        callbackRef.current?.(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [username]);

  return (
    <div className="h-5 mt-1 overflow-hidden">
      <AnimatePresence mode="wait">
        {status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-1.5 text-xs text-gray-500"
          >
            <Loader2 size={12} className="animate-spin" /> Checking availability...
          </motion.div>
        )}
        {status === "available" && (
          <motion.div
            key="available"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-1.5 text-xs text-success"
          >
            <CheckCircle2 size={12} /> Username available
          </motion.div>
        )}
        {status === "taken" && (
          <motion.div
            key="taken"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-1.5 text-xs text-danger"
          >
            <XCircle size={12} /> Username is taken
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
