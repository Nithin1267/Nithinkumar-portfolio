import type { Profile } from '../types'

// EDIT THIS FILE to update your personal details.
export const profile: Profile = {
  name: 'Nithin Kumar',
  initials: 'NK',
  tagline: 'Data, AI & software projects.',
  location: 'Nirmal, Telangana, India',
  headline: 'Turning Data Into Insights and',
  headlineAccent: 'Building AI-Powered Solutions.',
  intro:
    "I'm a Data Science graduate from Nizam College, Hyderabad, passionate about transforming data into meaningful insights, creating interactive dashboards, and building practical AI-powered applications.",
  phrases: ['Data Analyst', 'Data Scientist', 'AI Developer'],
  github: 'https://github.com/Nithin1267',
  linkedin: 'https://www.linkedin.com/in/nithin-kumar-61320a265/',
  email: 'mrnithin120@gmail.com',
  resumePath: '/resume.pdf', // put your real PDF at public/resume.pdf
  navLinks: [
    { label: 'Home', href: '/#home', id: 'home' },
    { label: 'About', href: '/#about', id: 'about' },
    { label: 'Skills', href: '/#skills', id: 'skills' },
    { label: 'Projects', href: '/#projects', id: 'projects' },
    { label: 'Experience', href: '/#experience', id: 'experience' },
    { label: 'Certificates', href: '/#certificates', id: 'certificates' },
    { label: 'Blog', href: '/blog', id: 'blog' },
    { label: 'Contact', href: '/#contact', id: 'contact' },
  ],
}
