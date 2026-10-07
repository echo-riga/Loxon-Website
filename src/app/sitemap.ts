import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/projects/', '/products-services/', '/company-membership/', '/our-company/', '/contact/', '/join-us/'].map(route => ({
    url: siteUrl + route,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1 : 0.8,
  }))
}
