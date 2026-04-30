"use client";

import React, { useState } from "react";
import { SettingsHeader } from "@/features/settings/components/SettingsHeader";
import { SettingRow } from "@/features/settings/components/SettingRow";
import { ColorPicker } from "@/features/settings/components/ColorPicker";

export default function AppearanceSettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300">
      <SettingsHeader title="Appearance" description="Customize how D-Lite looks and feels on your device." />
      
      <div className="bg-surface border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Theme</h3>
        
        <SettingRow 
          label="Dark Mode" 
          description="Switch to a dark color palette for low-light environments." 
          checked={darkMode} 
          onChange={setDarkMode} 
        />
        
        <SettingRow 
          label="Brand Color" 
          description="Select your primary accent color for buttons, toggles, and highlights." 
          control={<ColorPicker />} 
        />
        
        <SettingRow 
          label="Reduced Motion" 
          description="Disable animations and transitions across the application." 
          checked={reducedMotion} 
          onChange={setReducedMotion} 
        />
      </div>
    </div>
  );
}
