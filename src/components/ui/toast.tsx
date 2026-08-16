'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type ToastItem = {
  id: number
  message: string
  type: 'success' | 'error'
}

let toastId = 0
const listeners = new Set<(items: ToastItem[]) => void>()
let toasts: ToastItem[] = []

function emit() {
  listeners.forEach(l => l([...toasts]))
}

export function toast(message: string, type: 'success' | 'error' = 'success') {
  const id = ++toastId
  toasts = [...toasts, { id, message, type }]
  emit()
  setTimeout(() => {
    toasts = toasts.filter(t => t.id !== id)
    emit()
  }, 3500)
}

export function ToastViewport() {
  const [items, setItems] = useState<ToastItem[]>([])

  useEffect(() => {
    listeners.add(setItems)
    setItems([...toasts])
    return () => {
      listeners.delete(setItems)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[300] flex w-full max-w-sm flex-col gap-2">
      {items.map(item => (
        <div
          key={item.id}
          className={cn(
            'pointer-events-auto rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg',
            item.type === 'success' ? 'bg-emerald-700' : 'bg-red-600'
          )}
          role="status"
        >
          {item.message}
        </div>
      ))}
    </div>
  )
}
