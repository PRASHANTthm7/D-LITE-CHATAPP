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

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen w-full bg-surface">
      <AuthSplitVisual />

      <div className="flex flex-1 flex-col justify-center px-8 sm:px-16 lg:px-24">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
          <p className="text-gray-500 mb-8">
            Don't have an account?{" "}
            <Link href="/signup" className="text-brand-500 font-semibold hover:underline">
              Create an account
            </Link>
          </p>

          <SocialButtons />

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-surface text-gray-500">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <Input type="email" required placeholder="name@company.com" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  iconRight={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none"
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
                <span className="text-sm text-gray-600">Keep me signed in</span>
              </div>
              <Link href="/forgot-password" className="text-sm font-semibold text-brand-500 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full py-2.5 text-base" size="lg">
              Sign in
            </Button>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-6">
              <ShieldCheck size={16} className="text-success" />
              Protected with 2FA
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
