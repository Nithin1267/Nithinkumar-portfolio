import { forwardRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  Activity,
  ArrowLeftRight,
  BarChart3,
  Brain,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Clapperboard,
  ExternalLink,
  FileSearch,
  Github,
  Globe,
  GraduationCap,
  QrCode,
  ShieldAlert,
  ShieldCheck,
  Youtube,
} from 'lucide-react'
import { projects } from '../data/projects'
import type { Project, ProjectCategory, ProjectStatus } from '../types'
import SectionHeading from './SectionHeading'

const filters: ('All' | ProjectCategory)[] = ['All', 'AI/ML', 'Analytics', 'Web Development']
const catIcon = { 'AI/ML': Brain, Analytics: BarChart3, 'Web Development': Globe }
const visualIcons = {
  attendance: QrCode,
  currency: ArrowLeftRight,
  career: BriefcaseBusiness,
  fraud: ShieldAlert,
  phishing: ShieldCheck,
  resume: FileSearch,
  sales: ChartNoAxesCombined,
  youtube: Youtube,
  covid: Activity,
  student: GraduationCap,
  movie: Clapperboard,
}
const statusStyle: Record<ProjectStatus, string> = {
  Completed: 'border-emerald-500/40 text-emerald-600 dark:text-emerald-300',
  'In Progress': 'border-amber-500/40 text-amber-700 dark:text-amber-300',
  Planned: 'border-line text-muted',
}

const Card = forwardRef<HTMLLIElement, { p: Project; reduce: boolean | null }>(function Card({ p, reduce }, ref) {
  const Icon = visualIcons[p.visual] ?? catIcon[p.category]
  return (
    <motion.li
      ref={ref}
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col overflow-hidden rounded-2xl border border-line bg-card backdrop-blur"
    >
      <div aria-hidden className="relative grid h-40 place-items-center overflow-hidden bg-gradient-to-br from-violet/20 via-bg/40 to-electric/20">
        <span className="absolute size-28 rounded-full border border-violet/20" />
        <span className="absolute size-20 rounded-full border border-electric/25" />
        <Icon size={42} strokeWidth={1.5} className="relative text-accent drop-shadow-[0_0_16px_rgba(139,92,246,0.35)]" />
        <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet/50 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-snug">{p.title}</h3>
          <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyle[p.status]}`}>{p.status}</span>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
        {p.tech.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {p.tech.map((t) => <li key={t} className="rounded-md bg-violet/10 px-2 py-0.5 text-xs text-accent">{t}</li>)}
          </ul>
        )}
        {(p.repoUrl || p.demoUrl) && (
          <div className="mt-5 flex flex-wrap gap-2">
            {p.repoUrl && (
              <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium hover:border-violet">
                <Github size={15} aria-hidden /> Source Code<span className="sr-only"> for {p.title} (opens in a new tab)</span>
              </a>
            )}
            {p.demoUrl && (
              <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-violet to-electric px-4 text-sm font-medium text-white">
                <ExternalLink size={15} aria-hidden /> Live Demo<span className="sr-only"> of {p.title} (opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </motion.li>
  )
})

export default function Projects() {
  const reduce = useReducedMotion()
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const shown = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" aria-labelledby="projects-title" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading id="projects-title" title="Projects">Project-themed illustrations. Each card shows the project's real status; links appear only where a repository or demo exists.</SectionHeading>
      <div role="group" aria-label="Filter projects by category" className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`min-h-11 rounded-full border px-5 text-sm font-medium transition-colors ${filter === f ? 'border-transparent bg-gradient-to-r from-violet to-electric text-white' : 'border-line bg-card hover:border-violet'}`}
          >
            {f}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">{shown.length} projects shown</p>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => <Card key={p.title} p={p} reduce={reduce} />)}
        </AnimatePresence>
      </ul>
    </section>
  )
}
