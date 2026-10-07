import ProjectsGrid from '@/components/ProjectsGrid'
import { getBuildProjects } from '@/lib/build-content'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('/projects', 'Our Projects | Loxon Philippines Inc.', 'Explore our portfolio of engineering and construction projects across the Philippines.')

export default async function ProjectsPage() {
  return <ProjectsGrid initialProjects={await getBuildProjects()} />
}
