"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  MessageCircle,
  Users,
  Video,
  Sparkles,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  Check,
  Star,
  Mic,
  Bot,
  Radio,
  Lock,
} from "lucide-react";
import { ThemeToggle } from "@/shared/components/ThemeToggle";

/* ─── tiny hook for scroll-based navbar blur ─── */
function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/* ─── fade-up on viewport entry ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

/* ─── features list ─── */
const features = [
  {
    icon: <MessageCircle size={24} />,
    title: "Real-time DMs",
    desc: "Instant messages with reactions, threaded replies, and read receipts. Zero latency.",
    color: "from-brand-400 to-brand-600",
  },
  {
    icon: <Users size={24} />,
    title: "Group Chat",
    desc: "Create groups with owner, admin, mod, and member roles. Mention, pin, and moderate.",
    color: "from-accent-pink to-accent-purple",
  },
  {
    icon: <Video size={24} />,
    title: "Voice & Video Calls",
    desc: "Crystal-clear WebRTC-powered calls via ZEGOCLOUD. HD video, no plugins needed.",
    color: "from-brand-500 to-accent-pink",
  },
  {
    icon: <Bot size={24} />,
    title: "AI Assistant",
    desc: "Claude + OpenAI powered chat. Ask questions, summarize threads, draft replies with voice.",
    color: "from-accent-purple to-brand-400",
  },
  {
    icon: <Radio size={24} />,
    title: "Live Presence",
    desc: "Online status, typing indicators, and real-time events via Socket.IO. Always in sync.",
    color: "from-brand-400 to-accent-pink",
  },
  {
    icon: <Lock size={24} />,
    title: "Secure Auth",
    desc: "Supabase Auth with email/password, 2FA, Row Level Security, and password reset flows.",
    color: "from-brand-600 to-accent-purple",
  },
];

/* ─── mock chat messages for hero ─── */
const mockMessages = [
  { id: 1, user: "Ava", avatar: "A", text: "yo the new dark mode is insane 🔥", time: "12:01", out: false },
  { id: 2, user: "You", avatar: "Y", text: "right?! the neon glow hits different", time: "12:02", out: true },
  { id: 3, user: "Ava", avatar: "A", text: "and the AI assistant actually works lol", time: "12:03", out: false },
  { id: 4, user: "You", avatar: "Y", text: "D-Lite on top fr 🚀", time: "12:04", out: true },
];

/* ─── static waveform heights (no Math.random in render → no hydration mismatch) ─── */
const WAVE_HEIGHTS = [4, 8, 14, 6, 12, 10, 16, 5, 13, 9, 15, 7, 11, 3, 10, 6];

