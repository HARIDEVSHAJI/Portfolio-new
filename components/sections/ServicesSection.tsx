'use client'

import { motion } from 'framer-motion'
import { Server, Brain, Layers, Code, Globe, Shield, Cpu, Database } from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  server: <Server size={32} />,
  brain: <Brain size={32} />,
  layers: <Layers size={32} />,
  code: <Code size={32} />,
  globe: <Globe size={32} />,
  shield: <Shield size={32} />,
  cpu: <Cpu size={32} />,
  database: <Database size={32} />,
}

interface Service {
  id: string
  title: string
  description: string
  iconName: string
  order: number
}

const cardColors = [
  { bg: 'rgba(0,212,255,0.05)', border: 'rgba(0,212,255,0.15)', glow: 'rgba(0,212,255,0.1)', icon: '#00d4ff' },
  { bg: 'rgba(168,85,247,0.05)', border: 'rgba(168,85,247,0.15)', glow: 'rgba(168,85,247,0.1)', icon: '#a855f7' },
  { bg: 'rgba(16,185,129,0.05)', border: 'rgba(16,185,129,0.15)', glow: 'rgba(16,185,129,0.1)', icon: '#10b981' },
  { bg: 'rgba(245,158,11,0.05)', border: 'rgba(245,158,11,0.15)', glow: 'rgba(245,158,11,0.1)', icon: '#f59e0b' },
]

export default function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent-2/20 to-transparent" />
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-accent/4 rounded-full blur-3xl" />
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
            What I offer
          </p>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-syne)' }}>
            What I <span className="gradient-text">Do</span>
          </h2>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const colors = cardColors[i % cardColors.length]
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="relative rounded-2xl p-8 border transition-all duration-400 group overflow-hidden"
                style={{
                  background: colors.bg,
                  borderColor: colors.border,
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"
                  style={{ background: colors.glow }}
                />

                {/* Number */}
                <div
                  className="absolute top-6 right-6 text-5xl font-bold opacity-5 group-hover:opacity-10 transition-opacity"
                  style={{ fontFamily: 'var(--font-syne)', color: colors.icon }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div
                  className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${colors.icon}15`, color: colors.icon }}
                >
                  {iconMap[service.iconName] || <Code size={32} />}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3
                    className="text-xl font-bold text-text-primary mb-3"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>

                {/* Bottom line accent */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                  style={{ background: `linear-gradient(90deg, ${colors.icon}, transparent)` }}
                />
              </motion.div>
            )
          })}
        </div>

        {services.length === 0 && (
          <div className="text-center text-text-muted py-20">No services added yet.</div>
        )}
      </div>
    </section>
  )
}
