import React from "react";

export interface RoleBadgeProps {
  role: "owner" | "admin" | "mod" | "member";
}

export function RoleBadge({ role }: RoleBadgeProps) {
  if (role === "member") return null;

  const styles = {
    owner: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
    admin: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white",
    mod: "bg-gradient-to-r from-blue-400 to-cyan-500 text-white",
  };

  const labels = {
    owner: "Owner",
    admin: "Admin",
    mod: "Mod",
  };

  return (
    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm ${styles[role]}`}>
      {labels[role]}
    </span>
  );
}
