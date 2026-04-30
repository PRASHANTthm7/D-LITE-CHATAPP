"use client";

import React, { useState } from "react";
import { Plus, MessageSquare } from "lucide-react";
import { Button } from "@/shared/components/Button";

export function AIHistorySidebar() {
  const [active, setActive] = useState(0);
  const history = [
    { title: "Refactor MessageBubble", date: "Today" },
    { title: "Summarize Q3 Planning", date: "Yesterday" },
    { title: "Write marketing copy", date: "Last Week" },
  ];

  return (
    <div className="w-[260px] h-full border-r border-gray-100 bg-surface flex flex-col shrink-0">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">AI Chats</h2>
        <Button variant="primary" className="w-full justify-start" iconLeft={<Plus size={16} />}>
          New chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1 mt-2 custom-scrollbar">
        {history.map((item, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
              active === i ? "bg-brand-50 text-brand-700 font-medium" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <MessageSquare size={16} className={active === i ? "text-brand-500" : "text-gray-400"} />
            <div className="flex-1 min-w-0">
              <div className="text-sm truncate">{item.title}</div>
              {active === i && <div className="text-[10px] text-brand-400 mt-0.5">{item.date}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
