import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowDown, Download, Github, Linkedin } from 'lucide-react'
import { profile } from '../data/profile'
import { useResume } from '../hooks/useResume'

function PhotoVisual({ reduce }: { reduce: boolean | null }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm sm:max-w-md">
      <div aria-hidden className="absolute inset-6 rounded-full bg-violet/30 blur-3xl" style={{ animation: 'pulse-glow 6s ease-in-out infinite' }} />
      <div aria-hidden className="absolute inset-0 rounded-full border border-line" style={{ animation: 'orbit 60s linear infinite' }}>
        <span className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric" />
      </div>
      <div aria-hidden className="absolute inset-3 rounded-full border border-dashed border-line" style={{ animation: 'orbit 45s linear infinite reverse' }}>
        <span className="absolute bottom-0 left-1/2 size-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-violet" />
      </div>
      {failed ? (
        // Shown only if /profile.png is missing: save your photo as public/profile.png
        <div role="img" aria-label="Nithin Kumar" className="absolute inset-6 grid place-items-center rounded-full border border-line bg-card font-display text-7xl font-bold">
          <span className="grad-text">{profile.initials}</span>
        </div>
      ) : (
        <img
          src="/profile.png"
          alt="Portrait of Nithin Kumar"
          width={800}
          height={800}
          onError={() => setFailed(true)}
          className="absolute inset-6 h-[calc(100%-3rem)] w-[calc(100%-3rem)] rounded-full border border-white/10 object-cover shadow-2xl shadow-violet/20"
        />
      )}
    </div>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [showNote, setShowNote] = useState(false)
  const resume = useResume(profile.resumePath)

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI((n) => (n + 1) % profile.phrases.length), 2600)
    return () => clearInterval(t)
  }, [reduce])

  const container = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.09 } } }
  const item = reduce
    ? { hidden: {}, show: {} }
    : { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } } }

  const btn = 'inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold transition-transform active:scale-95'

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-24 sm:pt-28">
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 size-[28rem] -translate-y-1/2 rounded-full bg-violet/10 blur-[100px]" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <motion.div variants={container} initial="hidden" animate="show" className="min-w-0">
          <motion.p variants={item} className="mb-5 text-2xl font-semibold text-muted sm:text-3xl">
            Hi, I'm {profile.name} 👋
          </motion.p>
          <motion.h1 variants={item} className="max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {profile.headline} <span className="grad-text">{profile.headlineAccent}</span>
          </motion.h1>
          <motion.p variants={item} className="mt-6 flex min-h-9 flex-wrap items-center gap-x-2 gap-y-1 font-display text-lg text-accent" aria-live="off">
            <span className="text-muted">I work as a</span>
            <span className="relative inline-block min-w-[15ch]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="inline-block"
                >
                  {profile.phrases[i]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.p>
          <motion.p variants={item} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className={`${btn} bg-gradient-to-r from-violet to-electric text-white shadow-lg shadow-violet/25 hover:brightness-110`}>
              Explore My Projects
            </a>
            {resume ? (
              <a href={profile.resumePath} download className={`${btn} border border-line bg-card hover:border-violet`}>
                <Download size={16} aria-hidden /> Download Resume
              </a>
            ) : (
              <button type="button" onClick={() => setShowNote((s) => !s)} aria-expanded={showNote} className={`${btn} border border-line bg-card hover:border-violet`}>
                <Download size={16} aria-hidden /> Download Resume
              </button>
            )}
            <a href="#contact" className={`${btn} border border-line bg-card hover:border-violet`}>
              Contact Me
            </a>
          </motion.div>
          <motion.div variants={item} className="mt-4 flex flex-wrap gap-3">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-medium text-muted transition-colors hover:border-violet hover:text-fg">
              <Github size={17} aria-hidden /> GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-medium text-muted transition-colors hover:border-violet hover:text-fg">
              <Linkedin size={17} aria-hidden /> LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </motion.div>

          {resume === false && showNote && (
            <p role="status" className="mt-4 max-w-xl rounded-xl border border-line bg-card p-4 text-sm text-muted">
              Resume not added yet. Save your real PDF as <code className="text-accent">public/resume.pdf</code> and refresh. This button will then download it.
            </p>
          )}
        </motion.div>

        <motion.div initial={reduce ? false : { opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="w-full">
          <PhotoVisual reduce={reduce} />
        </motion.div>
      </div>

      <a href="#about" aria-label="Scroll to next section" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted hover:text-fg md:block">
        <ArrowDown size={20} className={reduce ? '' : 'animate-bounce'} aria-hidden />
      </a>
    </section>
  )
}
