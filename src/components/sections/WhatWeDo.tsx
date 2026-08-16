"use client"

import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { C } from '@/lib/constants'
import type { Activity } from '@/types'
import { useModal } from '@/components/ui/ModalProvider'

function ActivityCard({ act, className, style }: { act: Activity; className?: string; style?: React.CSSProperties }) {
  const { openModal } = useModal()

  return (
    <div
      className={`relative group rounded-2xl overflow-hidden cursor-pointer ${className ?? ''}`}
      style={{ background: C.lightGray, ...style }}
      role="button"
      tabIndex={0}
      onClick={e => {
        e.preventDefault()
        openModal({ title: act.title, message: act.sub ?? 'Explore this activity soon.' })
      }}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          openModal({ title: act.title, message: act.sub ?? 'Explore this activity soon.' })
        }
      }}
    >
      <Image
        src={act.img}
        alt={act.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ filter: 'brightness(0.45)' }}
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div
        className="absolute inset-0 flex flex-col justify-end p-7 z-10"
        style={{ background: 'linear-gradient(to top, rgba(20,6,6,0.92), rgba(20,6,6,0.1) 60%, transparent)' }}
      >
        <h3 className="font-display font-black text-lg md:text-xl text-white mb-1.5">{act.title}</h3>
        <p className="text-xs text-white/70 mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{act.sub}</p>
        <span
          className="text-xs font-bold text-white/60 group-hover:text-white transition-all duration-300 inline-flex items-center gap-1.5 group-hover:gap-2.5"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          Explore
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block ml-1" aria-hidden>
            <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  )
}

export function WhatWeDo({ activities }: { activities: Activity[] }) {
  return (
    <Section id="kegiatan" style={{ background: C.white }}>
      <SectionHeading
        eyebrow="Activities"
        title={<>WHAT<br />WE DO</>}
        description="From learning the basics to standing on the summit."
        align="between"
      />

      {/* Bento grid with uniform 24px gaps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" style={{ gridAutoRows: '290px' }}>
        {activities.map(act => (
          <ActivityCard key={act.title} act={act} className={act.bentoClass} />
        ))}
      </div>
    </Section>
  )
}
