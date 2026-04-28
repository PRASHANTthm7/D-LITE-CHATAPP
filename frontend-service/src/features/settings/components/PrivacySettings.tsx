"use client"

import Link from "next/link"
import { SettingRow } from "@/shared/ui/components/setting-row"
import { Toggle } from "@/shared/ui/primitives/toggle"
import { Select } from "@/shared/ui/primitives/select"
import { Badge } from "@/shared/ui/primitives/badge"
import { Shield } from "lucide-react"

export function PrivacySettings() {
  return (
    <div className="max-w-2xl animate-in fade-in duration-500">
      <h1 className="text-2xl font-bold mb-6">Privacy & Security</h1>

      <div className="bg-surface-1 border border-border-default rounded-2xl px-6 mb-8 shadow-sm">
        <SettingRow title="Last seen" description="Who can see when you were last active">
          <Select className="w-36">
            <option>Everyone</option>
            <option>Contacts</option>
            <option>Nobody</option>
          </Select>
        </SettingRow>
        <SettingRow title="Read receipts" description="Let others know when you've read their messages">
          <Toggle defaultChecked />
        </SettingRow>
        <SettingRow title="Calls from" description="Who can call you on D-Lite">
          <Select className="w-36">
            <option>Everyone</option>
            <option>Contacts</option>
            <option>Nobody</option>
          </Select>
        </SettingRow>
        <SettingRow title="Profile photo" description="Who can see your profile photo">
          <Select className="w-36">
            <option>Everyone</option>
            <option>Contacts</option>
          </Select>
        </SettingRow>
        <SettingRow title="Two-Factor Authentication" description="Extra security for your account" noBorder>
          <div className="flex items-center gap-2">
            <Badge variant="warning" size="sm">Disabled</Badge>
            <Link href="/settings/2fa" className="text-xs text-brand-primary hover:underline font-medium">
              Enable
            </Link>
          </div>
        </SettingRow>
      </div>
    </div>
  )
}
