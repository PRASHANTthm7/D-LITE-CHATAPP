"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { AuthSplitVisual } from "@/features/auth/components/AuthSplitVisual";
import { SocialButtons } from "@/features/auth/components/SocialButtons";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { Toggle } from "@/shared/components/Toggle";
import { ThemeToggle } from "@/shared/components/ThemeToggle";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen w-full themed-canvas">
      <AuthSplitVisual />

      <div className="flex flex-1 flex-col justify-center px-8 sm:px-16 lg:px-24 relative">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold themed-text mb-2">Welcome back</h2>
          <p className="themed-text-2 mb-8">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[var(--brand-500)] font-semibold hover:underline">
              Create an account
            </Link>
          </p>

          <SocialButtons />

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t themed-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 themed-surface themed-text-3">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium themed-text-2 mb-1.5">Email address</label>
              <Input type="email" required placeholder="name@company.com" className="themed-input" />
            </div>

            <div>
              <label className="block text-sm font-medium themed-text-2 mb-1.5">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="themed-input"
                  iconRight={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="themed-text-3 hover:themed-text focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Toggle checked={keepSignedIn} onChange={setKeepSignedIn} />
                <span className="text-sm themed-text-2">Keep me signed in</span>
              </div>
              <Link href="/forgot-password" className="text-sm font-semibold text-[var(--brand-500)] hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full py-2.5 text-base" size="lg">
              Sign in
            </Button>

            <div className="flex items-center justify-center gap-2 text-sm themed-text-3 mt-6">
              <ShieldCheck size={16} className="text-success" />
              Protected with 2FA
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
