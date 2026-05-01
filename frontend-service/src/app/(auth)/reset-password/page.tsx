"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthSplitVisual } from "@/features/auth/components/AuthSplitVisual";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { ThemeToggle } from "@/shared/components/ThemeToggle";
import { PasswordStrengthMeter } from "@/features/auth/components/PasswordStrengthMeter";
import { createClient } from "@/core/auth/supabase-client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.updateUser({ password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

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
          <h2 className="text-3xl font-bold themed-text mb-2">Set new password</h2>
          <p className="themed-text-2 mb-8">
            Choose a strong password for your account.
          </p>

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium themed-text-2 mb-1.5">New password</label>
              <Input
                type="password"
                required
                placeholder="••••••••"
                className="themed-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordStrengthMeter password={password} />
            </div>
            <div>
              <label className="block text-sm font-medium themed-text-2 mb-1.5">Confirm new password</label>
              <Input
                type="password"
                required
                placeholder="••••••••"
                className="themed-input"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full py-2.5 text-base" size="lg" disabled={loading}>
              {loading ? "Saving…" : "Save new password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
