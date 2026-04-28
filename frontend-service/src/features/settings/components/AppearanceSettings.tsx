"use client";

import { Monitor, Moon, Sun } from "lucide-react";

export function AppearanceSettings() {
  return (
    <div className="max-w-2xl animate-in fade-in duration-500">
      <h1 className="text-2xl font-bold mb-6 text-text-primary">Appearance</h1>
      
      <div className="bg-surface-1 border border-border-default rounded-2xl p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-text-primary">Theme</h2>
        <p className="text-sm text-text-secondary mb-6">Customize the look and feel of D-Lite across all your devices.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-brand-primary bg-surface-2 text-brand-primary font-medium transition-all">
            <div className="w-12 h-12 rounded-full bg-brand-primary-soft flex items-center justify-center">
              <Sun className="w-6 h-6" />
            </div>
            Light
          </button>
          
          <button className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-border-default bg-surface-1 text-text-secondary hover:border-border-strong transition-all">
            <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center">
              <Moon className="w-6 h-6" />
            </div>
            Dark
          </button>
          
          <button className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-border-default bg-surface-1 text-text-secondary hover:border-border-strong transition-all">
            <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center">
              <Monitor className="w-6 h-6" />
            </div>
            System
          </button>
        </div>
      </div>

      <div className="bg-surface-1 border border-border-default rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-text-primary">Chat Density</h2>
        <div className="space-y-4">
          <label className="flex items-start gap-3 p-4 rounded-xl border border-border-default hover:bg-surface-2 cursor-pointer transition-colors">
            <input type="radio" name="density" className="mt-1" defaultChecked />
            <div>
              <div className="font-medium text-sm text-text-primary">Comfortable</div>
              <div className="text-xs text-text-tertiary">More spacing between messages, larger avatars.</div>
            </div>
          </label>
          <label className="flex items-start gap-3 p-4 rounded-xl border border-border-default hover:bg-surface-2 cursor-pointer transition-colors">
            <input type="radio" name="density" className="mt-1" />
            <div>
              <div className="font-medium text-sm text-text-primary">Compact</div>
              <div className="text-xs text-text-tertiary">Fit more messages on screen, hidden avatars.</div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
