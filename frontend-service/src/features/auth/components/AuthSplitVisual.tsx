"use client";

import { Zap, Shield, Sparkles, Bot, Video, Users } from "lucide-react";

const MESSAGES = [
  { id: 1, out: false, text: "yo this new AI feature is 🔥", avatar: "A", color: "#f97316" },
  { id: 2, out: true,  text: "right?! asked it to summarize the whole thread 😭", avatar: "Y", color: "#a855f7" },
  { id: 3, out: false, text: "and the video quality in calls is insane", avatar: "A", color: "#f97316" },
  { id: 4, out: true,  text: "D-Lite on top fr 🚀", avatar: "Y", color: "#a855f7" },
];

const FEATURES = [
  { icon: <Zap size={14} />, text: "Sub-50ms latency", color: "#f97316" },
  { icon: <Shield size={14} />, text: "End-to-end encrypted", color: "#10b981" },
  { icon: <Bot size={14} />, text: "Claude AI built-in", color: "#a855f7" },
  { icon: <Video size={14} />, text: "HD video calls", color: "#ec4899" },
  { icon: <Users size={14} />, text: "Group collaboration", color: "#3b82f6" },
  { icon: <Sparkles size={14} />, text: "Real-time presence", color: "#f59e0b" },
];

export function AuthSplitVisual() {
  return (
    <div
      className="hidden lg:flex w-[45%] xl:w-1/2 relative overflow-hidden flex-col p-10 xl:p-12"
      style={{ background: "linear-gradient(145deg, #0c0414 0%, #0f0520 40%, #120726 100%)" }}
    >
      {/* Aurora blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(circle, #f97316, transparent)", animation: "blob-float 9s infinite" }}
        />
        <div
          className="absolute top-1/3 -right-16 w-72 h-72 rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, #ec4899, transparent)", animation: "blob-float 11s infinite", animationDelay: "3s" }}
        />
        <div
          className="absolute -bottom-20 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{ background: "radial-gradient(circle, #a855f7, transparent)", animation: "blob-float 13s infinite", animationDelay: "6s" }}
        />
      </div>

      <div className="relative z-10 flex flex-col h-full">

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-12">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
            style={{ background: "linear-gradient(135deg, #f97316, #ec4899)" }}
          >
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            D-<span style={{ background: "linear-gradient(135deg, #fbbf24, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Lite</span>
          </span>
        </div>

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl xl:text-5xl font-black text-white leading-[1.1] mb-4">
            Connect<br />
            <span style={{ background: "linear-gradient(135deg, #fbbf24 0%, #f97316 40%, #ec4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Brilliantly.
            </span>
          </h1>
          <p className="text-sm text-white/50 leading-relaxed max-w-xs">
            Real-time messaging, HD video calls, and AI — all in one place.
          </p>
        </div>

        {/* Mock chat */}
        <div
          className="rounded-2xl p-4 mb-8 flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Chat header */}
          <div className="flex items-center gap-2.5 mb-4 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #f97316, #ec4899)" }}>A</div>
            <div>
              <p className="text-xs font-semibold text-white">Aarav Sharma</p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <p className="text-[10px] text-white/40">Online</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#ff5f56" }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#febc2e" }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#28c840" }} />
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-2.5">
            {MESSAGES.map((msg) => (
              <div key={msg.id} className={`flex items-end gap-2 ${msg.out ? "flex-row-reverse" : ""}`}>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                  style={{ background: msg.color }}
                >
                  {msg.avatar}
                </div>
                <div
                  className="max-w-[75%] px-3 py-1.5 rounded-2xl text-xs text-white leading-relaxed"
                  style={{
                    background: msg.out
                      ? "linear-gradient(135deg, #ec4899, #a855f7)"
                      : "rgba(255,255,255,0.08)",
                    boxShadow: msg.out ? "0 0 16px rgba(236,72,153,0.3)" : "none",
                    borderRadius: msg.out ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            <div className="flex items-end gap-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" style={{ background: "#f97316" }}>A</div>
              <div
                className="px-3 py-2 rounded-2xl flex gap-1 items-center"
                style={{ background: "rgba(255,255,255,0.08)", borderRadius: "18px 18px 18px 4px" }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-white/40"
                    style={{ animation: "typing-bounce 1.2s infinite", animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2">
          {FEATURES.map((f) => (
            <div
              key={f.text}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: f.color,
              }}
            >
              {f.icon}
              <span className="text-white/70">{f.text}</span>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div
          className="mt-auto pt-8 rounded-2xl"
        >
          <div
            className="p-4 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex gap-0.5 mb-2">
              {[1,2,3,4,5].map(i => (
                <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
            <p className="text-xs text-white/55 leading-relaxed mb-3 italic">
              "D-Lite transformed how our team communicates. The AI summaries and sub-50ms video calls feel like magic."
            </p>
            <div className="flex items-center gap-2">
              <img
                src="https://i.pravatar.cc/40?u=priya"
                alt="Priya"
                className="w-7 h-7 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-white">Priya Sharma</p>
                <p className="text-[10px] text-white/35">Engineering Manager</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
