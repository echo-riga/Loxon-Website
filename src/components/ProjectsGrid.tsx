'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
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

const AUTO_ROTATE_MS = 5000

// Format a date string (YYYY-MM-DD or ISO) as a full readable date
const fmtFullDate = (val: string | null): string => {
  if (!val) return '—'
  const d = new Date(val)
  if (isNaN(d.getTime())) return val
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Format a date string as year only
const fmtYear = (val: string | null): string => {
  if (!val) return '—'
  const d = new Date(val)
  if (isNaN(d.getTime())) return '—'
  return String(d.getFullYear())
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    setIsPaused(false)
  }

  const closeModal = () => {
    setSelectedProject(null)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => {
      if (!selectedProject) return prev
      const count = selectedProject.images.length
      if (count === 0) return prev
      return (prev + 1) % count
    })
  }, [selectedProject])

  const prevImage = () => {
    setCurrentImageIndex((prev) => {
      if (!selectedProject) return prev
      const count = selectedProject.images.length
      if (count === 0) return prev
      return (prev - 1 + count) % count
    })
  }

  // Auto-rotate carousel every AUTO_ROTATE_MS, pause on hover
  useEffect(() => {
    if (!selectedProject || isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }
    if (selectedProject.images.length <= 1) return

    timerRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length)
    }, AUTO_ROTATE_MS)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [selectedProject, isPaused])

  // Close modal on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    if (selectedProject) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedProject])

  // Build the list of images to show in the modal:
  // prefer sub-images, fall back to the project's main image_url
  const modalImages: { image_url: string; caption: string | null }[] = selectedProject
    ? selectedProject.images.length > 0
      ? selectedProject.images
      : selectedProject.image_url
        ? [{ image_url: selectedProject.image_url, caption: null }]
        : []
    : []

  return (
    <>
      {/* Hero Section */}
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

      {/* Projects Table */}
      <section className="py-24 md:py-32 bg-white w-full">
        <div className="w-full px-8 md:px-16 lg:px-32">
          {projects.length > 0 ? (
            <Reveal animation="fade-up">
              <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-sky-600 text-white">
                      <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider whitespace-nowrap">Project</th>
                      <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider whitespace-nowrap">Type</th>
                      <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider whitespace-nowrap">Location</th>
                      <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider whitespace-nowrap">Year</th>
                      <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider whitespace-nowrap">Client</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project, idx) => (
                      <tr
                        key={project.id}
                        onClick={() => openModal(project)}
                        className={`cursor-pointer transition duration-200 hover:bg-sky-50 ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'
                        } border-t border-gray-100`}
                      >
                        {/* Project column: title (hyperlink-styled) + description subtitle */}
                        <td className="px-6 py-5 align-top">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              openModal(project)
                            }}
                            className="text-left text-lg font-bold text-sky-600 hover:text-sky-700 hover:underline transition duration-200 focus:outline-none"
                          >
                            {project.title}
                          </button>
                          {project.description && (
                            <p className="text-gray-600 text-sm leading-relaxed mt-1 line-clamp-2 max-w-xl">
                              {project.description}
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-5 align-top text-gray-700 whitespace-nowrap">
                          {project.project_type || '—'}
                        </td>
                        <td className="px-6 py-5 align-top text-gray-700 whitespace-nowrap">
                          {project.location || '—'}
                        </td>
                        <td className="px-6 py-5 align-top text-gray-700 whitespace-nowrap">
                          {fmtYear(project.constructed_date)}
                        </td>
                        <td className="px-6 py-5 align-top text-gray-700 whitespace-nowrap">
                          {project.client_name || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">No projects available at this time.</p>
            </div>
          )}
        </div>
      </section>

      {/* Side-by-Side Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 text-white text-xl transition duration-200"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Left 50% — Image Carousel */}
            <div
              className="w-full md:w-1/2 bg-gray-900 relative min-h-[280px] md:min-h-[60vh] flex items-center justify-center"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {modalImages.length > 0 ? (
                <>
                  <img
                    src={modalImages[currentImageIndex]?.image_url}
                    alt={modalImages[currentImageIndex]?.caption || selectedProject.title}
                    className="w-full h-full object-contain max-h-[60vh]"
                  />
                  {/* Prev arrow */}
                  {modalImages.length > 1 && (
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl transition"
                      aria-label="Previous image"
                    >
                      &lsaquo;
                    </button>
                  )}
                  {/* Next arrow */}
                  {modalImages.length > 1 && (
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl transition"
                      aria-label="Next image"
                    >
                      &rsaquo;
                  </button>
                  )}
                  {/* Caption & counter */}
                  {modalImages.length > 1 && (
                    <div className="absolute bottom-0 left-0 right-0 text-center text-white bg-black/60 py-2 text-sm">
                      {modalImages[currentImageIndex]?.caption && (
                        <span>{modalImages[currentImageIndex].caption} &nbsp;|&nbsp; </span>
                      )}
                      {currentImageIndex + 1} / {modalImages.length}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 p-8 text-center">
                  No images available for this project.
                </div>
              )}
            </div>

            {/* Right 50% — Project Details */}
            <div className="w-full md:w-1/2 p-8 md:p-10 overflow-y-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-4 pr-8">
                {selectedProject.title}
              </h3>

              {selectedProject.description && (
                <p className="text-gray-700 leading-relaxed mb-6">
                  {selectedProject.description}
                </p>
              )}

              {/* Metadata grid */}
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-6">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Type</dt>
                  <dd className="text-gray-800">{selectedProject.project_type || '—'}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Location</dt>
                  <dd className="text-gray-800">{selectedProject.location || '—'}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Constructed Date</dt>
                  <dd className="text-gray-800">{fmtFullDate(selectedProject.constructed_date)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Client</dt>
                  <dd className="text-gray-800">{selectedProject.client_name || '—'}</dd>
                </div>
              </dl>

              {/* Video link */}
              {selectedProject.video_url && (
                <a
                  href={selectedProject.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sky-600 font-medium hover:underline text-sm uppercase tracking-wide"
                >
                  Watch Video
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
