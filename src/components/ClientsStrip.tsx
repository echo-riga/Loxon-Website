'use client'

import type { Client } from '@/types/loxon'
import Marquee from './Marquee'

export default function ClientsStrip({ clients }: { clients: Client[] }) {
  const items = clients.slice(0, 8)

  return (
    <Marquee speed={30} direction="left" pauseOnHover>
      {items.map((c) => (
        <div
          key={c.id}
          className="flex flex-col items-center gap-2 mx-8 sm:mx-12 opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-default"
        >
          {c.image_url ? (
            <img
              src={c.image_url}
              alt={c.title}
              className="h-12 sm:h-16 object-contain"
              style={{ filter: 'grayscale(1)' }}
            />
          ) : (
            <div className="text-lg font-semibold text-gray-700">{c.title}</div>
          )}
        </div>
      ))}
    </Marquee>
  )
}
