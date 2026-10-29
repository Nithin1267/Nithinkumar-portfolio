import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Search } from 'lucide-react'
import { categories, formatDate, posts } from '../lib/blog'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function BlogList() {
  useDocumentMeta('Blog | Nithin Kumar', 'Articles on data analytics, machine learning and web development.')
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('All')

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter(
      (p) => (cat === 'All' || p.category === cat) && (!q || (p.title + ' ' + p.summary + ' ' + p.body).toLowerCase().includes(q)),
    )
  }, [query, cat])

  return (
    <section id="blog" aria-labelledby="blog-title" className="mx-auto max-w-6xl px-5 pb-24 pt-32">
      <h1 id="blog-title" className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">Notes on data analytics, machine learning and web development.</p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Filter articles by category" className="flex flex-wrap gap-2">
          {['All', ...categories].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={`min-h-11 rounded-full border px-5 text-sm font-medium transition-colors ${cat === c ? 'border-transparent bg-gradient-to-r from-violet to-electric text-white' : 'border-line bg-card hover:border-violet'}`}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="relative block sm:w-72">
          <span className="sr-only">Search articles</span>
          <Search size={16} aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title or content"
            className="min-h-11 w-full rounded-full border border-line bg-card pl-10 pr-4 text-sm placeholder:text-muted"
          />
        </label>
      </div>

      <p role="status" className="sr-only">{shown.length} articles found</p>
      {shown.length === 0 ? (
        <p className="mt-12 text-muted">No articles match your search.</p>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.slug} className="flex flex-col rounded-2xl border border-line bg-card p-6 backdrop-blur">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="rounded-md bg-violet/10 px-2 py-0.5 text-accent">{p.category}</span>
                {p.sample && <span className="rounded-full border border-amber-500/40 px-2 py-0.5 text-amber-700 dark:text-amber-300">Sample</span>}
              </div>
              <h2 className="mt-4 font-display text-xl font-semibold leading-snug">
                <Link to={`/blog/${p.slug}`} className="hover:text-accent">{p.title}</Link>
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
              <p className="mt-4 flex items-center gap-3 text-xs text-muted">
                <time dateTime={p.date}>{formatDate(p.date)}</time>
                <span className="flex items-center gap-1"><Clock size={13} aria-hidden /> {p.readingMinutes} min read</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
