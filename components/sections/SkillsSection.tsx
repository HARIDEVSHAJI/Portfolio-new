'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const categoryColors: Record<string, string> = {
  'AI / ML': '#00d4ff',
  Backend: '#a855f7',
  Frontend: '#10b981',
  DevOps: '#f59e0b',
  Tools: '#f43f5e',
}

// Icon SVG map for tech skills
function SkillIcon({ name }: { name: string }) {
  const icons: Record<string, string> = {
    python: '🐍',
    tensorflow: '🧠',
    pytorch: '🔥',
    sklearn: '📊',
    pandas: '🐼',
    numpy: '🔢',
    opencv: '👁️',
    langchain: '⛓️',
    nodejs: '🟢',
    fastapi: '⚡',
    express: '🚂',
    django: '🎸',
    postgresql: '🐘',
    mongodb: '🍃',
    redis: '🔴',
    docker: '🐳',
    react: '⚛️',
    typescript: '🔷',
    nextjs: '▲',
    git: '🌿',
    linux: '🐧',
    api: '🔌',
    default: '💻',
  }
  return (
    <span className="text-2xl" role="img">
      {icons[name] || icons.default}
    </span>
  )
}

interface Skill {
  id: string
  name: string
  category: string
  iconName: string
  level: number
}

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const categories = ['All', ...Array.from(new Set(skills.map((s) => s.category)))]
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? skills : skills.filter((s) => s.category === active)

  return (
    <section id="skills" className="section-padding relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-2/4 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p
            className="text-accent text-sm font-medium tracking-widest uppercase mb-4"
            style={{ fontFamily: 'var(--font-jetbrains)' }}
          >
            What I work with
          </p>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-syne)' }}>
            Skills &amp; <span className="gradient-text">Expertise</span>
          </h2>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? 'bg-accent text-background font-semibold'
                  : 'glass border border-white/10 text-text-secondary hover:text-text-primary hover:border-accent/30'
              }`}
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {filtered.map((skill, i) => {
            const color = categoryColors[skill.category] || '#00d4ff'
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass rounded-2xl p-5 border border-white/5 hover:border-white/15 transition-all duration-300 group cursor-default"
              >
                {/* Icon */}
                <div className="mb-3 flex items-center justify-between">
                  <SkillIcon name={skill.iconName} />
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{
                      color,
                      background: `${color}18`,
                      border: `1px solid ${color}30`,
                      fontFamily: 'var(--font-jetbrains)',
                    }}
                  >
                    {skill.category}
                  </span>
                </div>

                {/* Name */}
                <h3
                  className="font-semibold text-text-primary text-sm mb-3"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {skill.name}
                </h3>

                {/* Level bar */}
                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-text-muted text-xs">Proficiency</span>
                  <span
                    className="text-text-muted text-xs"
                    style={{ fontFamily: 'var(--font-jetbrains)' }}
                  >
                    {skill.level}%
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center text-text-muted py-20">No skills in this category yet.</div>
        )}
      </div>
    </section>
  )
}
