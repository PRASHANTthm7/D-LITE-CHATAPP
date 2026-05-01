"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthSplitVisual } from "@/features/auth/components/AuthSplitVisual";
import { SocialButtons } from "@/features/auth/components/SocialButtons";
import { StatBadges } from "@/features/auth/components/StatBadges";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { PasswordStrengthMeter } from "@/features/auth/components/PasswordStrengthMeter";
import { UsernameAvailability } from "@/features/auth/components/UsernameAvailability";
import { ThemeToggle } from "@/shared/components/ThemeToggle";
import { createClient } from "@/core/auth/supabase-client";

export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: `${firstName} ${lastName}`.trim(),
          username,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="flex min-h-screen w-full themed-canvas items-center justify-center">
        <div className="w-full max-w-md mx-auto text-center px-8">
          <div className="w-16 h-16 rounded-full brand-grad flex items-center justify-center text-white text-2xl mx-auto mb-6">✓</div>
          <h2 className="text-2xl font-bold themed-text mb-2">Check your email</h2>
          <p className="themed-text-2 mb-6">
            We sent a confirmation link to <span className="font-semibold">{email}</span>.
            Click it to activate your account.
          </p>
          <Link href="/login" className="text-sm font-semibold text-[var(--brand-500)] hover:underline">
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full themed-canvas">
      <AuthSplitVisual />

      <div className="flex flex-1 flex-col justify-center px-8 sm:px-16 lg:px-24 overflow-y-auto py-12 relative">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold themed-text mb-2">Create an account</h2>
          <p className="themed-text-2 mb-8">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--brand-500)] font-semibold hover:underline">
              Sign in
            </Link>
          </p>

          <StatBadges />
          <SocialButtons />

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t themed-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 themed-surface themed-text-3">Or continue with email</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium themed-text-2 mb-1.5">First name</label>
                <Input required placeholder="Jane" className="themed-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium themed-text-2 mb-1.5">Last name</label>
                <Input required placeholder="Doe" className="themed-input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium themed-text-2 mb-1.5">Username</label>
              <Input
                required
                placeholder="janedoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="themed-input"
              />
              <UsernameAvailability username={username} />
            </div>

            <div>
              <label className="block text-sm font-medium themed-text-2 mb-1.5">Email address</label>
              <Input type="email" required placeholder="jane@company.com" className="themed-input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium themed-text-2 mb-1.5">Password</label>
              <Input
                type="password"
                required
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="themed-input"
              />
              <PasswordStrengthMeter password={password} />
            </div>

            <div className="flex items-start gap-3 mt-4">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="w-4 h-4 text-[var(--brand-600)] themed-border rounded focus:ring-[var(--brand-500)]"
                />
              </div>
              <label htmlFor="terms" className="text-sm themed-text-2">
                I agree to the{" "}
                <span className="font-medium text-[var(--brand-500)]">Terms of Service</span>
                {" "}and{" "}
                <span className="font-medium text-[var(--brand-500)]">Privacy Policy</span>.
              </label>
            </div>

            <Button type="submit" className="w-full py-2.5 text-base mt-2" size="lg" disabled={loading}>
              {loading ? "Creating account…" : "Create account"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
