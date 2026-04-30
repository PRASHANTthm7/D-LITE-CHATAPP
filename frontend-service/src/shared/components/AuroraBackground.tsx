"use client";

import React from "react";

export function AuroraBackground({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-canvas">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply blur-3xl">
        <div
          className="absolute top-0 -left-10 w-96 h-96 bg-brand-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
          style={{ animation: "blob-float 7s infinite" }}
        />
        <div
          className="absolute top-0 -right-10 w-96 h-96 bg-accent-pink rounded-full mix-blend-multiply filter blur-3xl opacity-70"
          style={{ animation: "blob-float 7s infinite", animationDelay: "2s" }}
        />
        <div
          className="absolute -bottom-20 left-40 w-96 h-96 bg-accent-purple rounded-full mix-blend-multiply filter blur-3xl opacity-70"
          style={{ animation: "blob-float 7s infinite", animationDelay: "4s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
