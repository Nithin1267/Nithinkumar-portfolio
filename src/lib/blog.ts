import { marked } from 'marked'
import type { Post } from '../types'

// Every .md file in src/content/blog becomes an article.
const files = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

function parse(path: string, raw: string): Post {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  const meta: Record<string, string> = {}
  const body = m ? m[2] : raw
  if (m) {
    for (const line of m[1].split(/\r?\n/)) {
      const i = line.indexOf(':')
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '')
    }
  }
  const slug = path.split('/').pop()!.replace(/\.md$/, '')
  const words = body.trim().split(/\s+/).length
  return {
    slug,
    title: meta.title ?? slug,
    date: meta.date ?? '',
    category: meta.category ?? 'General',
    summary: meta.summary ?? '',
    sample: meta.sample === 'true',
    readingMinutes: Math.max(1, Math.ceil(words / 200)),
    body,
    html: marked.parse(body, { async: false }) as string,
  }
}

export const posts: Post[] = Object.entries(files)
  .map(([p, r]) => parse(p, r))
  .sort((a, b) => b.date.localeCompare(a.date))

export const categories = Array.from(new Set(posts.map((p) => p.category)))

export function formatDate(d: string) {
  const dt = new Date(d + 'T00:00:00')
  return isNaN(dt.getTime()) ? d : dt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}
