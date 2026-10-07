import HomeContent from '@/components/HomeContent'
import { getBuildProjects, getBuildClients } from '@/lib/build-content'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('/', 'Loxon Philippines Inc. | Engineering & Construction Excellence', 'Loxon Philippines delivers engineering, construction, and fire protection solutions across the Philippines. Explore our projects, services, and career opportunities.')

export default async function HomePage() {
  const [projects, clients] = await Promise.all([getBuildProjects(), getBuildClients()])
  return <HomeContent initialProjects={projects} initialClients={clients} />
}
