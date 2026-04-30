"use client";

import React from "react";
import { AuthSplitVisual } from "@/features/auth/components/AuthSplitVisual";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen w-full bg-surface">
      <AuthSplitVisual />
      <div className="flex flex-1 flex-col justify-center px-8 sm:px-16 lg:px-24">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Set new password</h2>
          <p className="text-gray-500 mb-8">
            Please enter your new password below.
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">New password</label>
              <Input type="password" required placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm new password</label>
              <Input type="password" required placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full py-2.5 text-base" size="lg">
              Save new password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
