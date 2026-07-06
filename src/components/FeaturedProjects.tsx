'use client'

import { useState } from 'react'
import Link from 'next/link'
import Reveal from './Reveal'

interface ProjectImage {
  id: number
  image_url: string
  caption: string | null
}

interface Project {
  id: number
  title: string
  image_url: string | null
  description: string | null
  video_url: string | null
  project_type: string | null
  constructed_date: string | null
  location: string | null
  client_name: string | null
  images: ProjectImage[]
}

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const closeModal = () => setSelectedProject(null)
  const nextImage = () => setCurrentImageIndex((i) => (i + 1) % (selectedProject?.images.length ?? 1))
  const prevImage = () => setCurrentImageIndex((i) => (i - 1 + (selectedProject?.images.length ?? 1)) % (selectedProject?.images.length ?? 1))

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {projects.map((project, idx) => (
          <Reveal
            key={project.id}
            animation="fade-up"
            delay={idx * 120}
            className="group cursor-pointer"
          >
            <div onClick={() => openModal(project)}>
              <div className="relative overflow-hidden bg-gray-100 rounded-2xl aspect-[4/3]">
                {project.image_url && (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
              </div>
              <div className="mt-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition">
                  {project.title}
                </h3>
                <p className="text-gray-600 leading-relaxed line-clamp-3">{project.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Modal (same as ProjectsGrid) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={closeModal}>
          <div className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">{selectedProject.title}</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            <div className="relative aspect-video bg-gray-100">
              {selectedProject.images?.length > 0 ? (
                <>
                  <img src={selectedProject.images[currentImageIndex].image_url} alt="" className="w-full h-full object-contain" />
                  <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 w-10 h-10">‹</button>
                  <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 w-10 h-10">›</button>
                  <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black/50 py-2 text-sm">
                    {selectedProject.images[currentImageIndex].caption && <span>{selectedProject.images[currentImageIndex].caption} | </span>}
                    {currentImageIndex + 1} / {selectedProject.images.length}
                  </div>
                </>
              ) : <div className="flex items-center justify-center h-full text-gray-500">No sub‑images</div>}
            </div>
          </div>
        </div>
      )}
    </>
  )
}