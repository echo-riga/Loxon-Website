import { getProjects } from '@/lib/api'
import ProjectsGrid from '@/components/ProjectsGrid'

export const metadata = {
  title: 'Our Projects | Loxon Philippines Inc.',
  description: 'Explore our portfolio of engineering and construction projects across the Philippines.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  return <ProjectsGrid projects={projects} />
}