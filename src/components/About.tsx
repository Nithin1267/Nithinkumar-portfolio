import { motion, useReducedMotion } from 'motion/react'
import { Code2, GraduationCap, Sparkles } from 'lucide-react'
import SectionHeading from './SectionHeading'

const highlights = [
  { icon: GraduationCap, title: 'Education', text: 'B.Sc. Mathematics for Data Science, Nizam College Autonomous, Hyderabad (2023–2026).' },
  { icon: Sparkles, title: 'Technical interests', text: 'Data analytics, machine learning, AI applications and software development.' },
  { icon: Code2, title: 'Project development', text: 'Academic and personal projects, from analytics dashboards to web applications.' },
]

export default function About() {
  const reduce = useReducedMotion()
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading id="about-title" title="About me" />
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4 text-lg leading-relaxed text-muted">
          <p>
            I graduated in 2026 with a B.Sc. in Mathematics for Data Science from Nizam College, Hyderabad. The course gave me a strong base in statistics and programming, and I completed an 8-month remote Data Science internship at Hex Softwares Pvt. Ltd.
          </p>
          <p>
            I'm most interested in analytics, machine learning and AI applications. I learn by building: dashboards, data analyses and web apps are where I practise cleaning, modelling, visualization and development together.
          </p>
          <p>
            What keeps me going is solving real problems and writing software that other people find useful. I'm looking for Data Analyst, Business Analyst and Junior Data Scientist roles where I can keep learning and contribute on a team.
          </p>
        </div>
        <ul className="grid gap-4">
          {highlights.map(({ icon: Icon, title, text }, i) => (
            <motion.li
              key={title}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex gap-4 rounded-2xl border border-line bg-card p-5 backdrop-blur"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet/25 to-electric/25 text-accent">
                <Icon size={20} aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
