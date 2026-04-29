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

      {/* Projects Grid */}
      <section className="py-24 md:py-32 bg-white w-full">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project: any, idx: number) => (
              <div
                key={project.id}
                className="group bg-white overflow-hidden shadow-md hover:shadow-2xl transition duration-500 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="overflow-hidden h-72">
                  {project.image_url && (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                  )}
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-3 text-gray-900">{project.title}</h2>
                  <p className="text-gray-600 leading-relaxed line-clamp-3">{project.description}</p>
                  {project.video_url && (
                    <a
                      href={project.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-5 text-sky-600 font-semibold hover:text-sky-700 transition duration-300"
                    >
                      WATCH VIDEO
                    </a>
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