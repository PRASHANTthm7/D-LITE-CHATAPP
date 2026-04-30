import React from "react";

export function SettingsHeader({ title, description }: { title: string, description: string }) {
  return (
    <div className="mb-8 border-b border-gray-100 pb-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
