"use client"

import React from 'react'
import { C } from '@/lib/constants'

export function Modal({ open, title, message, onClose }: { open: boolean; title?: string; message?: string; onClose: () => void }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative z-10 max-w-xl w-full mx-4 bg-white rounded-2xl p-6 shadow-2xl">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="font-display font-black text-lg" style={{ color: C.text }}>{title ?? 'Coming Soon'}</h3>
            <p className="text-sm mt-2" style={{ color: C.muted }}>{message ?? 'This feature is not available yet. Stay tuned or follow our socials for updates.'}</p>
          </div>
          <button aria-label="Close modal" onClick={onClose} className="ml-4 text-sm font-semibold text-[#6B1414]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
