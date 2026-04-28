"use client";

import { Button } from "@/shared/ui/primitives/button";
import { Input } from "@/shared/ui/primitives/input";
import { Label } from "@/shared/ui/primitives/label";
import { Avatar } from "@/shared/ui/primitives/avatar";

export function AccountSettings() {
  return (
    <div className="max-w-2xl animate-in fade-in duration-500">
      <h1 className="text-2xl font-bold mb-6 text-text-primary">My Account</h1>
      
      <div className="bg-surface-1 border border-border-default rounded-2xl p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-text-primary">Profile Information</h2>
        
        <div className="flex items-center gap-6 mb-6">
          <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" size="xl" className="w-20 h-20" />
          <div>
            <Button variant="secondary" className="mb-2">Change Avatar</Button>
            <p className="text-xs text-text-tertiary">JPG, GIF or PNG. 1MB max.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@johndoe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea 
              id="bio" 
              className="flex w-full rounded-md border border-border-default bg-surface-1 px-3 py-2 text-sm ring-offset-surface-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary min-h-[100px] resize-y"
              defaultValue="I love building software and chatting with friends!"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </div>

      <div className="bg-surface-1 border border-danger/30 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-danger mb-2">Danger Zone</h2>
        <p className="text-sm text-text-secondary mb-4">Once you delete your account, there is no going back. Please be certain.</p>
        <Button variant="secondary" className="text-danger border-danger! hover:bg-danger hover:text-white">Delete Account</Button>
      </div>
    </div>
  );
}