/* ─── stats ─── */
const stats = [
  { value: "5", suffix: " services", label: "Microservices" },
  { value: "<50", suffix: "ms", label: "Message latency" },
  { value: "2", suffix: " AI engines", label: "Claude + OpenAI" },
  { value: "100%", suffix: "", label: "Open source" },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scrolled = useScrolled();

  return (
    <div className="min-h-screen themed-canvas overflow-x-hidden">
      {/* ═══ NAVBAR ═══ */}
      <header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "var(--glass-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(150%)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-soft)" : "none",
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg"
              style={{ background: "var(--grad-brand)" }}
            >
              D
            </div>
            <span className="font-bold text-lg themed-text tracking-tight">
              D-<span className="brand-grad-text">Lite</span>
            </span>
          </Link>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-8">
            {["Features", "Architecture", "Open Source"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-medium themed-text-2 hover:themed-text transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/login"
              className="hidden sm:block text-sm font-semibold themed-text-2 hover:themed-text px-4 py-2 rounded-xl transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-semibold text-white px-4 py-2 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95"
              style={{ background: "var(--grad-brand)", boxShadow: "var(--shadow-glow)" }}
            >
              Get started
            </Link>
          </div>
        </nav>
      </header>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Aurora blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--aurora-1)", animation: "blob-float 9s infinite" }}
          />
          <div
            className="absolute top-20 -right-32 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
            style={{ background: "var(--aurora-2)", animation: "blob-float 9s infinite", animationDelay: "3s" }}
          />
          <div
            className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
            style={{ background: "var(--aurora-3)", animation: "blob-float 9s infinite", animationDelay: "6s" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center py-24">
          {/* Left — copy */}
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 border"
              style={{
                background: "var(--grad-brand-soft)",
                borderColor: "var(--border-strong)",
                color: "var(--brand-text)",
              }}
            >
              <Sparkles size={12} />
              AI-powered · Real-time · Open source
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight themed-text mb-6"
            >
              Messaging,{" "}
              <span className="brand-grad-text">
                reimagined
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg xl:text-xl themed-text-2 leading-relaxed max-w-lg mb-10"
            >
              D-Lite is a production-grade platform with real-time DMs, group chat, WebRTC video calls,
              and an AI assistant powered by Claude and OpenAI — all in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-base font-bold text-white shadow-xl transition-all hover:scale-105 active:scale-95"
                style={{ background: "var(--grad-brand)", boxShadow: "var(--shadow-glow)" }}
              >
                Start for free <ArrowRight size={18} />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-base font-bold themed-text border transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "var(--glass-bg)",
                  backdropFilter: "blur(12px)",
                  borderColor: "var(--border)",
                }}
              >
                Sign in
              </Link>
            </motion.div>

            {/* Social proof bullets */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              {["No credit card", "Self-hostable", "MIT license"].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-sm themed-text-3">
                  <Check size={14} className="text-success" />
                  {t}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — mock chat UI */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <div
              className="rounded-3xl overflow-hidden shadow-2xl border"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-elevated)",
              }}
            >
              {/* Window chrome */}
              <div
                className="flex items-center gap-2 px-5 py-3.5 border-b"
                style={{ background: "var(--surface-2)", borderColor: "var(--border-soft)" }}
              >
                <div className="w-3 h-3 rounded-full bg-danger opacity-80" />
                <div className="w-3 h-3 rounded-full bg-warn opacity-80" />
                <div className="w-3 h-3 rounded-full bg-success opacity-80" />
                <div className="flex-1 mx-4">
                  <div
                    className="h-5 rounded-lg flex items-center justify-center text-xs themed-text-3"
                    style={{ background: "var(--input-bg)", border: "1px solid var(--border-soft)" }}
                  >
                    dlite.chat
                  </div>
                </div>
              </div>

              {/* Chat window */}
              <div className="flex h-[420px]">
                {/* Sidebar */}
                <div
                  className="w-56 border-r flex flex-col"
                  style={{ background: "var(--surface-2)", borderColor: "var(--border-soft)" }}
                >
                  <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border-soft)" }}>
                    <p className="text-xs font-bold themed-text-3 uppercase tracking-widest mb-2">Messages</p>
                    <div
                      className="h-7 rounded-lg w-full"
                      style={{ background: "var(--input-bg)", border: "1px solid var(--border-soft)" }}
                    />
                  </div>
                  {["Ava Chen", "Team D-Lite", "Marcus K.", "AI Assistant"].map((name, i) => (
                    <div
                      key={name}
                      className="flex items-center gap-2.5 px-3 py-2.5 cursor-pointer transition-colors"
                      style={{
                        background: i === 0 ? "var(--row-active-bg)" : "transparent",
                        borderLeft: i === 0 ? "2px solid var(--row-active-border)" : "2px solid transparent",
                      }}
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{
                          background: ["var(--grad-brand)", "var(--accent-purple)", "var(--accent-pink)", "var(--grad-brand)"][i],
                        }}
                      >
                        {name[0]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold themed-text truncate">{name}</p>
                        <p className="text-[10px] themed-text-muted truncate">hey...</p>
                      </div>
                      {i === 0 && (
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                          style={{ background: "var(--brand-500)" }}
                        >
                          2
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Chat area */}
                <div className="flex-1 flex flex-col">
                  {/* Chat header */}
                  <div
                    className="flex items-center gap-2.5 px-4 py-3 border-b"
                    style={{ borderColor: "var(--border-soft)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: "var(--grad-brand)" }}
                    >
                      A
                    </div>
                    <div>
                      <p className="text-sm font-semibold themed-text">Ava Chen</p>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-success" />
                        <p className="text-[10px] themed-text-3">Online</p>
                      </div>
                    </div>
                    <div className="ml-auto flex items-center gap-2 themed-text-3">
                      <Video size={16} />
                      <Mic size={16} />
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-hidden px-4 py-3 space-y-3">
                    {mockMessages.map((msg, i) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.12 }}
                        className={`flex gap-2 ${msg.out ? "flex-row-reverse" : ""}`}
                      >
                        {!msg.out && (
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-auto"
                            style={{ background: "var(--grad-brand)" }}
                          >
                            {msg.avatar}
                          </div>
                        )}
                        <div
                          className={`max-w-[75%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                            msg.out ? "themed-msg-out rounded-br-sm" : "themed-msg-in rounded-bl-sm"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                    {/* Typing indicator */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="flex gap-2 items-end"
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                        style={{ background: "var(--grad-brand)" }}
                      >
                        A
                      </div>
                      <div
                        className="px-3 py-2.5 rounded-2xl rounded-bl-sm themed-msg-in flex gap-1 items-center"
                      >
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              background: "var(--text-muted)",
                              animation: "typing-bounce 1.2s infinite",
                              animationDelay: `${i * 0.2}s`,
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Input bar */}
                  <div
                    className="px-3 py-2.5 border-t flex items-center gap-2"
                    style={{ borderColor: "var(--border-soft)" }}
                  >
                    <div
                      className="flex-1 h-8 rounded-xl px-3 flex items-center text-[11px] themed-text-muted"
                      style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)" }}
                    >
                      Type a message…
                    </div>
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--grad-brand)" }}
                    >
                      <ArrowRight size={14} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS STRIP ═══ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
        className="border-y"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="text-center">
              <p className="text-3xl xl:text-4xl font-black brand-grad-text mb-1">
                {s.value}
                <span className="text-xl">{s.suffix}</span>
              </p>
              <p className="text-sm themed-text-3 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--brand-text)" }}
            >
              Everything you need
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl xl:text-5xl font-black themed-text mb-5">
              Built for real conversations
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg themed-text-2 max-w-xl mx-auto">
              Every feature you expect, crafted with care. Nothing bloated, nothing missing.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.02 }}
                className="rounded-2xl p-6 border transition-all cursor-default"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-white mb-5 bg-gradient-to-br ${f.color}`}
                  style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                >
                  {f.icon}
                </div>
                <h3 className="text-base font-bold themed-text mb-2">{f.title}</h3>
                <p className="text-sm themed-text-2 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ AI SPOTLIGHT ═══ */}
      <section
        className="py-28 px-6 relative overflow-hidden"
        style={{ background: "var(--surface-2)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
            style={{ background: "var(--aurora-3)" }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* AI chat card */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="rounded-3xl border overflow-hidden shadow-2xl"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-elevated)",
              }}
            >
              {/* AI header */}
              <div
                className="px-5 py-4 border-b flex items-center gap-3"
                style={{ background: "var(--grad-brand)", borderColor: "transparent" }}
              >
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">D-Lite AI</p>
                  <p className="text-xs text-white/70">Powered by Claude + OpenAI</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50" style={{ animation: "wave-bar 1.2s infinite", animationDelay: "0s" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50" style={{ animation: "wave-bar 1.2s infinite", animationDelay: "0.15s" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50" style={{ animation: "wave-bar 1.2s infinite", animationDelay: "0.3s" }} />
                </div>
              </div>

              {/* Conversation */}
              <div className="p-5 space-y-4">
                {[
                  { role: "user", text: "Summarize the last 20 messages in #general" },
                  {
                    role: "ai",
                    text: "Here's a summary of the last 20 messages in #general: The team discussed the new dark mode launch, with mostly positive reactions. Marcus raised a latency question — resolved by Ava. Two memes. One PR merge.",
                  },
                  { role: "user", text: "Draft a reply to Marcus about the latency fix" },
                  {
                    role: "ai",
                    text: 'Here\'s a draft: "Hey Marcus — the p99 latency spike was caused by a missing index on message_id. Deployed a fix at 12:30, we\'re back to <50ms. Let me know if you see anything else!"',
                  },
                ].map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    {m.role === "ai" && (
                      <div
                        className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-auto"
                        style={{ background: "var(--grad-brand)" }}
                      >
                        <Sparkles size={12} className="text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        m.role === "user" ? "themed-msg-out rounded-br-sm" : "themed-msg-in rounded-bl-sm"
                      }`}
                    >
                      {m.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Voice indicator */}
              <div
                className="mx-5 mb-5 rounded-xl px-4 py-2.5 flex items-center gap-3 border"
                style={{ background: "var(--input-bg)", borderColor: "var(--input-border)" }}
              >
                <Mic size={14} style={{ color: "var(--brand-text)" }} />
                <div className="flex gap-0.5 items-center h-4">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-0.5 rounded-full"
                      style={{
                        height: `${WAVE_HEIGHTS[i]}px`,
                        background: "var(--grad-brand)",
                        animation: "wave-bar 0.8s infinite",
                        animationDelay: `${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs themed-text-muted ml-auto">Voice mode active</span>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6 border"
              style={{
                background: "var(--grad-brand-soft)",
                borderColor: "var(--border-strong)",
                color: "var(--brand-text)",
              }}
            >
              <Sparkles size={12} /> AI Assistant
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl xl:text-5xl font-black themed-text mb-5 leading-tight">
              Your AI teammate,
              <br />
              <span className="brand-grad-text">always on call.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg themed-text-2 leading-relaxed mb-8">
              Ask questions, summarize channels, draft messages, and talk to it with your voice —
              powered by Claude and GPT with ElevenLabs text-to-speech.
            </motion.p>
            <motion.ul variants={stagger} className="space-y-3">
              {[
                "Summarize threads and channels",
                "Draft replies in your tone",
                "Voice input via Deepgram STT",
                "Spoken responses with ElevenLabs TTS",
              ].map((item) => (
                <motion.li key={item} variants={fadeUp} className="flex items-center gap-3 text-sm themed-text-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--success-bg)" }}
                  >
                    <Check size={11} className="text-success" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>

      {/* ═══ ARCHITECTURE ═══ */}
      <section id="architecture" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--brand-text)" }}
            >
              Under the hood
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl xl:text-5xl font-black themed-text mb-5">
              Microservices, done right
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg themed-text-2 max-w-xl mx-auto">
              Five independent services, each doing one thing perfectly.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              { name: "frontend-service", tech: "Next.js 16 · Tailwind · Supabase SSR", port: ":3000", icon: <Globe size={18} /> },
              { name: "core-backend", tech: "FastAPI · SQLAlchemy · Supabase", port: ":5040", icon: <Zap size={18} /> },
              { name: "realtime-service", tech: "FastAPI · Socket.IO · Presence", port: ":5050", icon: <Radio size={18} /> },
              { name: "call-service", tech: "Node.js · Express · ZEGOCLOUD", port: ":5060", icon: <Video size={18} /> },
              { name: "ai-backend", tech: "FastAPI · Anthropic · OpenAI · ElevenLabs", port: ":5070", icon: <Sparkles size={18} /> },
              { name: "supabase", tech: "Postgres · Auth · RLS · Realtime", port: "cloud", icon: <Shield size={18} /> },
            ].map((svc) => (
              <motion.div
                key={svc.name}
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl p-5 border flex items-start gap-4 transition-all"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--grad-brand-soft)", color: "var(--brand-text)" }}
                >
                  {svc.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-bold themed-text truncate">{svc.name}</p>
                    <span
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded-md flex-shrink-0"
                      style={{ background: "var(--surface-2)", color: "var(--brand-text)", border: "1px solid var(--border)" }}
                    >
                      {svc.port}
                    </span>
                  </div>
                  <p className="text-xs themed-text-3 leading-relaxed">{svc.tech}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ OPEN SOURCE CTA ═══ */}
      <section id="open-source" className="py-28 px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl p-12 text-center"
          style={{
            background: "var(--grad-brand)",
            boxShadow: "var(--shadow-glow)",
          }}
        >
          {/* Blobs inside CTA */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-xs font-bold text-white mb-6">
              <Star size={12} fill="currentColor" /> MIT Licensed
            </div>
            <h2 className="text-4xl xl:text-5xl font-black text-white mb-5 leading-tight">
              Ready to build something{" "}
              <span className="underline decoration-white/40 decoration-4 underline-offset-4">
                epic
              </span>
              ?
            </h2>
            <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
              D-Lite is open source and free to use. Jump in, self-host it, or sign up and start chatting in seconds.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-white text-brand-600 font-bold px-8 py-3.5 rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                Get started free <ArrowRight size={18} />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-white/15 text-white font-bold px-8 py-3.5 rounded-2xl border border-white/30 transition-all hover:bg-white/25 hover:scale-105 active:scale-95"
              >
                Sign in
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer
        className="border-t py-10 px-6"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-sm"
              style={{ background: "var(--grad-brand)" }}
            >
              D
            </div>
            <span className="font-bold themed-text">
              D-<span className="brand-grad-text">Lite</span>
            </span>
          </div>
          <p className="text-sm themed-text-3 text-center">
            Built with Next.js · FastAPI · Supabase · Claude · MIT License
          </p>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm themed-text-3 hover:themed-text transition-colors">
              Login
            </Link>
            <Link href="/signup" className="text-sm themed-text-3 hover:themed-text transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
