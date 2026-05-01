import React from "react";

export function SettingsHeader({ title, description }: { title: string, description: string }) {
  return (
    <div className="mb-8 border-b themed-border pb-6">
      <h1 className="text-2xl font-bold themed-text mb-2">{title}</h1>
      <p className="themed-text-2">{description}</p>
    </div>
  );
}
