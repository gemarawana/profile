'use client'

import { useState, useEffect } from 'react'
import { C } from '@/lib/constants'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-400"
      style={{
        background: C.crimson,
        color: '#fff',
        boxShadow: '0 4px 24px rgba(139,26,26,0.45)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.8)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      aria-label="Scroll to top"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 14V4M4 9l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
