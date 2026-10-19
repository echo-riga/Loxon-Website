'use client'

import { useContext, useEffect, useRef, useState, type CSSProperties, type ElementType, type MouseEventHandler, type ReactNode } from 'react'
import { RevealReadyContext } from './RevealContext'

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'blur'

interface RevealProps {
  children: ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
  className?: string
  as?: ElementType
  onClick?: MouseEventHandler<HTMLElement>
}

export default function Reveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 1000,
  threshold = 0.15,
  once = false,
  className = '',
  as: Tag = 'div',
  onClick,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const animating = useRef(false)
  const shown = useRef(false)
  const ready = useContext(RevealReadyContext)

  useEffect(() => {
    const node = ref.current
    if (!node || !ready) return

    // Respect reduced-motion: show immediately, no animation
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!shown.current) animating.current = true
            shown.current = true
            setVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once && !animating.current) {
            shown.current = false
            setVisible(false)
          }
        })
      },
      // Tall content (such as the projects table) must still be able to reveal.
      { threshold: [0, Math.min(threshold, 100 / Math.max(node.offsetHeight, 1))] }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, once, ready])

  const hiddenClass = visible ? 'reveal-visible' : 'reveal-hidden'

  return (
    <Tag
      ref={ref as any}
      onFocusCapture={() => setVisible(true)}
      onAnimationEnd={(event: React.AnimationEvent<HTMLElement>) => {
        if (event.target !== event.currentTarget) return
        animating.current = false
        const bounds = event.currentTarget.getBoundingClientRect()
        if (!once && (bounds.bottom <= 0 || bounds.top >= window.innerHeight)) {
          shown.current = false
          setVisible(false)
        }
      }}
      onClick={onClick}
      className={`reveal ${animation} ${hiddenClass} ${className}`}
      style={{
        '--reveal-duration': `${duration}ms`,
        '--reveal-delay': `${delay}ms`,
      } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
