'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Twitter, Instagram, Mail, Download } from 'lucide-react'
import Link from 'next/link'

const HeroGlobe = dynamic(() => import('@/components/three/HeroGlobe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-48 h-48 rounded-full border border-accent/20 animate-pulse" />
    </div>
  ),
})

interface Profile {
  tagline: string
  bio: string
  github: string
  linkedin: string
  twitter: string
  instagram: string
  email: string
  cvUrl?: string | null
  isAvailable: boolean
}

export default function HeroSection({ profile }: { profile: Profile }) {
  const socials = [
    { icon: Github, href: profile.github, label: 'GitHub' },
    { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: profile.twitter, label: 'Twitter' },
    { icon: Instagram, href: profile.instagram, label: 'Instagram' },
    { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
  ].filter((s) => s.href && s.href !== '')

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden grid-bg"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-2/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center pt-24 pb-16 relative z-10">
        {/* Left — Text */}
        <div>
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="tag">
              <span
                className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  profile.isAvailable ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                }`}
              />
              {profile.isAvailable ? 'Available for Opportunities' : 'Currently Busy'}
            </span>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p
              className="text-text-secondary text-lg mb-2 uppercase tracking-widest font-medium"
              style={{ fontFamily: 'var(--font-jetbrains)' }}
            >
              Hello, I&apos;m
            </p>
            <h1
              className="font-display font-extrabold leading-none tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(3rem, 8vw, 6rem)' }}
            >
              <span className="text-text-primary">HARIDEV</span>
              <br />
              <span className="gradient-text">SHAJI</span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-text-secondary mb-4 font-medium"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {profile.tagline}
          </motion.p>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-text-secondary leading-relaxed mb-8 max-w-lg"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            {profile.bio}
          </motion.p>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-3 mb-10"
          >
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                title={label}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/40 border border-white/5 transition-all duration-200 hover:scale-110"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            {profile.cvUrl && (
              <a
                href={profile.cvUrl}
                download
                className="btn-primary flex items-center gap-2"
              >
                <Download size={16} />
                Download Resume
              </a>
            )}
            <Link
              href="/projects"
              className="btn-outline"
            >
              View My Work
            </Link>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-7 py-3 rounded-lg text-text-secondary border border-white/10 hover:border-white/20 hover:text-text-primary transition-all duration-200 font-semibold text-sm"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Contact Me
            </button>
          </motion.div>
        </div>

        {/* Right — 3D Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[480px] lg:h-[600px]"
        >
          {/* Glow ring behind globe */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-pulse-glow" />
          </div>
          <HeroGlobe />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted hover:text-accent transition-colors"
      >
        <span className="text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-jetbrains)' }}>
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  )
}
