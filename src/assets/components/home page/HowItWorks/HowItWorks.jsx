import React from 'react'
import { motion } from 'framer-motion'
import './HowItWorks.css'

const steps = [
  {
    step: 'Step 01',
    title: 'Share Your Vision',
    description: "Tell us about your ideas, goals, and requirements — no matter how big or small. Whether it's a website, an AI tool, or an IoT solution, we start by truly understanding what you envision.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
  },
  {
    step: 'Step 02',
    title: 'We Design & Build, You Stay Updated',
    description: 'Our team gets to work turning your vision into reality, combining creativity with the right technology. We keep you in the loop with regular updates, so you always know exactly how your project is progressing.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="12" y1="4" x2="12" y2="20" strokeDasharray="3 3" />
      </svg>
    ),
  },
  {
    step: 'Step 03',
    title: 'Review & Refine',
    description: 'Once the initial build is ready, we walk you through every detail to ensure it matches your requirements perfectly. Your feedback matters, and we fine-tune until everything feels just right.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 21v-7" />
        <path d="M4 10V3" />
        <path d="M12 21v-9" />
        <path d="M12 8V3" />
        <path d="M20 21v-5" />
        <path d="M20 12V3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    ),
  },
  {
    step: 'Step 04',
    title: 'Launch & Enjoy',
    description: 'Your project goes live on the global server, fully functional and ready to make an impact. Sit back, explore your new digital presence, and watch your business grow.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
]

export function HowItWorks() {
  return (
    <section className="how-it-works-section">
      <div className="how-it-works-container">
        {/* Header section */}
        <motion.div
          className="how-it-works-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="how-it-works-badge">
            <span className="badge-dot"></span>
            How it works
          </div>
          <h2 className="how-it-works-title">
            From initial vision to<br className="desktop-br" /> a live solution, in four steps.
          </h2>
          <p className="how-it-works-subtitle">
            A real process with a defined order — each step depends on the one before it.
          </p>
        </motion.div>

        {/* Steps container */}
        <div className="how-it-works-flow">
          {/* Horizontal connecting line */}
          <div className="flow-line-bg">
            <motion.div
              className="flow-line-progress"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
            />
          </div>

          <div className="steps-grid">
            {steps.map((item, index) => (
              <motion.div
                key={index}
                className="step-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                whileHover={{ y: -6 }}
              >
                <div className="step-icon-wrapper">
                  <div className="step-icon-box">{item.icon}</div>
                </div>
                <div className="step-meta">{item.step}</div>
                <h3 className="step-title">{item.title}</h3>
                <p className="step-description">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
