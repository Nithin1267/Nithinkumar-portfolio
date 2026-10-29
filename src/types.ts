export interface NavLink { label: string; href: string; id: string }

export interface Profile {
  name: string
  initials: string
  tagline: string
  location: string
  headline: string
  headlineAccent: string // shown in gradient after the headline
  intro: string
  phrases: string[]
  github: string
  linkedin: string
  email: string // leave empty until you add a public email
  resumePath: string
  navLinks: NavLink[]
}

export interface SkillGroup { title: string; icon: 'code' | 'chart' | 'brain' | 'tools' | 'data'; skills: string[] }

export type ProjectCategory = 'AI/ML' | 'Analytics' | 'Web Development'
export type ProjectStatus = 'Completed' | 'In Progress' | 'Planned'
export type ProjectVisual =
  | 'attendance'
  | 'currency'
  | 'career'
  | 'fraud'
  | 'phishing'
  | 'resume'
  | 'sales'
  | 'youtube'
  | 'covid'
  | 'student'
  | 'movie'

export interface Project {
  title: string
  description: string
  category: ProjectCategory
  status: ProjectStatus
  tech: string[] // leave empty until you add the real stack
  visual: ProjectVisual
  repoUrl?: string // buttons appear only when a URL is set
  demoUrl?: string
}

export interface TimelineItem {
  title: string
  org: string
  location?: string
  period: string
  points?: string[]
  draft?: boolean // true = placeholder you still need to fill in
}

export interface Post {
  slug: string
  title: string
  date: string
  category: string
  summary: string
  sample: boolean
  readingMinutes: number
  body: string
  html: string
}
