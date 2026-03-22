'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Loader2, CheckCircle } from 'lucide-react'

interface Profile {
  email: string
  location: string
}

export default function ContactSection({ profile }: { profile: Profile }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Failed to send')
      }
      setSent(true)
      setForm({ name: '', email: '', message: '' })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="section-padding relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent-2/4 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p
            className="text-accent text-sm font-medium tracking-widest uppercase mb-4"
            style={{ fontFamily: 'var(--font-jetbrains)' }}
          >
            Let&apos;s connect
          </p>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-syne)' }}>
            Get In <span className="gradient-text">Touch</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div>
              <h3
                className="text-2xl font-bold text-text-primary mb-3"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                Let&apos;s Talk
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Have a project in mind, a question, or just want to say hi? I&apos;m always
                open to new opportunities and collaborations.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-4 glass rounded-xl p-4 border border-white/5 hover:border-accent/20 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-text-muted text-xs mb-0.5">Email</p>
                  <p
                    className="text-text-primary text-sm font-medium"
                    style={{ fontFamily: 'var(--font-jetbrains)' }}
                  >
                    {profile.email}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 glass rounded-xl p-4 border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-accent-2/10 flex items-center justify-center text-accent-2">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-text-muted text-xs mb-0.5">Location</p>
                  <p
                    className="text-text-primary text-sm font-medium"
                    style={{ fontFamily: 'var(--font-jakarta)' }}
                  >
                    {profile.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="glass rounded-xl p-4 border border-green-500/20 bg-green-500/4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-sm font-semibold" style={{ fontFamily: 'var(--font-syne)' }}>
                  Available for Opportunities
                </span>
              </div>
              <p className="text-text-muted text-xs mt-2">
                Open to internships, freelance projects, and collaborations.
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-8 border border-white/5">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                  <h3
                    className="text-xl font-bold text-text-primary mb-2"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="btn-outline text-sm"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-text-muted text-xs font-medium mb-2 uppercase tracking-wider"
                        style={{ fontFamily: 'var(--font-jetbrains)' }}
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        required
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-text-muted text-xs font-medium mb-2 uppercase tracking-wider"
                        style={{ fontFamily: 'var(--font-jetbrains)' }}
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                        required
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-text-muted text-xs font-medium mb-2 uppercase tracking-wider"
                      style={{ fontFamily: 'var(--font-jetbrains)' }}
                    >
                      Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your project or just say hi..."
                      required
                      rows={6}
                      className="form-input resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-4"
                  >
                    {loading ? (
                      <><Loader2 size={18} className="animate-spin" /> Sending...</>
                    ) : (
                      <><Send size={18} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
