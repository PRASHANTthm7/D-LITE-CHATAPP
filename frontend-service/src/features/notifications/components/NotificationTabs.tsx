import React from "react";

export interface NotificationTabsProps {
  activeTab: "all" | "mentions" | "unread";
  onTabChange: (tab: "all" | "mentions" | "unread") => void;
}

export function NotificationTabs({ activeTab, onTabChange }: NotificationTabsProps) {
  const tabs = [
    { id: "all", label: "All" },
    { id: "mentions", label: "Mentions" },
    { id: "unread", label: "Unread" },
  ] as const;

  return (
    <div className="flex items-center gap-6 border-b border-gray-100 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`py-3 text-sm font-semibold relative transition-colors ${
            activeTab === tab.id ? "text-brand-600" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-t-full" />
          )}
        </button>
      ))}
    </div>
  );
}
