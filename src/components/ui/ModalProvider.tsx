"use client"

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import Modal from './Modal'

type ModalContextValue = {
  openModal: (opts?: { title?: string; message?: string }) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState<string | undefined>()
  const [message, setMessage] = useState<string | undefined>()

  const openModal = useCallback((opts?: { title?: string; message?: string }) => {
    setTitle(opts?.title)
    setMessage(opts?.message)
    setOpen(true)
  }, [])

  const closeModal = useCallback(() => setOpen(false), [])

  const value = useMemo(() => ({ openModal, closeModal }), [openModal, closeModal])

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Modal open={open} title={title} message={message} onClose={closeModal} />
    </ModalContext.Provider>
  )
}

export function useModal() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used within ModalProvider')
  return ctx
}

export default ModalProvider
