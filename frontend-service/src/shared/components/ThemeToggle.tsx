"use client";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/shared/theme/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div
      role="group"
      aria-label="Theme switcher"
      className="inline-flex items-center gap-1 rounded-full p-1 themed-glass border border-[var(--border)] bg-[var(--surface-2)]"
    >
      <ToggleBtn active={theme === "light"} onClick={() => setTheme("light")} label="Light" icon={<Sun size={14} />} />
      <ToggleBtn active={theme === "dark"}  onClick={() => setTheme("dark")}  label="Dark"  icon={<Moon size={14} />} />
    </div>
  );
}

function ToggleBtn({
  active, onClick, label, icon,
}: { active: boolean; onClick: () => void; label: string; icon: React.ReactNode }) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      aria-label={`Switch to ${label} theme`}
      aria-pressed={active}
      className={`grid place-items-center w-7 h-7 rounded-full transition-colors ${
        active
          ? "brand-grad text-white shadow-[var(--shadow-glow)]"
          : "themed-text-3 hover:themed-text"
      }`}
    >
      {icon}
    </motion.button>
  );
}
