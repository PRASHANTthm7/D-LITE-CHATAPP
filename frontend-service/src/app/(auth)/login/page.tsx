"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/primitives/button";
import { Input } from "@/shared/ui/primitives/input";
import { Label } from "@/shared/ui/primitives/label";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/core/auth/supabase-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  const handleGoogleAuth = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-surface-1">
      {/* Form Side - 60% */}
      <div className="flex w-full flex-col justify-center px-8 md:w-[60%] lg:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient shadow-accent">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">D-Lite v2</span>
          </div>

          <h1 className="mb-2 text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="mb-8 text-text-secondary">Please enter your details to sign in.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-brand-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-danger">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-border-default"></div>
            <span className="px-4 text-xs text-text-tertiary uppercase">Or continue with</span>
            <div className="flex-1 border-t border-border-default"></div>
          </div>

          <Button type="button" variant="secondary" className="w-full" onClick={handleGoogleAuth}>
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
            Google
          </Button>

          <p className="mt-8 text-center text-sm text-text-secondary">
            Don't have an account?{" "}
            <Link href="/register" className="text-brand-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Showcase Side - 40% */}
      <div className="hidden w-[40%] flex-col justify-center bg-surface-2 p-12 md:flex relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-primary-soft rounded-full mix-blend-multiply filter blur-[100px]" />
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-[#ec4899]/20 rounded-full mix-blend-multiply filter blur-[100px]" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-sm">
          <div className="rounded-2xl border border-border-default bg-surface-1/80 backdrop-blur-xl p-6 shadow-xl">
            <div className="flex items-center gap-3 border-b border-border-default pb-4">
              <div className="h-10 w-10 rounded-full bg-brand-gradient"></div>
              <div>
                <div className="font-bold">Special Friend</div>
                <div className="text-xs text-success">Online</div>
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <div className="rounded-2xl rounded-tl-sm bg-surface-2 p-3 text-sm">
                Hey! Ready to get started?
              </div>
              <div className="ml-auto w-3/4 rounded-2xl rounded-tr-sm bg-brand-gradient p-3 text-sm text-white">
                Absolutely! The new D-Lite feels amazing.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
