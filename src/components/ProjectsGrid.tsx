'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import CollectionGate from './CollectionGate'
import ProjectModal from './ProjectModal'
import Reveal from './Reveal'
import { getProjects, type ProjectWithImages } from '@/lib/api'
import { useCollection } from '@/lib/use-collection'

const formatYear = (value: string | null): string => {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return String(date.getFullYear())
}

export default function ProjectsGrid({ initialProjects }: { initialProjects: ProjectWithImages[] }) {
  const content = useCollection(getProjects, initialProjects)
  const projects = content.data
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? null
  const closeModal = useCallback(() => setSelectedProjectId(null), [])

  return (
    <>
      <div className="relative h-[60vh] min-h-[450px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80"
          alt="Construction project site"
          fill
          priority
          sizes="100vw"
          className="hero-parallax object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <Reveal className="max-w-4xl px-6 text-center" duration={900}>
            <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl lg:text-7xl">Our Projects</h1>
            <p className="text-xl leading-relaxed text-gray-200 md:text-2xl">
              A showcase of our finest engineering and construction achievements across the Philippines.
            </p>
          </Reveal>
        </div>
      </div>

      <section className="w-full bg-white py-24 md:py-32">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <CollectionGate {...content} variant="rows">
            {projects.length > 0 ? (
              <Reveal animation="fade-up">
                <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-sky-600 text-white">
                        <th className="whitespace-nowrap px-6 py-4 text-sm font-semibold uppercase tracking-wider">Project</th>
                        <th className="whitespace-nowrap px-6 py-4 text-sm font-semibold uppercase tracking-wider">Type</th>
                        <th className="whitespace-nowrap px-6 py-4 text-sm font-semibold uppercase tracking-wider">Location</th>
                        <th className="whitespace-nowrap px-6 py-4 text-sm font-semibold uppercase tracking-wider">Year</th>
                        <th className="whitespace-nowrap px-6 py-4 text-sm font-semibold uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project, index) => (
                        <Reveal
                          as="tr"
                          animation="fade-right"
                          key={project.id}
                          onClick={() => setSelectedProjectId(project.id)}
                          delay={(index % 4) * 60}
                          className={`cursor-pointer border-t border-gray-100 hover:bg-sky-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}`}
                        >
                          <td className="px-6 py-5 align-top">
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation()
                                setSelectedProjectId(project.id)
                              }}
                              className="text-left text-lg font-bold text-sky-600 transition duration-200 hover:text-sky-700 hover:underline focus:outline-none"
                            >
                              {project.title}
                            </button>
                            {project.description && (
                              <p className="mt-1 line-clamp-2 max-w-xl text-sm leading-relaxed text-gray-600">{project.description}</p>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-6 py-5 align-top text-gray-700">{project.project_type || '—'}</td>
                          <td className="whitespace-nowrap px-6 py-5 align-top text-gray-700">{project.location || '—'}</td>
                          <td className="whitespace-nowrap px-6 py-5 align-top text-gray-700">{formatYear(project.constructed_date)}</td>
                          <td className="whitespace-nowrap px-6 py-5 align-top text-gray-700">{project.client_name || '—'}</td>
                        </Reveal>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            ) : !content.loading && !content.error ? (
              <div className="py-20 text-center">
                <p className="text-xl text-gray-500">No projects available at this time.</p>
              </div>
            ) : null}
          </CollectionGate>
        </div>
      </section>

      {selectedProject && <ProjectModal project={selectedProject} onClose={closeModal} />}
    </>
  )
}
