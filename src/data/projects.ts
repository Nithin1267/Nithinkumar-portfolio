import type { Project } from '../types'

// EDIT: update status, tech, repoUrl and demoUrl as each project progresses.
// Only add a URL when it is real. Buttons for empty URLs are hidden automatically.
// Statuses for Nizam Class Companion, AI Sales Dashboard, YouTube and COVID-19 come from your resume.
// The rest are guesses: change them to the true status.
export const projects: Project[] = [
  {
    title: 'Nizam Class Companion',
    description: 'Web-based automated attendance system with student, teacher and admin dashboards. Includes QR-based attendance, GPS verification, eligibility tracking and department-to-subject mapping.',
    category: 'Web Development',
    status: 'Completed',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Vercel'],
    visual: 'attendance',
    repoUrl: 'https://github.com/Nithin1267/nizam-class-companion',
  },
  {
    title: 'Currency Converter',
    description: 'Currency conversion application.',
    category: 'Web Development',
    status: 'Completed',
    tech: [],
    visual: 'currency',
    repoUrl: 'https://github.com/Nithin1267/CURRENCY-CONVERTER',
  },
  {
    title: 'AI Career Assistant',
    description: 'A career-focused assistant that helps users explore possible career paths and prepare for opportunities. The project brings career exploration and preparation together as its main focus.',
    category: 'AI/ML',
    status: 'Completed',
    tech: [],
    visual: 'career',
  },
  {
    title: 'Fraud Detection System',
    description: 'Uses machine learning to help identify transactions that may be fraudulent. The project focuses on recognizing potentially suspicious activity in transaction data.',
    category: 'AI/ML',
    status: 'Completed',
    tech: [],
    visual: 'fraud',
  },
  {
    title: 'Phishing Attack Detection System',
    description: 'Classifies websites and activity that may be associated with phishing. The goal is to help distinguish potentially malicious activity from legitimate activity.',
    category: 'AI/ML',
    status: 'Completed',
    tech: [],
    visual: 'phishing',
  },
  {
    title: 'Resume Screening System',
    description: 'Analyzes resume content against job requirements to support the initial screening process. It focuses on comparing candidate information with the criteria for a role.',
    category: 'AI/ML',
    status: 'Completed',
    tech: [],
    visual: 'resume',
  },
  {
    title: 'AI Sales Dashboard',
    description: 'Analytics dashboard focused on sales insights, performance tracking and data visualization.',
    category: 'Analytics',
    status: 'Completed',
    tech: [],
    visual: 'sales',
  },
  {
    title: 'YouTube Data Analytics Dashboard',
    description: 'Dashboard that analyzes YouTube metrics, identifies trends and presents insights through data visualization.',
    category: 'Analytics',
    status: 'Completed',
    tech: ['Streamlit'],
    visual: 'youtube',
  },
  {
    title: 'COVID-19 Data Analysis',
    description: 'Analysis of COVID-19 datasets to identify trends and communicate findings through data visualization.',
    category: 'Analytics',
    status: 'Completed',
    tech: [],
    visual: 'covid',
  },
  {
    title: 'Student Performance Prediction',
    description: 'Applies machine learning to analyze factors associated with student performance and predict outcomes. The project explores how these factors relate to performance.',
    category: 'AI/ML',
    status: 'Completed',
    tech: [],
    visual: 'student',
  },
  {
    title: 'Movie Recommendation System',
    description: 'Recommends movies based on user preferences to help surface relevant viewing options. Personal preferences are the basis for the recommendations.',
    category: 'AI/ML',
    status: 'Completed',
    tech: [],
    visual: 'movie',
  },
]
