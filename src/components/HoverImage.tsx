'use client'

import Image from 'next/image'

interface HoverImageProps {
  src: string
  alt: string
}

export default function HoverImage({ src, alt }: HoverImageProps) {
  return (
    <Image width={1600} height={900} sizes="100vw"
      src={src}
      alt={alt}
      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
      onMouseOver={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'}
      onMouseOut={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'}
    />
  )
}