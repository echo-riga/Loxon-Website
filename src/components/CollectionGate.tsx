'use client'

import type { ReactNode } from 'react'
import CollectionStatus from './CollectionStatus'

export default function CollectionGate({ loading, ready, error, retry, children, variant = 'cards' }: {
  loading: boolean
  ready: boolean
  error: string | null
  retry: () => void
  children: ReactNode
  variant?: 'cards' | 'rows' | 'logos'
}) {
  return (
    <div className="relative" aria-busy={loading}>
      {!ready && loading && (
        <div className="collection-placeholder" role="status">
          <span className="sr-only">Loading the latest content…</span>
          <div aria-hidden="true" className={variant === 'rows' ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-12'}>
            {Array.from({ length: variant === 'rows' ? 4 : 2 }, (_, index) => (
              <div key={index} className="overflow-hidden rounded-lg bg-gray-50 motion-safe:animate-pulse">
                {variant !== 'rows' && <div className={variant === 'logos' ? 'h-40 bg-gray-100' : 'h-64 bg-gray-100'} />}
                <div className="p-8 space-y-4">
                  <div className="h-6 w-2/3 rounded bg-gray-200" />
                  <div className="h-4 rounded bg-gray-100" />
                  {variant !== 'rows' && <div className="h-4 w-5/6 rounded bg-gray-100" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <CollectionStatus loading={false} error={error} retry={retry} />
      <div className={ready ? 'collection-content collection-ready' : 'collection-content collection-pending'} aria-hidden={!ready}>
        {children}
      </div>
    </div>
  )
}
