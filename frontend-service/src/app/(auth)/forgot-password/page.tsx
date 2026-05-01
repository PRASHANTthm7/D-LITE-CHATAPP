"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthSplitVisual } from "@/features/auth/components/AuthSplitVisual";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { ThemeToggle } from "@/shared/components/ThemeToggle";
import { createClient } from "@/core/auth/supabase-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen w-full themed-canvas">
      <AuthSplitVisual />
      <div className="flex flex-1 flex-col justify-center px-8 sm:px-16 lg:px-24 relative">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold themed-text mb-2">Reset your password</h2>
          <p className="themed-text-2 mb-8">
            Enter your email and we&apos;ll send you a reset link.
          </p>

          {sent ? (
            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-4 text-sm text-green-700 mb-6">
              Reset link sent to <span className="font-semibold">{email}</span>. Check your inbox.
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium themed-text-2 mb-1.5">Email address</label>
                  <Input
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="themed-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full py-2.5 text-base" size="lg" disabled={loading}>
                  {loading ? "Sending…" : "Send reset link"}
                </Button>
              </form>
            </>
          )}

          <div className="text-center mt-6">
            <Link href="/login" className="text-sm font-semibold text-[var(--brand-500)] hover:underline">
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
