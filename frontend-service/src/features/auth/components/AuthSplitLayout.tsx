import { AnimatedMeshBackground } from "@/features/auth/components/AnimatedMeshBackground"
import { LiveChatPreview } from "@/features/auth/components/LiveChatPreview"
import { MessageCircle } from "lucide-react"
import Link from "next/link"

interface AuthSplitLayoutProps {
  children: React.ReactNode
  showCase?: {
    tagline: string
    sub: string
  }
}

export function AuthSplitLayout({ children, showCase }: AuthSplitLayoutProps) {
  return (
    <div className="flex min-h-screen bg-surface-1">
      {/* Form Side */}
      <div className="flex w-full flex-col justify-center px-8 md:w-[60%] lg:px-24 py-12">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="mb-10 flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient shadow-accent group-hover:scale-105 transition-transform">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight brand-gradient-text">D-Lite v2</span>
          </Link>
          {children}
        </div>
      </div>

      {/* Showcase Side */}
      <div className="hidden w-[40%] md:flex flex-col justify-center bg-surface-3 relative overflow-hidden">
        <AnimatedMeshBackground />
        <div className="relative z-10 mx-auto w-full max-w-sm flex flex-col gap-8 p-8">
          <LiveChatPreview />
          {showCase && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-text-primary mb-2">{showCase.tagline}</h2>
              <p className="text-sm text-text-secondary">{showCase.sub}</p>
              <div className="flex items-center justify-center gap-1 mt-4">
                <span className="text-warning text-lg">★★★★★</span>
                <span className="text-xs text-text-tertiary ml-2">Loved by 1000+ users</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
