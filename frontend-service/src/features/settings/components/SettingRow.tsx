import React from "react";
import { Toggle } from "@/shared/components/Toggle";

export interface SettingRowProps {
  label: string;
  description?: string;
  control?: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function SettingRow({ label, description, control, checked, onChange }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
      <div className="pr-8">
        <div className="font-semibold text-gray-900 text-sm mb-1">{label}</div>
        {description && <div className="text-xs text-gray-500">{description}</div>}
      </div>
      <div className="shrink-0">
        {control || <Toggle checked={checked || false} onChange={onChange || (() => {})} />}
      </div>
    </div>
  );
}
