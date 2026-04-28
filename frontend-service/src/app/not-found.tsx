import Link from "next/link"
import { MessageCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-surface-1 text-center px-4">
      <div className="relative">
        <span className="text-8xl font-black text-transparent bg-clip-text"
          style={{ backgroundImage: "linear-gradient(135deg, #f97316, #ec4899, #a855f7)" }}>
          404
        </span>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Page not found</h1>
        <p className="text-text-secondary">The page you're looking for doesn't exist or has moved.</p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-sm font-semibold"
        style={{ background: "linear-gradient(135deg, #f97316, #ec4899, #a855f7)" }}
      >
        <MessageCircle className="w-4 h-4" />
        Go home
      </Link>
    </div>
  )
}
