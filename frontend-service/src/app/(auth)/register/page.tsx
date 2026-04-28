import { AuthSplitLayout } from "@/features/auth/components/AuthSplitLayout"
import { RegisterForm } from "@/features/auth/components/RegisterForm"

export default function RegisterPage() {
  return (
    <AuthSplitLayout showCase={{ tagline: "Start your journey", sub: "Create groups, make HD calls, and let AI draft your messages." }}>
      <RegisterForm />
    </AuthSplitLayout>
  )
}
