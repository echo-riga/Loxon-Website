// components/VideoModal.tsx
'use client'

import { useState, useEffect } from 'react'
import { X, Play } from 'lucide-react'

interface VideoModalProps {
  videoUrl: string | null
  title: string
}

export default function VideoModal({ videoUrl, title }: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Extract video ID from YouTube URL
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    const videoId = match && match[2].length === 11 ? match[2] : null
    if (videoId) return `https://www.youtube.com/embed/${videoId}`
    return url
  }

  const embedUrl = videoUrl ? getYouTubeEmbedUrl(videoUrl) : null

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!videoUrl) return null

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:underline mt-3"
      >
        <Play className="w-4 h-4" /> Watch Video
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl mx-4 bg-black rounded-xl overflow-hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition"
            >
              <X className="w-6 h-6" />
            </button>
            {embedUrl && (
              <iframe
                src={embedUrl}
                title={title}
                className="w-full aspect-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}