import { useEffect, useState } from 'react'

// Returns true only if a real PDF exists at `path`.
// (In dev, Vite returns index.html for missing files, so we check the content type.)
export function useResume(path: string) {
  const [available, setAvailable] = useState<boolean | null>(null)
  useEffect(() => {
    let cancelled = false
    fetch(path, { method: 'HEAD' })
      .then((r) => !cancelled && setAvailable(r.ok && (r.headers.get('content-type') ?? '').includes('pdf')))
      .catch(() => !cancelled && setAvailable(false))
    return () => { cancelled = true }
  }, [path])
  return available
}
