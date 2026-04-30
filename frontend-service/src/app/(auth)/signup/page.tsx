"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthSplitVisual } from "@/features/auth/components/AuthSplitVisual";
import { SocialButtons } from "@/features/auth/components/SocialButtons";
import { StatBadges } from "@/features/auth/components/StatBadges";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { PasswordStrengthMeter } from "@/features/auth/components/PasswordStrengthMeter";
import { UsernameAvailability } from "@/features/auth/components/UsernameAvailability";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen w-full bg-surface">
      <AuthSplitVisual />

      <div className="flex flex-1 flex-col justify-center px-8 sm:px-16 lg:px-24 overflow-y-auto py-12">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an account</h2>
          <p className="text-gray-500 mb-8">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-500 font-semibold hover:underline">
              Sign in
            </Link>
          </p>

          <StatBadges />

          <SocialButtons />

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-surface text-gray-500">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">First name</label>
                <Input required placeholder="Jane" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Last name</label>
                <Input required placeholder="Doe" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
              <Input
                required
                placeholder="janedoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <UsernameAvailability username={username} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <Input type="email" required placeholder="jane@company.com" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <Input
                type="password"
                required
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordStrengthMeter password={password} />
            </div>

            <div className="flex items-start gap-3 mt-4">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="w-4 h-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500"
                />
              </div>
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <Link href="#" className="font-medium text-brand-500 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="font-medium text-brand-500 hover:underline">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            <Button type="submit" className="w-full py-2.5 text-base mt-2" size="lg">
              Create account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
