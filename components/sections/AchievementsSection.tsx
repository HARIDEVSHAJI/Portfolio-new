'use client'

import { motion } from 'framer-motion'
import { Trophy, Star, Award, Cloud, Zap, Target, Medal, Flame } from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  trophy: <Trophy size={24} />,
  star: <Star size={24} />,
  award: <Award size={24} />,
  cloud: <Cloud size={24} />,
  zap: <Zap size={24} />,
  target: <Target size={24} />,
  medal: <Medal size={24} />,
  flame: <Flame size={24} />,
}

interface Achievement {
  id: string
  title: string
  description: string
  iconName: string
  date: string
}

export default function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
  return (
    <section id="achievements" className="section-padding relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/4 rounded-full blur-3xl -translate-y-1/2" />
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
            Milestones
          </p>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-syne)' }}>
            Achieve<span className="gradient-text">ments</span>
          </h2>
        </motion.div>

        {/* Achievements grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass rounded-2xl p-6 border border-white/5 hover:border-accent/20 transition-all duration-300 group"
            >
              {/* Icon + Date row */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent-2/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                  {iconMap[ach.iconName] || <Trophy size={24} />}
                </div>
                {ach.date && (
                  <span
                    className="text-xs text-text-muted border border-white/10 px-2 py-1 rounded-full"
                    style={{ fontFamily: 'var(--font-jetbrains)' }}
                  >
                    {ach.date}
                  </span>
                )}
              </div>

              <h3
                className="font-bold text-text-primary text-base mb-2"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                {ach.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {ach.description}
              </p>
            </motion.div>
          ))}
        </div>

        {achievements.length === 0 && (
          <div className="text-center text-text-muted py-20">No achievements listed yet.</div>
        )}
      </div>
    </section>
  )
}
