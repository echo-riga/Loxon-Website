'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
}

export default function CountUp({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(end)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    let cancelled = false
    let frame = 0

    // Respect reduced-motion: show final value immediately
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setValue(end)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const start = performance.now()

            const tick = (now: number) => {
              if (cancelled) return
              const elapsed = now - start
              const progress = Math.min(elapsed / duration, 1)
              // ease-out cubic
              const eased = 1 - Math.pow(1 - progress, 3)
              setValue(end * eased)

              if (progress < 1) {
                frame = requestAnimationFrame(tick)
              } else {
                setValue(end)
              }
            }

            frame = requestAnimationFrame(tick)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 }
    )

    observer.observe(node)
    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [end, duration])

  const formatted = decimals > 0
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString('en-US')

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
