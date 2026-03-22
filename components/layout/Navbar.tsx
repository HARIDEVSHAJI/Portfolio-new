'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Menu, X, FileText } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Projects', href: '/projects' },
  { label: 'Certificates', href: '/certificates' },
]

interface NavbarProps {
  cvUrl?: string | null
}

export default function Navbar({ cvUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      // Update active section
      const sections = ['home', 'about', 'skills', 'services', 'achievements']
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    if (href.startsWith('#')) {
      const id = href.slice(1)
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-strong border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <span
                className="font-display font-bold text-xl tracking-tight gradient-text"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                &lt;/dev&gt;
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-accent to-accent-2 group-hover:w-full transition-all duration-300" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isHash = link.href.startsWith('#')
              const isActive = isHash && active === link.href.slice(1)
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                    isActive
                      ? 'text-accent'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'rgba(0, 212, 255, 0.08)' }}
                    />
                  )}
                  {!isHash ? (
                    <Link href={link.href} className="relative z-10">
                      {link.label}
                    </Link>
                  ) : (
                    <span className="relative z-10">{link.label}</span>
                  )}
                </button>
              )
            })}

            {/* Contact highlighted */}
            <Link
              href="#contact"
              onClick={() => handleNavClick('#contact')}
              className="ml-2 px-4 py-2 text-sm font-semibold rounded-lg border border-accent/40 text-accent hover:bg-accent/10 hover:border-accent transition-all duration-200"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Contact
            </Link>

            {/* CV Download — highlighted */}
            {cvUrl ? (
              <a
                href={cvUrl}
                download
                className="ml-2 flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg btn-primary"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                <Download size={14} />
                Resume
              </a>
            ) : (
              <button
                disabled
                className="ml-2 flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-white/5 text-text-muted cursor-not-allowed"
                title="No CV uploaded yet"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                <FileText size={14} />
                Resume
              </button>
            )}
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg glass text-text-secondary hover:text-text-primary transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 nav-overlay flex flex-col pt-24 px-6"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-4 py-4 text-xl font-semibold text-text-secondary hover:text-accent border-b border-white/5 transition-colors"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {link.href.startsWith('#') ? (
                    link.label
                  ) : (
                    <Link href={link.href}>{link.label}</Link>
                  )}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-4"
              >
                <Link
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center py-4 rounded-xl border border-accent/40 text-accent font-semibold text-lg mb-3"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  Contact
                </Link>
                {cvUrl && (
                  <a
                    href={cvUrl}
                    download
                    className="flex items-center justify-center gap-2 py-4 rounded-xl btn-primary text-lg font-semibold"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    <Download size={18} />
                    Download Resume
                  </a>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
