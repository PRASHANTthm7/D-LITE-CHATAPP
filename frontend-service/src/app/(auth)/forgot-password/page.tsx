"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/primitives/button";
import { Input } from "@/shared/ui/primitives/input";
import { Label } from "@/shared/ui/primitives/label";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/core/auth/supabase-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Password reset link sent to your email!");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-surface-1 items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-border-default bg-surface-1 p-8 shadow-xl">
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient shadow-accent">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">D-Lite v2</span>
        </div>

        <h1 className="mb-2 text-center text-2xl font-bold">Reset Password</h1>
        <p className="mb-6 text-center text-sm text-text-secondary">Enter your email and we'll send you a link to reset your password.</p>

        <form onSubmit={handleReset} className="space-y-4">
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

          {message && <p className="text-sm text-brand-primary text-center">{message}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send reset link"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-text-secondary">
          Remembered your password?{" "}
          <Link href="/login" className="text-brand-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
