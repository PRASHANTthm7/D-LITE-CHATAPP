"use client";

import React from "react";
import { Avatar } from "@/shared/components/Avatar";
import { Button } from "@/shared/components/Button";

export default function DashboardRoute() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Phase 1 Smoke Test</h1>
      <div className="flex gap-4 items-center">
        <Avatar online initials="DL" size="lg" />
        <Button variant="primary">Test Button</Button>
      </div>
    </div>
  );
}
