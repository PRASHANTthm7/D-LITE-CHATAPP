"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

export function ColorPicker() {
  const colors = [
    { id: "blue", class: "bg-blue-500" },
    { id: "purple", class: "bg-purple-500" },
    { id: "pink", class: "bg-pink-500" },
    { id: "orange", class: "bg-orange-500" },
    { id: "green", class: "bg-emerald-500" },
  ];

  const [selected, setSelected] = useState("blue");

  return (
    <div className="flex items-center gap-3">
      {colors.map((c) => (
        <button
          key={c.id}
          onClick={() => setSelected(c.id)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${c.class}`}
        >
          {selected === c.id && <Check size={16} className="text-white" />}
        </button>
      ))}
    </div>
  );
}
