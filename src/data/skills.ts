import type { SkillGroup } from '../types'

// EDIT: add or remove skills here.
export const skillGroups: SkillGroup[] = [
  { title: 'Programming & Web', icon: 'code', skills: ['Python', 'SQL', 'HTML', 'CSS', 'Basic Java'] },
  { title: 'Data Analytics & Visualization', icon: 'chart', skills: ['Data Analysis', 'Data Visualization', 'Statistical Analysis', 'Pandas', 'NumPy', 'Matplotlib', 'Excel', 'Power BI', 'Tableau'] },
  { title: 'AI & Machine Learning', icon: 'brain', skills: ['Machine Learning', 'Scikit-learn', 'Machine Learning Algorithms', 'Deep Learning', 'NLP'] },
  { title: 'Databases', icon: 'data', skills: ['PostgreSQL', 'MongoDB', 'Supabase'] },
  { title: 'Tools & Platforms', icon: 'tools', skills: ['GitHub', 'Streamlit', 'Vercel', 'AWS basics'] },
  { title: 'Big Data', icon: 'data', skills: ['Hadoop', 'Apache Spark'] },
]
