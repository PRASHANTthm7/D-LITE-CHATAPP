"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, AlertCircle } from "lucide-react"
import { FloatingLabelInput } from "./FloatingLabelInput"
import { GoogleOAuthButton } from "./GoogleOAuthButton"
import { Button } from "@/shared/ui/primitives/button"
import { Spinner } from "@/shared/ui/feedback/spinner"
import { createClient } from "@/core/auth/supabase-client"
import { useRouter } from "next/navigation"
import { isEmail } from "@/shared/utils/validate"
import Link from "next/link"

export function LoginForm() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [errors, setErrors] = React.useState<{ email?: string; password?: string; form?: string }>({})
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()
  const supabase = createClient()

  const validate = () => {
    const e: typeof errors = {}
    if (!email) e.email = "Email is required"
    else if (!isEmail(email)) e.email = "Enter a valid email"
    if (!password) e.password = "Password is required"
    else if (password.length < 6) e.password = "Password must be at least 6 characters"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setErrors({})
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setErrors({ form: error.message })
      setLoading(false)
    } else {
      router.push("/dashboard")
      router.refresh()
    }
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-1">Welcome back</h1>
      <p className="text-text-secondary mb-8 text-sm">Sign in to continue to D-Lite</p>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FloatingLabelInput
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
        />

        <div className="relative">
          <FloatingLabelInput
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            autoComplete="current-password"
          />
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-4 top-4 text-text-tertiary hover:text-text-primary transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-brand-primary" />
            Remember me for 30 days
          </label>
          <Link href="/forgot-password" className="text-sm text-brand-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        {errors.form && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-danger/10 border border-danger/20"
          >
            <AlertCircle className="w-4 h-4 text-danger flex-shrink-0" />
            <p className="text-sm text-danger">{errors.form}</p>
          </motion.div>
        )}

        <Button type="submit" disabled={loading} className="w-full h-12 text-base shadow-accent">
          {loading ? <Spinner size="sm" /> : "Sign in"}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border-subtle" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-surface-1 px-4 text-xs text-text-tertiary uppercase tracking-wider">or</span>
        </div>
      </div>

      <GoogleOAuthButton onClick={handleGoogle} />

      <p className="mt-8 text-center text-sm text-text-secondary">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-brand-primary font-semibold hover:underline">
          Sign up
        </Link>
      </p>
    </motion.div>
  )
}
