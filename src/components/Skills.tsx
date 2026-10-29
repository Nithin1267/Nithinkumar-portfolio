import { motion, useReducedMotion } from 'motion/react'
import { BarChart3, Brain, Code2, Database, Wrench } from 'lucide-react'
import { skillGroups } from '../data/skills'
import SectionHeading from './SectionHeading'

const icons = { code: Code2, chart: BarChart3, brain: Brain, tools: Wrench, data: Database }

export default function Skills() {
  const reduce = useReducedMotion()
  return (
    <section id="skills" aria-labelledby="skills-title" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading id="skills-title" title="Skills">Tools and technologies I work with, grouped by what I use them for.</SectionHeading>
      <motion.ul
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillGroups.map((g) => {
          const Icon = icons[g.icon]
          return (
            <motion.li
              key={g.title}
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
              className="rounded-2xl border border-line bg-card p-6 backdrop-blur"
            >
              <div className="mb-4 flex items-center gap-3">
                <Icon size={20} className="text-accent" aria-hidden />
                <h3 className="font-display text-lg font-semibold">{g.title}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <li key={s} className="rounded-full border border-line px-3 py-1 text-sm">{s}</li>
                ))}
              </ul>
            </motion.li>
          )
        })}
      </motion.ul>
    </section>
  )
}
