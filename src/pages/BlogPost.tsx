import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, Link2, Linkedin, Twitter } from 'lucide-react'
import { formatDate, posts } from '../lib/blog'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import NotFound from './NotFound'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)
  const [copied, setCopied] = useState(false)
  useDocumentMeta(post ? `${post.title} | Nithin Kumar` : 'Article not found', post?.summary ?? '')

  if (!post) return <NotFound />

  const url = window.location.href
  const related = [...posts.filter((p) => p.slug !== post.slug && p.category === post.category), ...posts.filter((p) => p.slug !== post.slug && p.category !== post.category)].slice(0, 2)
  const share = 'inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-4 text-sm hover:border-violet'

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard unavailable */ }
  }

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-32">
      <Link to="/blog" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg">
        <ArrowLeft size={16} aria-hidden /> All articles
      </Link>
      <p className="mt-6 text-sm text-accent">{post.category}</p>
      <h1 className="mt-2 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{post.title}</h1>
      <p className="mt-4 flex items-center gap-4 text-sm text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span className="flex items-center gap-1"><Clock size={14} aria-hidden /> {post.readingMinutes} min read</span>
      </p>
      {post.sample && (
        <p role="note" className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm">
          Sample article: replace this file in <code>src/content/blog</code> with your own writing.
        </p>
      )}
      <div className="blog-prose mt-8" dangerouslySetInnerHTML={{ __html: post.html }} />

      <div className="mt-12 border-t border-line pt-6">
        <p className="mb-3 text-sm font-medium">Share this article</p>
        <div className="flex flex-wrap gap-2">
          <a className={share} target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}>
            <Linkedin size={16} aria-hidden /> LinkedIn<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a className={share} target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`}>
            <Twitter size={16} aria-hidden /> X<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <button type="button" onClick={copy} className={share}>
            <Link2 size={16} aria-hidden /> {copied ? 'Link copied' : 'Copy link'}
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <aside aria-labelledby="related-title" className="mt-14">
          <h2 id="related-title" className="font-display text-xl font-semibold">Related articles</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((p) => (
              <li key={p.slug} className="rounded-2xl border border-line bg-card p-5">
                <p className="text-xs text-accent">{p.category}</p>
                <Link to={`/blog/${p.slug}`} className="mt-1 block font-display font-semibold leading-snug hover:text-accent">{p.title}</Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </article>
  )
}
