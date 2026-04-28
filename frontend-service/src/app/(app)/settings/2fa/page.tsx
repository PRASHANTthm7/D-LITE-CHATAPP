"use client"

import * as React from "react"
import { TwoFactorStepIndicator } from "@/features/settings/components/TwoFactorStepIndicator"
import { OtpInput } from "@/features/settings/components/OtpInput"
import { RecoveryCodes } from "@/features/settings/components/RecoveryCodes"
import { Button } from "@/shared/ui/primitives/button"
import { Shield, Smartphone, QrCode, Key, Download, CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const APPS = [
  { name: "Google Auth", icon: "🔵" },
  { name: "Authy", icon: "🔴" },
  { name: "1Password", icon: "🔵" },
  { name: "Microsoft Auth", icon: "🟣" },
]

type Step = 0 | 1 | 2 | 3

export default function TwoFAPage() {
  const [step, setStep] = React.useState<Step>(0)
  const [otp, setOtp] = React.useState("")
  const [enabled, setEnabled] = React.useState(false)

  if (enabled) {
    return (
      <div className="max-w-lg mx-auto flex flex-col items-center justify-center gap-6 py-12 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-success" />
        </div>
        <h2 className="text-2xl font-bold">2FA Enabled!</h2>
        <p className="text-text-secondary text-center">Your account is now protected with two-factor authentication.</p>
        <Button variant="secondary" onClick={() => { setEnabled(false); setStep(0) }}>Disable 2FA</Button>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#a855f7]/10 flex items-center justify-center">
          <Shield className="w-5 h-5 text-[#a855f7]" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Two-Factor Authentication</h1>
          <p className="text-sm text-text-secondary">Add an extra layer of security</p>
        </div>
      </div>

      <TwoFactorStepIndicator currentStep={step} />

      <div className="mt-8">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-lg font-bold">1. Install an Authenticator App</h2>
              <p className="text-sm text-text-secondary">Download one of these apps on your phone to get started.</p>
              <div className="grid grid-cols-2 gap-3">
                {APPS.map((app) => (
                  <div key={app.name} className="p-4 rounded-xl border border-border-default bg-info/5 flex items-center gap-3">
                    <span className="text-2xl">{app.icon}</span>
                    <span className="text-sm font-medium">{app.name}</span>
                  </div>
                ))}
              </div>
              <Button onClick={() => setStep(1)} className="w-full">I have an app <Smartphone className="w-4 h-4 ml-1.5" /></Button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-lg font-bold">2. Scan QR Code</h2>
              <p className="text-sm text-text-secondary">Open your authenticator app and scan this QR code.</p>
              <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-surface-2 border border-border-default">
                {/* Mock QR Code */}
                <div className="w-44 h-44 bg-white rounded-xl flex items-center justify-center border-4 border-white shadow-lg relative">
                  <div className="grid grid-cols-8 gap-0.5">
                    {Array.from({ length: 64 }, (_, i) => (
                      <div key={i} className={`w-4 h-4 ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`} />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-lg bg-white border border-border-subtle flex items-center justify-center">
                      <span className="text-lg font-black text-brand-primary">D</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary mb-1 text-center">Or enter key manually:</p>
                  <code className="text-xs font-mono bg-surface-3 px-3 py-1.5 rounded-lg tracking-widest">JBSW Y3DP EHPK 3PXP</code>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setStep(0)} className="flex-1">Back</Button>
                <Button onClick={() => setStep(2)} className="flex-1">Next <QrCode className="w-4 h-4 ml-1.5" /></Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-lg font-bold">3. Verify your code</h2>
              <p className="text-sm text-text-secondary">Enter the 6-digit code from your authenticator app.</p>
              <OtpInput value={otp} onChange={setOtp} />
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setStep(1)} className="flex-1">Back</Button>
                <Button onClick={() => setStep(3)} className="flex-1" disabled={otp.length < 6}>Verify <Key className="w-4 h-4 ml-1.5" /></Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-lg font-bold">4. Save Recovery Codes</h2>
              <p className="text-sm text-text-secondary">Use these codes if you ever lose access to your authenticator app.</p>
              <RecoveryCodes />
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setStep(2)} className="flex-1">Back</Button>
                <Button onClick={() => setEnabled(true)} className="flex-1">Enable 2FA <Shield className="w-4 h-4 ml-1.5" /></Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
