'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Award, Calendar, Building2 } from 'lucide-react'

interface Certificate {
  id: string
  title: string
  issuer: string
  issueDate: string
  description: string
  imageUrl?: string | null
  credentialUrl?: string | null
}

export default function CertificatesClient({ certificates }: { certificates: Certificate[] }) {
  const [selected, setSelected] = useState<Certificate | null>(null)

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p
            className="text-accent text-sm font-medium tracking-widest uppercase mb-4"
            style={{ fontFamily: 'var(--font-jetbrains)' }}
          >
            Credentials
          </p>
          <h1 className="section-title" style={{ fontFamily: 'var(--font-syne)' }}>
            My <span className="gradient-text">Certificates</span>
          </h1>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto">
            Certifications and credentials earned through continuous learning and professional development.
          </p>
        </motion.div>

        {/* Grid */}
        {certificates.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {certificates.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelected(cert)}
                className="glass rounded-2xl border border-white/5 hover:border-accent/25 transition-all duration-300 cursor-pointer group overflow-hidden"
              >
                {/* Image */}
                <div className="h-44 bg-surface-2 overflow-hidden relative">
                  {cert.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Award size={48} className="text-accent/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent" />
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3
                    className="font-bold text-text-primary text-sm leading-snug mb-2 group-hover:text-accent transition-colors"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {cert.title}
                  </h3>
                  <p className="text-text-muted text-xs flex items-center gap-1.5 mb-1">
                    <Building2 size={11} />
                    {cert.issuer}
                  </p>
                  <p className="text-text-muted text-xs flex items-center gap-1.5">
                    <Calendar size={11} />
                    {cert.issueDate}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-text-muted py-20">
            <Award size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-xl">No certificates yet</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: 'rgba(5,5,13,0.92)', backdropFilter: 'blur(10px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-2xl border border-white/10 max-w-2xl w-full overflow-hidden"
            >
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-text-muted hover:text-white z-10 border border-white/10"
              >
                <X size={16} />
              </button>

              {/* Image */}
              {selected.imageUrl && (
                <div className="h-64 md:h-80 bg-surface-2 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selected.imageUrl}
                    alt={selected.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Details */}
              <div className="p-8">
                <h2
                  className="text-2xl font-bold text-text-primary mb-3"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {selected.title}
                </h2>
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-text-secondary">
                  <span className="flex items-center gap-2">
                    <Building2 size={14} className="text-accent" />
                    {selected.issuer}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar size={14} className="text-accent" />
                    {selected.issueDate}
                  </span>
                </div>
                {selected.description && (
                  <p className="text-text-secondary leading-relaxed mb-6">
                    {selected.description}
                  </p>
                )}
                {selected.credentialUrl && (
                  <a
                    href={selected.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    View Credential
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
