'use client'

import { useCallback, useState } from 'react'
import type { ProjectWithImages } from '@/lib/api'
import ProjectModal from './ProjectModal'
import Reveal from './Reveal'
import SmoothImage from './SmoothImage'

export default function FeaturedProjects({ projects }: { projects: ProjectWithImages[] }) {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? null
  const closeModal = useCallback(() => setSelectedProjectId(null), [])

  return (
    <>
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.id} animation="fade-up" delay={index * 120} className="group cursor-pointer">
            <button type="button" onClick={() => setSelectedProjectId(project.id)} className="w-full text-left">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-sm ring-1 ring-sky-100/70 transition duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:ring-sky-300/70">
                {project.image_url && (
                  <SmoothImage src={project.image_url} alt={project.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-sky-950/60 via-sky-900/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-5 left-5 translate-y-3 text-sm font-semibold tracking-wider text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  VIEW PROJECT
                </div>
              </div>
              <div className="mt-6">
                <h3 className="mb-2 text-2xl font-bold text-gray-900 transition group-hover:text-sky-600">{project.title}</h3>
                <p className="line-clamp-3 leading-relaxed text-gray-600">{project.description}</p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={closeModal} />}
    </>
  )
}
