"use client";

import { MessageCircle, Users, PhoneCall, Sparkles } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";

export function DashboardPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back 👋</h1>
        <p className="text-text-secondary">Here's what's happening with your connections today.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { title: "Start Chat", icon: <MessageCircle className="w-5 h-5" />, color: "text-brand-primary", bg: "bg-brand-primary-soft" },
          { title: "Join Group", icon: <Users className="w-5 h-5" />, color: "text-info", bg: "bg-info/10" },
          { title: "Make Call", icon: <PhoneCall className="w-5 h-5" />, color: "text-success", bg: "bg-success/10" },
          { title: "Assistant", icon: <Sparkles className="w-5 h-5" />, color: "text-[#a855f7]", bg: "bg-[#a855f7]/10" }
        ].map((action, i) => (
          <div key={i} className="group relative overflow-hidden rounded-2xl bg-surface-1 p-6 border border-border-default hover:border-border-strong hover:shadow-md transition-all cursor-pointer">
            <div className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center mb-4`}>
              <span className={action.color}>{action.icon}</span>
            </div>
            <h3 className="font-semibold">{action.title}</h3>
          </div>
        ))}
      </div>

      {/* Hero Illustration */}
      <div className="rounded-3xl bg-brand-gradient p-10 text-white relative overflow-hidden shadow-accent">
        <div className="relative z-10 max-w-lg">
          <h2 className="text-2xl font-bold mb-4">Try out the new AI Assistant</h2>
          <p className="mb-6 opacity-90">Your Special Friend is ready to help you compose messages, answer questions, and translate on the fly.</p>
          <Button variant="secondary" className="text-brand-primary font-medium border-0">Open Assistant</Button>
        </div>
        <div className="absolute -right-10 -bottom-10 opacity-30 mix-blend-overlay">
          <Sparkles className="w-64 h-64" />
        </div>
      </div>
    </div>
  );
}
