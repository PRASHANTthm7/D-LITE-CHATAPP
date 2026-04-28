export function isEmail(str: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)
}

export function isValidUsername(str: string): boolean {
  return /^[a-zA-Z0-9_]{3,20}$/.test(str)
}

export interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4
  feedback: string
  label: string
  color: string
}

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, feedback: "Enter a password", label: "", color: "" }

  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  const clamped = Math.min(4, score) as 0 | 1 | 2 | 3 | 4

  const map: Record<number, Omit<PasswordStrength, "score">> = {
    0: { feedback: "Too short", label: "Weak", color: "bg-danger" },
    1: { feedback: "Add uppercase letters", label: "Weak", color: "bg-danger" },
    2: { feedback: "Add numbers or symbols", label: "Fair", color: "bg-warning" },
    3: { feedback: "Almost there!", label: "Good", color: "bg-info" },
    4: { feedback: "Strong password!", label: "Strong", color: "bg-success" },
  }

  return { score: clamped, ...map[clamped] }
}
