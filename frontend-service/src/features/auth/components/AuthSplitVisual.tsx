import React from "react";
import { MessageSquare, Shield, Zap } from "lucide-react";
import { AuroraBackground } from "@/shared/components/AuroraBackground";
import { TestimonialCard } from "./TestimonialCard";

export function AuthSplitVisual() {
  return (
    <div className="hidden lg:flex w-1/2 relative bg-dark-bg text-white overflow-hidden flex-col justify-between p-12 border-r border-gray-800">
      <AuroraBackground>
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-16">
              <div className="w-10 h-10 rounded-xl brand-grad flex items-center justify-center shadow-accent">
                <MessageSquare size={20} className="text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">D-Lite</span>
            </div>

            <h1 className="text-5xl font-bold leading-tight mb-6">
              Connect <br />
              <span className="brand-grad-text">Brilliantly.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md mb-12">
              The premium platform for teams that demand secure, high-fidelity real-time communication.
            </p>

            <div className="space-y-6 max-w-md">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-gray-800/50 border border-gray-700/50 mt-1">
                  <Zap size={18} className="text-brand-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-200">Lightning Fast</h3>
                  <p className="text-sm text-gray-500">Sub-50ms latency across the globe.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-gray-800/50 border border-gray-700/50 mt-1">
                  <Shield size={18} className="text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-200">Bank-Grade Security</h3>
                  <p className="text-sm text-gray-500">End-to-end encryption for all calls and messages.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-gray-800/50 border border-gray-700/50 mt-1">
                  <MessageSquare size={18} className="text-accent-pink" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-200">AI-Powered</h3>
                  <p className="text-sm text-gray-500">Built-in smart replies and conversation summaries.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 glass p-4 rounded-2xl max-w-sm animate-wiggle relative overflow-hidden">
             <div className="absolute inset-0 bg-brand-500/10 pointer-events-none" />
             <div className="flex items-center gap-3 relative z-10">
               <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-pink-500" />
               <div>
                 <div className="text-sm font-medium text-white">Aarav Sharma</div>
                 <div className="text-xs text-gray-400">Typing...</div>
               </div>
             </div>
          </div>
          
          <TestimonialCard />
        </div>
      </AuroraBackground>
    </div>
  );
}
