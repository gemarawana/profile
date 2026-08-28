'use client'

import { useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

export function SmoothImage({
  className,
  alt,
  onLoad,
  ...props
}: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Image
      alt={alt || ''}
      className={cn(
        'transition-all duration-700 ease-out',
        isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm',
        className
      )}
      onLoad={(e) => {
        setIsLoaded(true)
        if (onLoad) {
          onLoad(e)
        }
      }}
      {...props}
    />
  )
}
