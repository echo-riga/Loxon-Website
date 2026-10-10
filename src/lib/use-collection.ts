'use client'

import { useCallback, useEffect, useState } from 'react'

// Keep the export for SEO; visual sections wait for the first live response.
export function useCollection<T>(fetcher: (signal?: AbortSignal) => Promise<T[]>, initialData?: T[]) {
  const [data, setData] = useState<T[]>(initialData ?? [])
  const [loading, setLoading] = useState(true)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)
  const retry = useCallback(() => {
    if (!ready) setLoading(true)
    setError(null)
    setAttempt(value => value + 1)
  }, [ready])

  useEffect(() => {
    let active = true
    let pending = false
    let controller: AbortController | undefined

    async function refresh() {
      if (pending) return
      pending = true
      controller = new AbortController()
      const timeout = window.setTimeout(() => controller?.abort(), 15000)
      try {
        const items = await fetcher(controller.signal)
        if (active) {
          setData(items)
          setReady(true)
          setError(null)
        }
      } catch {
        if (active) setError('Unable to load the latest content. Please try again.')
      } finally {
        window.clearTimeout(timeout)
        pending = false
        if (active) setLoading(false)
      }
    }

    function refreshVisible() {
      if (document.visibilityState === 'visible') void refresh()
    }

    void refresh()
    const interval = window.setInterval(refreshVisible, 60000)
    window.addEventListener('focus', refreshVisible)
    document.addEventListener('visibilitychange', refreshVisible)
    return () => {
      active = false
      controller?.abort()
      window.clearInterval(interval)
      window.removeEventListener('focus', refreshVisible)
      document.removeEventListener('visibilitychange', refreshVisible)
    }
  }, [fetcher, attempt])

  return { data, loading, ready, error, retry }
}
