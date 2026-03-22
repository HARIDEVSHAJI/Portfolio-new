'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Github, ExternalLink, ArrowRight } from 'lucide-react'

interface Project {
  id: string
  title: string
  slug: string
  description: string
  techStack: string[]
  images: string[]
  githubUrl?: string | null
  liveUrl?: string | null
  featured: boolean
}

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

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
            Portfolio
          </p>
          <h1 className="section-title" style={{ fontFamily: 'var(--font-syne)' }}>
            Featured <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-text-secondary mt-4 max-w-xl mx-auto">
            A collection of projects I&apos;ve built — from AI models to full-stack applications.
          </p>
        </motion.div>

        {/* Featured projects */}
        {featured.length > 0 && (
          <div className="mb-16">
            <h2
              className="text-xl font-bold text-text-secondary mb-8 flex items-center gap-3"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              <span className="w-2 h-2 rounded-full bg-accent" />
              Featured
            </h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {featured.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} large />
              ))}
            </div>
          </div>
        )}

        {/* All projects */}
        {rest.length > 0 && (
          <div>
            {featured.length > 0 && (
              <h2
                className="text-xl font-bold text-text-secondary mb-8 flex items-center gap-3"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                <span className="w-2 h-2 rounded-full bg-accent-2" />
                All Projects
              </h2>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        )}

        {projects.length === 0 && (
          <div className="text-center text-text-muted py-20">
            <p className="text-6xl mb-4">🚧</p>
            <p className="text-xl">Projects coming soon...</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ProjectCard({
  project,
  index,
  large,
}: {
  project: Project
  index: number
  large?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-accent/25 transition-all duration-400 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5">
          {/* Image / Placeholder */}
          <div
            className={`relative overflow-hidden bg-surface-2 ${large ? 'h-56' : 'h-44'}`}
          >
            {project.images[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity">
                  {'</>'}
                </div>
              </div>
            )}
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <h3
                className="font-bold text-text-primary text-lg leading-tight group-hover:text-accent transition-colors"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                {project.title}
              </h3>
              <ArrowRight
                size={16}
                className="text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all mt-1 flex-shrink-0"
              />
            </div>

            <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.slice(0, 4).map((tech) => (
                <span key={tech} className="tag text-xs">
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="tag text-xs">+{project.techStack.length - 4}</span>
              )}
            </div>

            {/* Links */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-text-muted hover:text-accent text-xs transition-colors"
                >
                  <Github size={14} />
                  Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-text-muted hover:text-accent text-xs transition-colors"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              )}
              <span className="ml-auto text-xs text-text-muted">View Details →</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
