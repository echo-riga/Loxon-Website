'use client'

import { useEffect, useRef } from 'react'

export default function ScrollEffects() {
  const progress = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const update = () => {
      frame = 0
      const distance = document.documentElement.scrollHeight - window.innerHeight
      const fraction = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0
      if (progress.current) progress.current.style.transform = `scaleX(${fraction})`
      document.documentElement.style.setProperty('--hero-shift', media.matches ? '0px' : `${Math.min(window.scrollY * 0.16, 70)}px`)
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    media.addEventListener('change', schedule)
    const resize = new ResizeObserver(schedule)
    resize.observe(document.body)
    schedule()
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      media.removeEventListener('change', schedule)
      resize.disconnect()
      document.documentElement.style.removeProperty('--hero-shift')
    }
  }, [])

  return <div ref={progress} className="scroll-progress" aria-hidden="true" />
}
