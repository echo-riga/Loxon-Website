'use client'

import type { Client } from '@/types/loxon'

export default function ClientsStrip({ clients }: { clients: Client[] }) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2rem',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {clients.slice(0, 6).map(c => (
        <div
          key={c.id}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: 0.7, transition: 'opacity 0.2s', cursor: 'default' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0.7'}
        >
          {c.image_url
            ? <img src={c.image_url} alt={c.title} style={{ height: '48px', objectFit: 'contain', filter: 'grayscale(1)' }} />
            : <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'var(--gray-700)' }}>{c.title}</div>
          }
        </div>
      ))}
    </div>
  )
}