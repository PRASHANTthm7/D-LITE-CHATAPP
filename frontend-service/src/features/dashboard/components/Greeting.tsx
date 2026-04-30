import React from "react";

export function Greeting({ name = "Rahul" }: { name?: string }) {
  const date = new Date().toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' });
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="mb-8">
      <p className="text-sm font-medium text-gray-500 mb-1">{date}</p>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {greeting}, <span className="brand-grad-text">{name}</span>
      </h1>
      <p className="text-gray-600">Here's what's happening today.</p>
    </div>
  );
}
