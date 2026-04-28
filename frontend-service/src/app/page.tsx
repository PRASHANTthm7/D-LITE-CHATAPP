import { Button } from "@/shared/ui/primitives/button";
import { MessageCircle, Zap, Shield, Globe, Users, Heart } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-1 text-text-primary overflow-hidden relative">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-primary-soft rounded-full mix-blend-multiply filter blur-[100px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-[#ec4899]/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-[#a855f7]/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000" />
      </div>

      <header className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-gradient shadow-accent flex items-center justify-center">
            <MessageCircle className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">D-Lite v2</span>
        </div>
        <nav className="hidden md:flex gap-8 text-text-secondary font-medium">
          <a href="#features" className="hover:text-text-primary transition-colors">Features</a>
          <a href="#security" className="hover:text-text-primary transition-colors">Security</a>
          <a href="#pricing" className="hover:text-text-primary transition-colors">Pricing</a>
        </nav>
        <div className="flex gap-4">
          <Button variant="ghost">Log in</Button>
          <Button>Get Started</Button>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-text-primary">
            Messaging that feels <span className="text-transparent bg-clip-text bg-brand-gradient">instant</span>
          </h1>
          <p className="text-xl text-text-secondary mb-10 max-w-2xl">
            Experience lightning-fast communication with D-Lite v2. Real-time typing, ultra-low latency voice and video calls, and a special AI friend.
          </p>
          <div className="flex gap-4 mb-16">
            <Button size="lg" className="text-base px-8">Get Started</Button>
            <Button variant="secondary" size="lg" className="text-base px-8">Sign In</Button>
          </div>

          {/* Trust Strip */}
          <div className="flex flex-col items-center gap-4 mb-24">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-surface-1 bg-surface-2 flex items-center justify-center overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="Avatar" />
                </div>
              ))}
            </div>
            <p className="text-text-secondary text-sm">Trusted by 100,000+ users worldwide</p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: <Zap className="w-6 h-6 text-brand-primary" />, title: "Ultra Fast", desc: "Optimistic UI ensures your messages are sent instantly." },
            { icon: <Shield className="w-6 h-6 text-success" />, title: "E2E Encrypted", desc: "Your calls and messages remain completely private." },
            { icon: <Globe className="w-6 h-6 text-info" />, title: "Global Calling", desc: "Crystal clear voice and video calls anywhere in the world." },
            { icon: <Users className="w-6 h-6 text-[#a855f7]" />, title: "Group Chats", desc: "Mentions, polls, and rich media sharing for teams." },
            { icon: <Heart className="w-6 h-6 text-[#ec4899]" />, title: "AI Friend", desc: "Chat and talk with your Special Friend AI assistant." },
            { icon: <MessageCircle className="w-6 h-6 text-warning" />, title: "Realtime", desc: "Typing indicators, presence, and live reactions." }
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-2xl bg-surface-1 border border-border-default shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-text-secondary">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-border-subtle bg-surface-2/50 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-brand-gradient flex items-center justify-center">
                <MessageCircle className="text-white w-3 h-3" />
              </div>
              <span className="font-bold">D-Lite v2</span>
            </div>
            <p className="text-sm text-text-secondary">Next-gen messaging platform.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>Features</li>
              <li>Security</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>About</li>
              <li>Blog</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>Privacy</li>
              <li>Terms</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
