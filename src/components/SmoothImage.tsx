'use client'

import { useState } from 'react'
import Image, { type ImageProps } from 'next/image'

function LoadingImage({ className = '', onLoad, onError, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false)
  return (
    <Image
      {...props}
      className={className + ' smooth-image ' + (loaded ? 'smooth-image-ready' : 'smooth-image-pending')}
      onLoad={event => { setLoaded(true); onLoad?.(event) }}
      onError={event => { setLoaded(true); onError?.(event) }}
    />
  )
}

export default function SmoothImage(props: ImageProps) {
  // Remount on source changes so a previous photo cannot remain visible.
  return <LoadingImage key={typeof props.src === 'string' ? props.src : JSON.stringify(props.src)} {...props} />
}
