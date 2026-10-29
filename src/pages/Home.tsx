import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import Certificates from '../components/Certificates'
import Contact from '../components/Contact'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Home() {
  useDocumentMeta(
    'Nithin Kumar | Data, AI & Software',
    'Nithin Kumar is a Data Science graduate building data analytics, machine learning and AI-powered applications.',
  )
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certificates />
      <Contact />
    </>
  )
}
