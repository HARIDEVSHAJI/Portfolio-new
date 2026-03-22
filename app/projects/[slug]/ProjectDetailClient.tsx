'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Github,
  ExternalLink,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Circle,
} from 'lucide-react'

interface Project {
  id: string
  title: string
  slug: string
  description: string
  longDesc: string
  techStack: string[]
  images: string[]
  githubUrl?: string | null
  liveUrl?: string | null
  featured: boolean
}

export default function ProjectDetailClient({ project }: { project: Project }) {
  const [currentImg, setCurrentImg] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const images = project.images.length > 0 ? project.images : []

  const next = useCallback(() => {
    if (images.length <= 1) return
    setCurrentImg((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prev = () => {
    if (images.length <= 1) return
    setCurrentImg((prev) => (prev - 1 + images.length) % images.length)
  }

  // Auto-slide
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return
    const timer = setInterval(next, 3500)
    return () => clearInterval(timer)
  }, [isAutoPlaying, next, images.length])

  return (
    <div className="pt-28 pb-24">
      <div className="container mx-auto px-6">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-sm"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h1
              className="section-title mb-4"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {project.title}
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl">
              {project.description}
            </p>
          </motion.div>

          {/* Image Slider */}
          {images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden mb-12 glass border border-white/5"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div className="relative h-[400px] md:h-[520px] bg-surface-2">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImg}
                    src={images[currentImg]}
                    alt={`${project.title} screenshot ${currentImg + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>

                {/* Controls */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:border-accent/40 hover:text-accent transition-all z-10"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:border-accent/40 hover:text-accent transition-all z-10"
                    >
                      <ChevronRight size={18} />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImg(i)}
                          className="transition-all duration-300"
                        >
                          <Circle
                            size={8}
                            className={`transition-all ${
                              i === currentImg
                                ? 'text-accent fill-accent scale-125'
                                : 'text-white/40 fill-white/20'
                            }`}
                          />
                        </button>
                      ))}
                    </div>

                    {/* Counter */}
                    <div className="absolute top-4 right-4 glass rounded-full px-3 py-1 text-xs text-text-secondary z-10">
                      {currentImg + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto bg-surface">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImg(i)}
                      className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        i === currentImg
                          ? 'border-accent opacity-100'
                          : 'border-transparent opacity-50 hover:opacity-75'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`thumb ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* No images placeholder */}
          {images.length === 0 && (
            <div className="rounded-2xl border border-white/5 bg-surface h-64 flex items-center justify-center mb-12">
              <p className="text-text-muted">No images uploaded for this project</p>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <h2
                className="text-2xl font-bold text-text-primary mb-5"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                About this Project
              </h2>
              {project.longDesc ? (
                <div className="text-text-secondary leading-relaxed space-y-4">
                  {project.longDesc.split('\n').map((para, i) =>
                    para.trim() ? <p key={i}>{para}</p> : null
                  )}
                </div>
              ) : (
                <p className="text-text-secondary leading-relaxed">{project.description}</p>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Tech Stack */}
              <div className="glass rounded-2xl p-6 border border-white/5">
                <h3
                  className="text-sm font-semibold text-text-muted uppercase tracking-widest mb-4"
                  style={{ fontFamily: 'var(--font-jetbrains)' }}
                >
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              {(project.githubUrl || project.liveUrl) && (
                <div className="glass rounded-2xl p-6 border border-white/5 space-y-3">
                  <h3
                    className="text-sm font-semibold text-text-muted uppercase tracking-widest mb-4"
                    style={{ fontFamily: 'var(--font-jetbrains)' }}
                  >
                    Links
                  </h3>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 w-full py-3 px-4 rounded-xl border border-white/10 hover:border-accent/30 hover:text-accent text-text-secondary transition-all duration-200 text-sm font-medium"
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      <Github size={16} />
                      View Source Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 w-full py-3 px-4 rounded-xl btn-primary text-sm font-medium"
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
