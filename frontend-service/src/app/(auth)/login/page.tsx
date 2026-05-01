"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { AuthSplitVisual } from "@/features/auth/components/AuthSplitVisual";
import { SocialButtons } from "@/features/auth/components/SocialButtons";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { Toggle } from "@/shared/components/Toggle";
import { ThemeToggle } from "@/shared/components/ThemeToggle";
import { createClient } from "@/core/auth/supabase-client";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(searchParams.get("error"));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
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
            Don&apos;t have an account?{" "}
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

            <div>
              <label className="block text-sm font-medium themed-text-2 mb-1.5">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="themed-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <Button type="submit" className="w-full py-2.5 text-base" size="lg" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
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
