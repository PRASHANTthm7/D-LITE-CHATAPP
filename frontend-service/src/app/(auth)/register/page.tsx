"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/primitives/button";
import { Input } from "@/shared/ui/primitives/input";
import { Label } from "@/shared/ui/primitives/label";
import { MessageCircle, UploadCloud } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/core/auth/supabase-client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
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

          <h1 className="mb-2 text-3xl font-bold tracking-tight">Create an account</h1>
          <p className="mb-8 text-text-secondary">Sign up to get started.</p>

          <form onSubmit={handleRegister} className="space-y-4">
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
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex gap-1 mt-2">
                 <div className={`h-1 w-1/4 rounded-full ${password.length > 0 ? 'bg-danger' : 'bg-surface-2'}`} />
                 <div className={`h-1 w-1/4 rounded-full ${password.length > 4 ? 'bg-warning' : 'bg-surface-2'}`} />
                 <div className={`h-1 w-1/4 rounded-full ${password.length > 8 ? 'bg-info' : 'bg-surface-2'}`} />
                 <div className={`h-1 w-1/4 rounded-full ${password.length > 10 ? 'bg-success' : 'bg-surface-2'}`} />
              </div>
            </div>

            {error && <p className="text-sm text-danger">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing up..." : "Sign up"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-text-secondary">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Showcase Side - 40% */}
      <div className="hidden w-[40%] flex-col justify-center bg-surface-2 p-12 md:flex relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-[#a855f7]/20 rounded-full mix-blend-multiply filter blur-[100px]" />
          <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[60%] bg-[#ec4899]/20 rounded-full mix-blend-multiply filter blur-[100px]" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-sm text-center">
            <h2 className="text-2xl font-bold mb-4 text-text-primary">Join the conversation.</h2>
            <p className="text-text-secondary">Create groups, make global calls, and stay connected instantly.</p>
        </div>
      </div>
    </div>
  );
}
