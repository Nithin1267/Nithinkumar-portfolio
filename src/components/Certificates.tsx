import { Award, Trophy } from 'lucide-react'
import SectionHeading from './SectionHeading'

const certificates = [
  'Deloitte Australia Data Analytics Virtual Internship (Forage)',
  'Deloitte Australia Cyber Security Virtual Internship (Forage)',
  'Deloitte Australia Technology Fundamentals Virtual Internship (Forage)',
  'Python Programming Certificate – Osmania University',
  'Web Development Certificate – Online Course',
]

const achievements = [
  'Completed 3 virtual internship programs through Forage in Data Analytics, Cyber Security, and Technology Fundamentals.',
  'Successfully completed Data Science Internship at Hex Softwares Pvt. Ltd.',
  'Developed 6+ Data Science and Machine Learning projects using Python, SQL, Scikit-learn, and Streamlit.',
  'Built and deployed interactive dashboards and predictive analytics applications.',
  'Gained hands-on experience in Machine Learning, Data Analysis, Business Intelligence, and Data Visualization.',
]

function HighlightList({ title, icon: Icon, items }: { title: string; icon: typeof Award; items: string[] }) {
  return (
    <div className="rounded-2xl border border-line bg-card p-5 backdrop-blur sm:p-7">
      <h3 className="flex items-center gap-3 font-display text-xl font-semibold">
        <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-violet/25 to-electric/25 text-accent">
          <Icon size={20} aria-hidden />
        </span>
        {title}
      </h3>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-muted">
            <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-violet" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Certificates() {
  return (
    <section id="certificates" aria-labelledby="certificates-title" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading id="certificates-title" title="Certificates & achievements">
        Certifications, internships, and project milestones.
      </SectionHeading>
      <div className="grid gap-6 lg:grid-cols-2">
        <HighlightList title="Certificates" icon={Award} items={certificates} />
        <HighlightList title="Achievements" icon={Trophy} items={achievements} />
      </div>
    </section>
  )
}
