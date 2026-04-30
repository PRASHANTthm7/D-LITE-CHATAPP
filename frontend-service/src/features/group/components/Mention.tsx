import React from "react";

export function Mention({ username }: { username: string }) {
  return (
    <span className="inline-block bg-brand-100 text-brand-700 font-medium px-1 rounded mx-0.5 cursor-pointer hover:bg-brand-200 transition-colors">
      @{username}
    </span>
  );
}
