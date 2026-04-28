import { AuthSplitLayout } from "@/features/auth/components/AuthSplitLayout"
import { LoginForm } from "@/features/auth/components/LoginForm"

export default function LoginPage() {
  return (
    <AuthSplitLayout showCase={{ tagline: "Join the conversation", sub: "Connect with friends, collaborate in groups, and let AI supercharge your chats." }}>
      <LoginForm />
    </AuthSplitLayout>
  )
}
