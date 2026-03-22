'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, Loader2, ShieldCheck } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid email or password')
      setLoading(false)
      return
    }

    const session = await getSession()
    if (session) {
      router.push('/admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-background grid-bg flex items-center justify-center p-6">
      {/* BG glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent-2/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 mb-4">
            <ShieldCheck size={32} className="text-accent" />
          </div>
          <h1
            className="text-3xl font-bold gradient-text mb-2"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Admin Panel
          </h1>
          <p className="text-text-muted text-sm">
            Haridev&apos;s Portfolio CMS — Restricted Access
          </p>
        </div>

        {/* Card */}
        <div className="glass-strong rounded-2xl p-8 border border-white/8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="block text-text-muted text-xs font-medium uppercase tracking-wider mb-2"
                style={{ fontFamily: 'var(--font-jetbrains)' }}
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@haridev.dev"
                  required
                  className="form-input pl-11"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-text-muted text-xs font-medium uppercase tracking-wider mb-2"
                style={{ fontFamily: 'var(--font-jetbrains)' }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="form-input pl-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm flex items-center gap-2 bg-red-400/8 rounded-lg px-4 py-3 border border-red-400/20"
              >
                <Lock size={14} />
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 py-4 mt-2"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> Verifying...</>
              ) : (
                <><ShieldCheck size={18} /> Sign In to Admin</>
              )}
            </button>
          </form>

          <p className="text-center text-text-muted text-xs mt-6">
            This panel is for authorized access only.
            <br />
            Navigate to{' '}
            <a href="/" className="text-accent hover:underline">
              homepage
            </a>{' '}
            if you landed here by mistake.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
