import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function NotFound() {
  useDocumentMeta('Page not found | Nithin Kumar', 'This page does not exist.')
  return (
    <section className="mx-auto grid min-h-[70vh] max-w-2xl place-items-center px-5 pt-28 text-center">
      <div>
        <p className="font-display text-7xl font-bold"><span className="grad-text">404</span></p>
        <h1 className="mt-4 font-display text-2xl font-semibold">Page not found</h1>
        <p className="mt-2 text-muted">The page you are looking for does not exist or has moved.</p>
        <Link to="/" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-gradient-to-r from-violet to-electric px-6 text-sm font-semibold text-white">Back to home</Link>
      </div>
    </section>
  )
}
