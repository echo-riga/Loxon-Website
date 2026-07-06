'use client'

import { useState } from 'react'
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
  images: ProjectImage[]
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const closeModal = () => setSelectedProject(null)

  const nextImage = () => {
    if (selectedProject && selectedProject.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length)
    }
  }

  const prevImage = () => {
    if (selectedProject && selectedProject.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length)
    }
  }

  return (
    <>
      {/* Hero Section (unchanged from your original) */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {projects.map((project, idx) => (
              <Reveal
                key={project.id}
                animation="fade-up"
                delay={idx * 100}
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
                        onClick={(e) => e.stopPropagation()}
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
              </Reveal>
            ))}
          </div>
          {projects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">No projects available at this time.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal with Slider */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">{selectedProject.title}</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>

            {/* Slider Area */}
            <div className="relative aspect-video bg-gray-100">
              {selectedProject.images && selectedProject.images.length > 0 ? (
                <>
                  <img
                    src={selectedProject.images[currentImageIndex].image_url}
                    alt={selectedProject.images[currentImageIndex].caption || `Sub‑image of ${selectedProject.title}`}
                    className="w-full h-full object-contain"
                  />
                  {/* Previous Arrow */}
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center"
                  >
                    &lsaquo;
                  </button>
                  {/* Next Arrow */}
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center"
                  >
                    &rsaquo;
                  </button>
                  {/* Caption & Counter */}
                  <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black/50 py-2 text-sm">
                    {selectedProject.images[currentImageIndex].caption && (
                      <span>{selectedProject.images[currentImageIndex].caption} &nbsp;|&nbsp; </span>
                    )}
                    {currentImageIndex + 1} / {selectedProject.images.length}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No sub‑images available for this project.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}