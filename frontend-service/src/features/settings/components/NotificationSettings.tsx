"use client";

import { Button } from "@/shared/ui/primitives/button";

export function NotificationSettings() {
  return (
    <div className="max-w-2xl animate-in fade-in duration-500">
      <h1 className="text-2xl font-bold mb-6 text-text-primary">Notifications</h1>
      
      <div className="bg-surface-1 border border-border-default rounded-2xl p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-text-primary">Push Notifications</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-sm text-text-primary">Direct Messages</h3>
              <p className="text-xs text-text-tertiary">Get notified when someone sends you a message.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-surface-3 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-sm text-text-primary">Mentions in Groups</h3>
              <p className="text-xs text-text-tertiary">Get notified when you are @mentioned.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-surface-3 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-sm text-text-primary">Incoming Calls</h3>
              <p className="text-xs text-text-tertiary">Ring when receiving a voice or video call.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-surface-3 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
            </label>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border-default">
          <Button variant="secondary">Reset to Defaults</Button>
        </div>
      </div>
    </div>
  );
}
