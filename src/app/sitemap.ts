// app/sitemap.ts
import { MetadataRoute } from 'next'
import { getProjects, getProductsServices, getJobs } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://loxon-ph.vercel.app'

  const staticPages = [
    '',
    '/projects',
    '/products-services',
    '/company-membership',
    '/our-company',
    '/contact',
    '/join-us',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Optional: Add dynamic pages if needed
  // const projects = await getProjects()
  // const projectPages = projects.map((project: any) => ({
  //   url: `${baseUrl}/projects/${project.id}`,
  //   lastModified: new Date(project.created_at),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }))

  return [...staticPages]
}