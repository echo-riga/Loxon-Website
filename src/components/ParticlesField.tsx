'use client'

import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { ISourceOptions } from '@tsparticles/engine'

interface ParticlesFieldProps {
  variant?: 'dark' | 'light'
  density?: 'sparse' | 'medium'
  className?: string
}

let engineReady: Promise<void> | null = null

export default function ParticlesField({
  variant = 'dark',
  density = 'sparse',
  className = '',
}: ParticlesFieldProps) {
  const [ready, setReady] = useState(false)
  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (reduced) return

    if (!engineReady) {
      engineReady = initParticlesEngine(async (engine) => {
        await loadSlim(engine)
      })
    }

    let active = true
    engineReady.then(() => {
      if (active) setReady(true)
    })

    return () => {
      active = false
    }
  }, [reduced])

  const options = useMemo<ISourceOptions>(() => {
    const count = density === 'medium' ? 80 : 40
    const colors =
      variant === 'dark'
        ? ['#ffffff', '#7dd3fc', '#38bdf8']
        : ['#0ea5e9', '#7dd3fc', '#0284c7']

    return {
      fullScreen: { enable: false },
      background: { color: 'transparent' },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: count, density: { enable: true } },
        color: { value: colors },
        opacity: {
          value: { min: 0.1, max: 0.4 },
          animation: { enable: false },
        },
        size: {
          value: { min: 1.5, max: 3 },
        },
        links: { enable: false },
        move: {
          enable: true,
          direction: 'top',
          speed: 0.4,
          random: true,
          straight: false,
          outModes: { default: 'out' },
        },
      },
      interactivity: {
        events: {},
      },
    }
  }, [variant, density])

  if (reduced || !ready) return null

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Particles id={`particles-${variant}-${density}`} options={options} />
    </div>
  )
}
