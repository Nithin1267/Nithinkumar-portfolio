import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { useTheme } from '../hooks/useTheme'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const { theme, toggle } = useTheme()
  const { pathname } = useLocation()
  const ids = useMemo(() => profile.navLinks.map((l) => l.id), [])
  const sectionActive = useActiveSection(ids)
  const active = pathname.startsWith('/blog') ? 'blog' : pathname === '/' ? sectionActive : ''

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/70 backdrop-blur-xl">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/#home" className="font-display text-xl font-bold tracking-tight" aria-label="Nithin Kumar, home">
          <span className="grad-text">{profile.initials}</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {profile.navLinks.map((l) => {
            const isActive = active === l.id
            return (
              <li key={l.id} className="relative">
                <Link
                  to={l.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative block px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'text-fg' : 'text-muted hover:text-fg'}`}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-violet to-electric"
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={toggle} />
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-line bg-card lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.22 }}
            className="overflow-hidden border-t border-line bg-bg/95 lg:hidden"
          >
            <ul className="mx-auto max-w-6xl px-5 py-3">
              {profile.navLinks.map((l) => (
                <li key={l.id}>
                  <Link
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-3 text-base font-medium ${active === l.id ? 'text-accent' : 'text-fg'}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
