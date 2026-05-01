import { getProjects } from '@/lib/api'
import Link from 'next/link'

export const metadata = {
  title: 'Our Projects | Loxon Philippines Inc.',
  description: 'Explore our portfolio of engineering and construction projects across the Philippines.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <>
      {/* Hero with Cover Image */}
      <div className="relative h-[60vh] min-h-[450px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80"
          alt="Construction project site"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center px-6 max-w-4xl">
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
              Our Projects
            </h1>
            <p className="text-gray-200 text-xl md:text-2xl leading-relaxed">
              A showcase of our finest engineering and construction achievements across the Philippines.
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid - Redesigned Corporate Portfolio Style */}
      <section className="py-24 md:py-32 bg-white w-full">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {projects.map((project: any, idx: number) => (
              <div key={project.id} className="group">
                {/* Image Container with Aspect Ratio */}
                <div className="relative overflow-hidden bg-gray-100 rounded-2xl aspect-[4/3]">
                  {project.image_url && (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  )}
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                </div>

                {/* Content Below Image */}
                <div className="mt-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition duration-300">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  {project.video_url && (
                    <div className="mt-4">
                      <a
                        href={project.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 font-medium hover:underline inline-flex items-center gap-1 text-sm uppercase tracking-wide"
                      >
                        Watch Video
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {projects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">No projects available at this time.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}