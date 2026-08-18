'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { C } from '@/lib/constants'
import type { GalleryItem } from '@/types'

const ITEMS_PER_PAGE = 12

export function GallerySection({ items }: { items: GalleryItem[] }) {
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const visibleItems = items.slice(0, visibleCount)
  const hasMoreItems = visibleCount < items.length

  function handleLoadMore() {
    setVisibleCount(count => Math.min(count + ITEMS_PER_PAGE, items.length))
  }

  return (
    <Section id="galeri" style={{ background: C.warmWhite }}>
      <SectionHeading
        eyebrow="Gallery"
        title={<>LIFE AT<br />GEMARAWANA</>}
        description="Not every great memory happens at the summit."
        align="center"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" style={{ gridAutoRows: '210px', gridAutoFlow: 'dense' }}>
        {visibleItems.map((g, i) => (
          <button
            key={`${g.img}-${i}`}
            className={`group relative rounded-2xl overflow-hidden cursor-zoom-in ${g.className}`}
            style={{ background: C.lightGray }}
            onClick={() => setLightbox(g.img)}
            aria-label={`View photo: ${g.alt}`}
          >
            <Image
              src={g.img}
              alt={g.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
              style={{ background: 'rgba(139,26,26,0.25)' }}
            >
              <span className="text-white font-bold text-sm bg-black/40 rounded-full px-5 py-2 backdrop-blur-sm">
                View
              </span>
            </div>
          </button>
        ))}
      </div>

      {hasMoreItems && (
        <div className="mt-10 w-full">
          <button
            type="button"
            onClick={handleLoadMore}
            className="w-full rounded-full border-[1.5px] border-[#8B1A1A] bg-transparent px-7 py-2 text-lg font-bold text-[#8B1A1A] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8B1A1A] hover:text-white"
          >
            See More
          </button>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12"
          style={{ background: 'rgba(20,6,6,0.95)', backdropFilter: 'blur(10px)' }}
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          {/* 
            PERUBAHAN 1: Pindahkan posisi button ke bawah container gambar 
            atau berikan z-index yang lebih tinggi (z-[110]) agar selalu di atas 
            dan tidak tertutup elemen lain di perangkat seluler.
          */}
          <button
            type="button"
            className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-2xl transition-all duration-200 hover:bg-[#8B1A1A] hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
            style={{ background: 'rgba(250,245,245,0.2)' }}
            onClick={(e) => {
              e.stopPropagation()
              setLightbox(null)
            }}
            aria-label="Close lightbox"
          >
            &times;
          </button>

          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <Image
              src={lightbox}
              alt="Gallery photo"
              fill
              className="object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </Section>
  )
}