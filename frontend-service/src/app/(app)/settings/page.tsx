"use client";

import React, { useState } from "react";
import { SettingsHeader } from "@/features/settings/components/SettingsHeader";
import { Avatar } from "@/shared/components/Avatar";
import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button";
import { CldUploadWidget } from "next-cloudinary";

export default function ProfileSettingsPage() {
  const [name, setName] = useState("Aarav Sharma");
  const [username, setUsername] = useState("aarav");
  const [email, setEmail] = useState("aarav@company.com");
  const [bio, setBio] = useState("Engineering Manager");
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300">
      <SettingsHeader title="My Profile" description="Manage your personal information and how you appear to others." />
      
      <div className="bg-surface border border-gray-100 rounded-2xl p-6 shadow-sm mb-8">
        <div className="flex items-center gap-6 mb-8">
          <Avatar initials="AS" size="lg" src={avatarUrl} className="w-24 h-24 text-2xl" />
          <div className="space-x-3 flex items-center">
            <CldUploadWidget 
              uploadPreset="ml_default" // default preset, you should configure this in Cloudinary
              onSuccess={(result: any) => {
                if (result.info && typeof result.info === 'object' && 'secure_url' in result.info) {
                  setAvatarUrl(result.info.secure_url as string);
                }
              }}
            >
              {({ open }) => (
                <Button variant="primary" onClick={() => open()}>Upload Avatar</Button>
              )}
            </CldUploadWidget>
            <Button variant="secondary" className="text-danger border-red-100 hover:bg-red-50" onClick={() => setAvatarUrl(undefined)}>Remove</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
            <Input value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Username</label>
            <Input value={username} onChange={e => setUsername(e.target.value)} prefix="@" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
            <Input value={email} onChange={e => setEmail(e.target.value)} type="email" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bio</label>
            <textarea 
              value={bio} 
              onChange={e => setBio(e.target.value)}
              className="w-full bg-surface border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-shadow resize-none h-24"
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
          <Button variant="primary">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
