import React from "react";
import { Star } from "lucide-react";

export function TestimonialCard() {
  return (
    <div className="absolute bottom-12 right-12 glass p-6 rounded-2xl max-w-[320px] shadow-lg animate-blob animation-delay-2000">
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} size={16} className="fill-brand-500 text-brand-500" />
        ))}
      </div>
      <p className="text-gray-200 text-sm mb-4 leading-relaxed font-medium">
        "D-Lite completely transformed how our remote team communicates. The sub-50ms latency makes video calls feel like we're in the same room."
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-surface/20 flex items-center justify-center overflow-hidden">
          <img src="https://i.pravatar.cc/150?u=priya" alt="Priya" className="w-full h-full object-cover mix-blend-overlay" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">Priya Sharma</h4>
          <p className="text-xs text-gray-400">Engineering Manager</p>
        </div>
      </div>
    </div>
  );
}
