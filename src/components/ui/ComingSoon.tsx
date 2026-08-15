"use client"

import React, { useState } from 'react'

type Props = {
  children: React.ReactNode
  message?: string
  className?: string
}

export function ComingSoon({ children, message = 'Coming Soon', className = '' }: Props) {
  const [visible, setVisible] = useState(false)

  const show = (e: React.MouseEvent | any) => {
    // prevent navigation / action
    e?.preventDefault()
    e?.stopPropagation()
    setVisible(true)
    window.setTimeout(() => setVisible(false), 1500)
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      show(e)
    }
  }

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={message}
      className={`inline-block relative ${className}`}
      onClick={show}
      onKeyDown={handleKey}
    >
      {children}

      {visible && (
        <span className="absolute z-50 right-0 -top-8 inline-flex items-center px-3 py-1 bg-black text-white text-xs rounded-md shadow-lg">
          {message}
        </span>
      )}
    </span>
  )
}

export default ComingSoon
