import React from 'react'
import { C } from '@/lib/constants'

interface SectionHeadingProps {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center' | 'between'
  className?: string
  eyebrowColor?: string
  titleColor?: string
  descColor?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  eyebrowColor = C.crimson,
  titleColor = C.text,
  descColor = C.muted,
}: SectionHeadingProps) {
  if (align === 'between') {
    return (
      <div className={`mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 ${className}`}>
        <div>
          {eyebrow && (
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: eyebrowColor, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              {eyebrow}
            </p>
          )}
          <h2
            className="font-display font-black leading-none"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.75rem)', color: titleColor, letterSpacing: '-0.02em' }}
          >
            {title}
          </h2>
        </div>
        {description && (
          <p className="text-base md:text-lg max-w-sm leading-relaxed" style={{ color: descColor }}>
            {description}
          </p>
        )}
      </div>
    )
  }

  return (
    <div
      className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'
        } ${className}`}
    >
      {eyebrow && (
        <p
          className="text-xs font-bold tracking-widest uppercase mb-3"
          style={{ color: eyebrowColor, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="font-display font-black leading-none mb-5"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4.75rem)', color: titleColor, letterSpacing: '-0.02em' }}
      >
        {title}
      </h2>
      {description && (
        <p className="text-base md:text-lg leading-relaxed" style={{ color: descColor }}>
          {description}
        </p>
      )}
    </div>
  )
}
