import { motion, useReducedMotion } from 'motion/react'
import { Briefcase, GraduationCap } from 'lucide-react'
import { education, experience } from '../data/experience'
import type { TimelineItem } from '../types'
import SectionHeading from './SectionHeading'

function Timeline({ heading, icon: Icon, items }: { heading: string; icon: typeof Briefcase; items: TimelineItem[] }) {
  const reduce = useReducedMotion()
  return (
    <div>
      <h3 className="mb-6 flex items-center gap-3 font-display text-xl font-semibold">
        <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-violet/25 to-electric/25 text-accent">
          <Icon size={20} aria-hidden />
        </span>
        {heading}
      </h3>
      <ol className="relative ml-5 space-y-8 border-l border-line">
        {items.map((it, i) => (
          <motion.li
            key={it.title + it.org}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="relative pl-7"
          >
            <span
              aria-hidden
              className={`absolute -left-[7px] top-1.5 size-3.5 rounded-full border-2 ${it.draft ? 'border-dashed border-muted bg-bg' : 'border-violet bg-bg'}`}
            />
            <p className="text-sm text-muted">{it.period}</p>
            <h4 className="mt-1 font-display text-lg font-semibold leading-snug">{it.title}</h4>
            <p className="text-base text-accent">
              {it.org}
              {it.location ? <span className="text-muted"> · {it.location}</span> : null}
            </p>
            {it.points && (
              <ul className={`mt-3 space-y-2 text-sm leading-relaxed ${it.draft ? 'italic text-muted' : 'text-muted'}`}>
                {it.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-violet" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.li>
        ))}
      </ol>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading id="experience-title" title="Experience & education">Where I've worked and studied, most recent first.</SectionHeading>
      <div className="grid gap-14 lg:grid-cols-2">
        <Timeline heading="Experience" icon={Briefcase} items={experience} />
        <Timeline heading="Education" icon={GraduationCap} items={education} />
      </div>
    </section>
  )
}
