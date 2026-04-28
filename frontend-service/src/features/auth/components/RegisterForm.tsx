"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, CheckCircle, XCircle, Loader2, AlertCircle } from "lucide-react"
import { FloatingLabelInput } from "./FloatingLabelInput"
import { GoogleOAuthButton } from "./GoogleOAuthButton"
import { PasswordStrengthMeter } from "./PasswordStrengthMeter"
import { AvatarDropzone } from "./AvatarDropzone"
import { Button } from "@/shared/ui/primitives/button"
import { Spinner } from "@/shared/ui/feedback/spinner"
import { createClient } from "@/core/auth/supabase-client"
import { useRouter } from "next/navigation"
import { isEmail, isValidUsername } from "@/shared/utils/validate"
import { useDebounce } from "@/shared/hooks/use-debounce"
import Link from "next/link"

export function RegisterForm() {
  const [displayName, setDisplayName] = React.useState("")
  const [username, setUsername] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [avatar, setAvatar] = React.useState<File | null>(null)
  const [showPassword, setShowPassword] = React.useState(false)
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [loading, setLoading] = React.useState(false)
  const [usernameStatus, setUsernameStatus] = React.useState<"idle" | "checking" | "available" | "taken">("idle")
  const router = useRouter()
  const supabase = createClient()

  const debouncedUsername = useDebounce(username, 500)

  React.useEffect(() => {
    if (!debouncedUsername || !isValidUsername(debouncedUsername)) {
      setUsernameStatus("idle")
      return
    }
    setUsernameStatus("checking")
    // Simulate availability check (replace with real Supabase query later)
    setTimeout(() => {
      const taken = ["admin", "root", "dlite", "test"].includes(debouncedUsername.toLowerCase())
      setUsernameStatus(taken ? "taken" : "available")
    }, 600)
  }, [debouncedUsername])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!displayName.trim()) e.displayName = "Display name is required"
    if (!username) e.username = "Username is required"
    else if (!isValidUsername(username)) e.username = "3-20 chars, letters, numbers, underscore only"
    else if (usernameStatus === "taken") e.username = "This username is taken"
    if (!email) e.email = "Email is required"
    else if (!isEmail(email)) e.email = "Enter a valid email"
    if (!password) e.password = "Password is required"
    else if (password.length < 8) e.password = "Minimum 8 characters"
    if (password !== confirmPassword) e.confirmPassword = "Passwords don't match"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username, display_name: displayName } },
    })
    if (error) {
      setErrors({ form: error.message })
      setLoading(false)
    } else {
      router.push("/dashboard")
      router.refresh()
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-1">Create account</h1>
      <p className="text-text-secondary mb-8 text-sm">Join thousands of conversations on D-Lite</p>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="flex justify-center">
          <AvatarDropzone value={avatar} onChange={setAvatar} />
        </div>

        <FloatingLabelInput
          label="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          error={errors.displayName}
          autoComplete="name"
        />

        <div className="relative">
          <FloatingLabelInput
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, "_"))}
            error={errors.username}
            autoComplete="username"
          />
          <div className="absolute right-4 top-4">
            {usernameStatus === "checking" && <Loader2 className="w-4 h-4 text-text-tertiary animate-spin" />}
            {usernameStatus === "available" && <CheckCircle className="w-4 h-4 text-success" />}
            {usernameStatus === "taken" && <XCircle className="w-4 h-4 text-danger" />}
          </div>
        </div>

        <FloatingLabelInput
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
        />

        <div>
          <div className="relative">
            <FloatingLabelInput
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-4 top-4 text-text-tertiary hover:text-text-primary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <PasswordStrengthMeter password={password} />
        </div>

        <FloatingLabelInput
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
        />

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

        <Button type="submit" disabled={loading || usernameStatus === "checking"} className="w-full h-12 text-base shadow-accent">
          {loading ? <Spinner size="sm" /> : "Create account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link href="/login" className="text-brand-primary font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </motion.div>
  )
}
