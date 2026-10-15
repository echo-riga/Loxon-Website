'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import type { ProjectWithImages } from '@/lib/api'

const AUTO_ROTATE_MS = 5000

const formatFullDate = (value: string | null): string => {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

interface ProjectModalProps {
  project: ProjectWithImages
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const modalImages = useMemo(
    () => project.images.length > 0
      ? project.images
      : project.image_url
        ? [{ id: project.id, image_url: project.image_url, caption: null }]
        : [],
    [project],
  )
  const visibleImageIndex = currentImageIndex % Math.max(modalImages.length, 1)

  const nextImage = useCallback(() => {
    setCurrentImageIndex((index) => (index + 1) % Math.max(modalImages.length, 1))
  }, [modalImages.length])

  const prevImage = () => {
    setCurrentImageIndex((index) => (index - 1 + modalImages.length) % Math.max(modalImages.length, 1))
  }

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  useEffect(() => {
    if (isPaused || modalImages.length <= 1) return
    const timer = window.setInterval(nextImage, AUTO_ROTATE_MS)
    return () => window.clearInterval(timer)
  }, [isPaused, modalImages.length, nextImage])

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:flex-row"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-xl text-white transition duration-200 hover:bg-black/70"
          aria-label="Close project details"
        >
          &times;
        </button>

        <div
          className="relative flex min-h-[280px] w-full items-center justify-center bg-gray-900 md:min-h-[60vh] md:w-1/2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {modalImages.length > 0 ? (
            <>
              <Image
                src={modalImages[visibleImageIndex].image_url}
                alt={modalImages[visibleImageIndex].caption || project.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain"
              />
              {modalImages.length > 1 && (
                <>
                  <button type="button" onClick={prevImage} className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl text-white transition hover:bg-black/80" aria-label="Previous image">
                    &lsaquo;
                  </button>
                  <button type="button" onClick={nextImage} className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl text-white transition hover:bg-black/80" aria-label="Next image">
                    &rsaquo;
                  </button>
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 py-2 text-center text-sm text-white">
                    {modalImages[visibleImageIndex].caption && <span>{modalImages[visibleImageIndex].caption} &nbsp;|&nbsp; </span>}
                    {visibleImageIndex + 1} / {modalImages.length}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="p-8 text-center text-gray-400">No images available for this project.</div>
          )}
        </div>

        <div className="w-full overflow-y-auto p-8 md:w-1/2 md:p-10">
          <h3 id="project-modal-title" className="mb-4 pr-8 text-3xl font-bold text-gray-900">{project.title}</h3>
          {project.description && <p className="mb-6 leading-relaxed text-gray-700">{project.description}</p>}

          <dl className="mb-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div>
              <dt className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Type</dt>
              <dd className="text-gray-800">{project.project_type || '—'}</dd>
            </div>
            <div>
              <dt className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Location</dt>
              <dd className="text-gray-800">{project.location || '—'}</dd>
            </div>
            <div>
              <dt className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Constructed Date</dt>
              <dd className="text-gray-800">{formatFullDate(project.constructed_date)}</dd>
            </div>
            <div>
              <dt className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Status</dt>
              <dd className="text-gray-800">{project.client_name || '—'}</dd>
            </div>
          </dl>

          {project.video_url && (
            <a href={project.video_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-sky-600 hover:underline">
              Watch Video
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
