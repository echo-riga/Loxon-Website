'use client'

import dynamic from 'next/dynamic'

const Structure3D = dynamic(() => import('./Structure3D'), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] w-full rounded-3xl border border-sky-400/20 bg-white/5 animate-pulse" />
  ),
})

export default function Structure3DClient({ className = '' }: { className?: string }) {
  return <Structure3D className={className} />
}
