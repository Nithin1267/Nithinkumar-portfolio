import { Link } from 'react-router-dom'
import { ArrowUp, Github, Linkedin } from 'lucide-react'
import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-[1.2fr_1fr_auto]">
        <div>
          <Link to="/#home" className="font-display text-2xl font-bold" aria-label="Back to top">
            <span className="grad-text">{profile.initials}</span>
          </Link>
          <p className="mt-3 font-medium">{profile.name}</p>
          <p className="text-sm text-muted">{profile.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
            {profile.navLinks.map((l) => (
              <li key={l.id}>
                <Link to={l.href} className="inline-block py-1.5 text-muted hover:text-fg">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-start gap-2">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" className="grid size-11 place-items-center rounded-full border border-line hover:border-violet"><Github size={18} aria-hidden /></a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" className="grid size-11 place-items-center rounded-full border border-line hover:border-violet"><Linkedin size={18} aria-hidden /></a>
          <button type="button" onClick={() => window.scrollTo({ top: 0 })} aria-label="Back to top" className="grid size-11 place-items-center rounded-full border border-line text-muted hover:border-violet hover:text-fg"><ArrowUp size={18} aria-hidden /></button>
        </div>
      </div>
      <p className="border-t border-line py-5 text-center text-sm text-muted">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
    </footer>
  )
}
