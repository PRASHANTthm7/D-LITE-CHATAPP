"use client";

import { useState } from "react";
import { createClient } from "@/core/auth/supabase-client";
import { useRouter } from "next/navigation";

export function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full bg-brand-primary-soft flex items-center justify-center font-bold text-brand-primary outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
      >
        D
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-border-default bg-surface-1 p-2 shadow-lg animate-in fade-in zoom-in-95 duration-100">
            <div className="px-2 py-2.5 flex items-center gap-2 border-b border-border-subtle mb-1">
              <div className="w-8 h-8 rounded-full bg-surface-3 flex items-center justify-center font-medium">D</div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">User</span>
                <span className="text-xs text-text-tertiary">Active</span>
              </div>
            </div>
            
            <button className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-surface-2 transition-colors text-text-secondary" onClick={() => { router.push('/settings'); setOpen(false); }}>
              Profile
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-surface-2 transition-colors text-text-secondary" onClick={() => { router.push('/settings'); setOpen(false); }}>
              Settings
            </button>
            
            <div className="h-[1px] bg-border-subtle my-1" />
            
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-surface-2 transition-colors text-danger"
            >
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
