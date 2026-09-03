'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useReducedMotion } from 'framer-motion'
import type { Group } from 'three'

interface Structure3DProps {
  className?: string
}

const blocks = [
  { position: [0, -1.3, 0] as const, scale: [3.8, 0.34, 1.9] as const, color: '#f8fafc', opacity: 0.32 },
  { position: [-0.9, -0.72, 0.06] as const, scale: [1.15, 1.05, 1.35] as const, color: '#e0f2fe', opacity: 0.28 },
  { position: [0.45, -0.58, -0.08] as const, scale: [1.2, 1.35, 1.2] as const, color: '#f1f5f9', opacity: 0.26 },
  { position: [-0.25, 0.28, 0.02] as const, scale: [1.55, 1.28, 1.2] as const, color: '#dbeafe', opacity: 0.24 },
  { position: [0.58, 1.18, -0.04] as const, scale: [0.92, 0.88, 0.9] as const, color: '#f8fafc', opacity: 0.26 },
  { position: [-1.34, 0.12, -0.16] as const, scale: [0.18, 2.4, 0.18] as const, color: '#bae6fd', opacity: 0.34 },
  { position: [1.32, 0.03, -0.16] as const, scale: [0.18, 2.1, 0.18] as const, color: '#bae6fd', opacity: 0.3 },
]

const beams = [
  { position: [0, -0.08, 0.82] as const, rotation: [0, 0, 0.48] as [number, number, number], scale: [0.08, 3.35, 0.08] as const },
  { position: [0, -0.08, -0.82] as const, rotation: [0, 0, -0.48] as [number, number, number], scale: [0.08, 3.35, 0.08] as const },
  { position: [0, 0.9, 0] as const, rotation: [0, 0, Math.PI / 2] as [number, number, number], scale: [0.07, 2.8, 0.07] as const },
]

function FloatingBuilding({ paused, scrollOffset }: { paused: boolean; scrollOffset: number }) {
  const group = useRef<Group>(null)

  useFrame((_, delta) => {
    if (!group.current || paused) return

    const scrollRotation = scrollOffset * 0.55
    const targetY = -0.55 + scrollRotation
    const targetX = 0.08 + Math.sin(scrollOffset * Math.PI) * 0.08

    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(delta * 4, 1)
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(delta * 3, 1)
    group.current.position.y = Math.sin(Date.now() * 0.00045) * 0.08 + scrollOffset * 0.16
  })

  return (
    <Float speed={paused ? 0 : 0.55} rotationIntensity={paused ? 0 : 0.06} floatIntensity={paused ? 0 : 0.18}>
      <group ref={group} position={[0, -0.12, 0]} rotation={[0.08, -0.55, 0.03]}>
        {blocks.map((block, index) => (
          <mesh key={index} position={block.position} scale={block.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={block.color}
              emissive="#0ea5e9"
              emissiveIntensity={0.015}
              metalness={0.05}
              roughness={0.72}
              transparent
              opacity={block.opacity}
              depthWrite={false}
            />
          </mesh>
        ))}
        {beams.map((beam, index) => (
          <mesh key={`beam-${index}`} position={beam.position} rotation={beam.rotation} scale={beam.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color="#7dd3fc"
              emissive="#0ea5e9"
              emissiveIntensity={0.06}
              metalness={0.18}
              roughness={0.46}
              transparent
              opacity={0.34}
              depthWrite={false}
            />
          </mesh>
        ))}
        {[-1.2, -0.4, 0.4, 1.2].map((x) => (
          <mesh key={`node-${x}`} position={[x, 1.32, 0.72]} scale={[0.08, 0.08, 0.08]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.22} transparent opacity={0.68} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

export default function Structure3D({ className = '' }: Structure3DProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const [scrollOffset, setScrollOffset] = useState(0)
  const reducedMotion = useReducedMotion()
  const paused = Boolean(reducedMotion || !visible)

  useEffect(() => {
    const node = wrapperRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const node = wrapperRef.current
    if (!node || reducedMotion) return

    let frame = 0
    const updateScrollOffset = () => {
      const rect = node.getBoundingClientRect()
      const viewportHeight = window.innerHeight || 1
      const progress = 1 - (rect.top + rect.height * 0.5) / viewportHeight
      setScrollOffset(Math.max(-1, Math.min(1, progress)))
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateScrollOffset)
    }

    updateScrollOffset()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reducedMotion])

  return (
    <div ref={wrapperRef} className={`relative h-[360px] sm:h-[420px] lg:h-[500px] ${className}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.65, 7.5], fov: 38 }}
        dpr={[1, 1.5]}
        frameloop={paused ? 'demand' : 'always'}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[4, 7, 5]} intensity={0.9} />
        <pointLight position={[-4, -1, 4]} color="#bae6fd" intensity={1.25} distance={9} />
        <pointLight position={[3, 2, 2]} color="#38bdf8" intensity={0.8} distance={7} />
        <FloatingBuilding paused={paused} scrollOffset={scrollOffset} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-10 bottom-16 h-24 rounded-full bg-sky-200/35 blur-3xl glow-pulse" />
      <div className="pointer-events-none absolute inset-x-16 bottom-20 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
    </div>
  )
}
