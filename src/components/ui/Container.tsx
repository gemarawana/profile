import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-12 w-full ${className}`}>
      {children}
    </div>
  )
}
