import React from 'react'
import { Container } from './Container'

interface SectionProps {
  id?: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  fullWidth?: boolean
  /**
   * Vertical spacing variant:
   *  sm  → py-12 md:py-16   (48px / 64px) — stats strips, compact blocks
   *  md  → py-16 md:py-24   (64px / 96px) — standard sections  [default]
   *  lg  → py-24 md:py-32   (96px / 128px) — content-heavy sections (journey, timeline)
   */
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap: Record<NonNullable<SectionProps['size']>, string> = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-24 md:py-32',
}

export function Section({
  id,
  children,
  className = '',
  style,
  fullWidth = false,
  size = 'md',
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${sizeMap[size]} ${className}`}
      style={style}
    >
      {fullWidth ? children : <Container>{children}</Container>}
    </section>
  )
}
