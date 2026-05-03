"use client";

import { useState } from "react";
import Link from "next/link";
import { Camera, Mars, Venus, Check, Shield, Lock, FileText } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { AuthSplitVisual } from "@/features/auth/components/AuthSplitVisual";
import { SocialButtons } from "@/features/auth/components/SocialButtons";
import { StatBadges } from "@/features/auth/components/StatBadges";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { PasswordStrengthMeter } from "@/features/auth/components/PasswordStrengthMeter";
import { UsernameAvailability } from "@/features/auth/components/UsernameAvailability";
import { ThemeToggle } from "@/shared/components/ThemeToggle";
import { createClient } from "@/core/auth/supabase-client";

type Gender = "male" | "female";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState<Gender | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleAvatarUpload = (result: { info?: unknown }) => {
    const info = result.info;
    if (info && typeof info === "object" && "secure_url" in info) {
      setAvatarUrl(info.secure_url as string);
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!gender) {
      setError("Please select your gender.");
      return;
    }
    if (!termsAccepted) {
      setError("Please accept the Terms & Privacy Policy to continue.");
      return;
    }
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
          gender,
          avatar_url: avatarUrl ?? undefined,
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

  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || "?";

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

            {/* ── Profile Picture ── */}
            <div className="flex flex-col items-center gap-3 py-2">
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? "dlite_avatars" : "ml_default"}
                onSuccess={handleAvatarUpload}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="relative group cursor-pointer focus:outline-none"
                  >
                    {/* Avatar circle */}
                    <div
                      className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center text-white text-2xl font-bold border-2 transition-all"
                      style={{
                        background: avatarUrl ? "transparent" : "var(--grad-brand)",
                        borderColor: "var(--border-strong)",
                        boxShadow: "var(--shadow-card)",
                      }}
                    >
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span>{initials}</span>
                      )}
                    </div>

                    {/* Camera overlay */}
                    <div
                      className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: "rgba(0,0,0,0.45)" }}
                    >
                      <Camera size={22} className="text-white" />
                    </div>

                    {/* Add badge */}
                    <div
                      className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center border-2 border-[var(--canvas-solid)]"
                      style={{ background: "var(--grad-brand)" }}
                    >
                      <Camera size={12} className="text-white" />
                    </div>
                  </button>
                )}
              </CldUploadWidget>

              <p className="text-xs themed-text-3">
                {avatarUrl ? (
                  <button
                    type="button"
                    onClick={() => setAvatarUrl(null)}
                    className="text-danger hover:underline"
                  >
                    Remove photo
                  </button>
                ) : (
                  "Click to add a profile photo"
                )}
              </p>
            </div>

            {/* ── Name ── */}
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

            {/* ── Gender ── */}
            <div>
              <label className="block text-sm font-medium themed-text-2 mb-2">Gender</label>
              <div className="grid grid-cols-2 gap-3">
                {(["male", "female"] as Gender[]).map((g) => {
                  const active = gender === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className="flex items-center justify-center gap-2.5 py-2.5 rounded-xl border text-sm font-semibold transition-all"
                      style={{
                        background: active ? "var(--grad-brand)" : "var(--surface)",
                        borderColor: active ? "transparent" : "var(--border)",
                        color: active ? "#fff" : "var(--text-secondary)",
                        boxShadow: active ? "var(--shadow-glow)" : "none",
                      }}
                    >
                      {g === "male" ? <Mars size={16} /> : <Venus size={16} />}
                      {g === "male" ? "Male" : "Female"}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Username ── */}
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

            {/* ── Email ── */}
            <div>
              <label className="block text-sm font-medium themed-text-2 mb-1.5">Email address</label>
              <Input type="email" required placeholder="jane@company.com" className="themed-input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            {/* ── Password ── */}
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

            {/* ── Terms ── */}
            <button
              type="button"
              onClick={() => setTermsAccepted((v: boolean) => !v)}
              className="w-full rounded-2xl border p-4 flex items-start gap-4 text-left transition-all focus:outline-none"
              style={{
                background: termsAccepted ? "var(--grad-brand-soft)" : "var(--surface)",
                borderColor: termsAccepted ? "var(--border-strong)" : "var(--border)",
                boxShadow: termsAccepted ? "var(--shadow-card)" : "none",
              }}
            >
              {/* Custom animated checkbox */}
              <div
                className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center mt-0.5 transition-all border"
                style={{
                  background: termsAccepted ? "var(--grad-brand)" : "var(--surface)",
                  borderColor: termsAccepted ? "transparent" : "var(--border)",
                }}
              >
                {termsAccepted && <Check size={12} className="text-white" strokeWidth={3} />}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold themed-text mb-0.5">
                  I agree to the Terms &amp; Privacy Policy
                </p>
                <p className="text-xs themed-text-3 leading-relaxed">
                  By creating an account you accept our{" "}
                  <span style={{ color: "var(--brand-text)" }}>Terms of Service</span>
                  {" "}and{" "}
                  <span style={{ color: "var(--brand-text)" }}>Privacy Policy</span>.
                  Your data is encrypted and never shared.
                </p>

                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-[10px] themed-text-3">
                    <Shield size={10} style={{ color: "var(--success)" }} /> End-to-end encrypted
                  </span>
                  <span className="flex items-center gap-1 text-[10px] themed-text-3">
                    <Lock size={10} style={{ color: "var(--brand-text)" }} /> No spam, ever
                  </span>
                  <span className="flex items-center gap-1 text-[10px] themed-text-3">
                    <FileText size={10} style={{ color: "var(--accent-purple)" }} /> MIT licensed
                  </span>
                </div>
              </div>
            </button>

            <Button type="submit" className="w-full py-2.5 text-base mt-2" size="lg" disabled={loading}>
              {loading ? "Creating account…" : "Create account"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
