'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

interface MarqueeProps {
  children: ReactNode
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  className?: string
}

export default function Marquee({
  children,
  speed = 30,
  direction = 'left',
  pauseOnHover = true,
  className = '',
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    // Respect reduced-motion: disable the marquee animation
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setEnabled(false)
    }
  }, [])

  return (
    <div
      className={`marquee-container ${pauseOnHover ? 'marquee-pause' : ''} ${className}`}
      style={{ ['--marquee-duration' as any]: `${speed}s` }}
    >
      <div
        ref={trackRef}
        className={`marquee-track ${direction === 'right' ? 'reverse' : ''}`}
        style={enabled ? undefined : { animation: 'none' }}
      >
        {/* Render children twice for a seamless infinite loop */}
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}
