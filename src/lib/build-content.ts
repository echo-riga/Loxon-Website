import 'server-only'
import { cache } from 'react'
import type { ProjectWithImages } from './api'
import type { Client, Job, ProductService } from '@/types/loxon'

const snapshot = Date.now().toString()

async function readBuildCollection<T>(path: string): Promise<T[]> {
  const base = process.env.NEXT_PUBLIC_ADMIN_API_BASE?.trim().replace(/\/$/, '')
  if (!base) throw new Error('Set NEXT_PUBLIC_ADMIN_API_BASE before exporting the SEO content.')
  // A build-specific key avoids reusing Next's persistent fetch cache from an older export.
  const response = await fetch(`${base}${path}?fresh=1&snapshot=${snapshot}`, {
    cache: 'force-cache', signal: AbortSignal.timeout(20000),
  })
  if (!response.ok) throw new Error(`Unable to export ${path}: Admin returned ${response.status}.`)
  const data: unknown = await response.json()
  if (!Array.isArray(data)) throw new Error(`Unable to export ${path}: expected a content collection.`)
  return data as T[]
}

// Export real content into HTML, then let the browser refresh it after hydration.
// Fail the build on API errors rather than silently shipping an empty SEO snapshot.
export const getBuildProjects = cache(() => readBuildCollection<ProjectWithImages>('/api/projects'))
export const getBuildClients = cache(() => readBuildCollection<Client>('/api/clients'))
export const getBuildJobs = cache(() => readBuildCollection<Job>('/api/jobs'))
export const getBuildProductsServices = cache(() => readBuildCollection<ProductService>('/api/products-services'))
