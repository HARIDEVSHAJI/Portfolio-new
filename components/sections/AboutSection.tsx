'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, MapPin, Calendar } from 'lucide-react'

const education = [
  {
    institution: 'Lovely Professional University',
    location: 'Phagwara, Punjab',
    degree: 'Bachelor of Technology — Computer Science & Engineering (AI & ML)',
    duration: 'August 2023 – June 2027',
  },
  {
    institution: 'Bharatiya Vidya Bhavan School',
    location: 'Calicut, Kerala',
    degree: 'Intermediate (Class XII)',
    duration: 'Jun 2022 – Mar 2023',
  },
  {
    institution: 'Bharatiya Vidya Bhavan',
    location: 'Calicut, Kerala',
    degree: 'Matriculation (Class X)',
    duration: 'Jun 2021 – May 2022',
  },
]

const stats = [
  { value: '2+', label: 'Years Coding' },
  { value: '10+', label: 'Projects Built' },
  { value: 'AI/ML', label: 'Specialization' },
  { value: 'LPU', label: 'University' },
]

interface Profile {
  bio: string
}

interface Experience {
  id: string
  title: string
  description: string
  date?: string
}

export default function AboutSection({
  profile,
  achievements,
}: {
  profile: Profile
  achievements?: Experience[]
}) {
  return (
    <section id="about" className="section-padding relative">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
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
            Get to know me
          </p>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-syne)' }}>
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-6 text-center border border-white/5 hover:border-accent/20 transition-all duration-300"
            >
              <div
                className="text-3xl font-bold gradient-text mb-2"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                {stat.value}
              </div>
              <div className="text-text-muted text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-20 text-center"
        >
          <p className="text-text-secondary text-lg leading-relaxed">
            {profile.bio}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <GraduationCap size={20} className="text-accent" />
              </div>
              <h3
                className="text-2xl font-bold text-text-primary"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                Education
              </h3>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-4 bottom-4 w-px bg-gradient-to-b from-accent/40 via-accent-2/20 to-transparent" />

              <div className="space-y-8">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pl-12"
                  >
                    {/* Dot */}
                    <div className="absolute left-0 top-2 w-9 h-9 rounded-full bg-surface-2 border border-accent/30 flex items-center justify-center text-accent text-xs font-bold" style={{ fontFamily: 'var(--font-syne)' }}>
                      {i + 1}
                    </div>

                    <div className="glass rounded-xl p-5 border border-white/5 hover:border-accent/15 transition-all duration-300">
                      <h4
                        className="font-semibold text-text-primary mb-1"
                        style={{ fontFamily: 'var(--font-syne)' }}
                      >
                        {edu.institution}
                      </h4>
                      <p className="text-accent text-sm mb-2">{edu.degree}</p>
                      <div className="flex flex-wrap gap-3 text-text-muted text-xs">
                        <span className="flex items-center gap-1">
                          <MapPin size={11} />
                          {edu.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {edu.duration}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Experience / Who I Am */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-accent-2/10 border border-accent-2/20 flex items-center justify-center">
                <Briefcase size={20} className="text-accent-2" />
              </div>
              <h3
                className="text-2xl font-bold text-text-primary"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                Experience
              </h3>
            </div>

            {achievements && achievements.length > 0 ? (
              <div className="space-y-4">
                {achievements.map((exp, i) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-xl p-5 border border-white/5 hover:border-accent-2/20 transition-all duration-300"
                  >
                    <h4
                      className="font-semibold text-text-primary mb-1"
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      {exp.title}
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {exp.description}
                    </p>
                    {exp.date && (
                      <span className="inline-flex items-center gap-1 mt-2 text-text-muted text-xs">
                        <Calendar size={11} />
                        {exp.date}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="glass rounded-2xl p-8 border border-white/5 text-center">
                <p className="text-text-muted mb-2">No experience listed yet.</p>
                <p className="text-text-muted text-sm">
                  Currently focusing on academic projects, open-source contributions, and personal development.
                </p>
              </div>
            )}

            {/* Currently block */}
            <div className="mt-6 glass rounded-xl p-5 border border-accent/10 bg-accent/3">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span
                  className="text-green-400 text-sm font-semibold"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  Currently
                </span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                3rd year B.Tech student at LPU specializing in AI & ML. Actively building projects in machine learning, backend systems, and exploring LLM-based applications.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
