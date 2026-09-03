'use client'

import { motion, useReducedMotion } from 'framer-motion'
import ParticlesField from './ParticlesField'

interface AmbientBackgroundProps {
  variant?: 'dark' | 'light'
  grid?: boolean
  particles?: boolean
  blobCount?: number
  className?: string
}

const blobPositions = [
  { left: '-8%', top: '8%', size: 420, x: [0, 48, -24, 0], y: [0, -36, 28, 0] },
  { right: '-10%', top: '20%', size: 500, x: [0, -44, 30, 0], y: [0, 38, -28, 0] },
  { left: '32%', bottom: '-20%', size: 460, x: [0, 32, -40, 0], y: [0, -28, 42, 0] },
  { right: '18%', bottom: '10%', size: 300, x: [0, -26, 20, 0], y: [0, 24, -18, 0] },
]

export default function AmbientBackground({
  variant = 'dark',
  grid = false,
  particles = false,
  blobCount = 3,
  className = '',
}: AmbientBackgroundProps) {
  const reducedMotion = useReducedMotion()
  const isDark = variant === 'dark'
  const blobs = blobPositions.slice(0, Math.min(blobCount, blobPositions.length))

  return (
    <div
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {grid && (
        <motion.div
          className="absolute inset-0 blueprint-grid opacity-70"
          animate={reducedMotion ? undefined : { backgroundPosition: ['0px 0px', '40px 40px'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {blobs.map((blob, index) => {
        const color = isDark
          ? index % 2 === 0
            ? 'bg-sky-500/20'
            : 'bg-cyan-300/14'
          : index % 2 === 0
            ? 'bg-sky-200/40'
            : 'bg-cyan-100/50'

        return (
          <motion.div
            key={index}
            className={`absolute rounded-full blur-3xl ${color} ${isDark ? 'mix-blend-screen' : 'mix-blend-multiply'}`}
            style={{
              width: blob.size,
              height: blob.size,
              left: blob.left,
              right: blob.right,
              top: blob.top,
              bottom: blob.bottom,
            }}
            animate={
              reducedMotion
                ? undefined
                : {
                    x: blob.x,
                    y: blob.y,
                    scale: [1, 1.12, 0.94, 1],
                    opacity: isDark ? [0.45, 0.72, 0.5, 0.45] : [0.35, 0.55, 0.4, 0.35],
                  }
            }
            transition={{
              duration: 22 + index * 4,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
              delay: index * 1.7,
            }}
          />
        )
      })}

      {particles && !reducedMotion && (
        <ParticlesField variant={variant} density={isDark ? 'sparse' : 'medium'} />
      )}
    </div>
  )
}
