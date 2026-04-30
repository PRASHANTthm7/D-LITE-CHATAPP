"use client";

import React from "react";
import Link from "next/link";
import { AuthSplitVisual } from "@/features/auth/components/AuthSplitVisual";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen w-full bg-surface">
      <AuthSplitVisual />
      <div className="flex flex-1 flex-col justify-center px-8 sm:px-16 lg:px-24">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset your password</h2>
          <p className="text-gray-500 mb-8">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <Input type="email" required placeholder="name@company.com" />
            </div>
            <Button type="submit" className="w-full py-2.5 text-base" size="lg">
              Send reset link
            </Button>
            <div className="text-center mt-6">
              <Link href="/login" className="text-sm font-semibold text-brand-500 hover:underline">
                Back to sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
