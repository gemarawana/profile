'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { C } from '@/lib/constants'
import type { Story } from '@/types'

const AUTOPLAY_INTERVAL = 3000
const CARD_GAP = 20 // gap in pixels
const DRAG_THRESHOLD = 50 // Minimum drag distance to trigger slide

function Track({
  stories,
  visibleCount,
  currentIndex,
  setCurrentIndex,
  isTransitioning,
  onDragStart,
  onDragEnd,
  trackRef,
}: {
  stories: Story[]
  visibleCount: number
  currentIndex: number
  setCurrentIndex: (n: number | ((n: number) => number)) => void
  isTransitioning: boolean
  onDragStart: (e: React.MouseEvent | React.TouchEvent) => void
  onDragEnd: () => void
  trackRef: React.RefObject<HTMLDivElement | null>
}) {
  const TRANSITION_MS = 500
  const [transitionEnabled, setTransitionEnabled] = useState(true)

  const items = useMemo(() => {
    if (!stories.length) return []
    return stories.concat(stories.slice(0, Math.min(visibleCount, stories.length)))
  }, [stories, visibleCount])

  const itemWidthPercent = 100 / visibleCount
  
  // PERBAIKAN RUMUS:
  // (Index * Lebar Persentase) + (Index * Gap / visibleCount)
  const gapShift = (currentIndex * CARD_GAP) / visibleCount
  const translateValue = `calc(-${currentIndex * itemWidthPercent}% - ${gapShift}px)`

  useEffect(() => {
    if (currentIndex === stories.length) {
      const t = setTimeout(() => {
        setTransitionEnabled(false)
        setCurrentIndex(0)
        requestAnimationFrame(() => requestAnimationFrame(() => setTransitionEnabled(true)))
      }, TRANSITION_MS)

      return () => clearTimeout(t)
    }
  }, [currentIndex, stories.length, setCurrentIndex])

  return (
    <div
      className="relative touch-pan-y overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
      onMouseUp={onDragEnd}
      onTouchEnd={onDragEnd}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          transform: `translateX(${translateValue})`,
          transition: transitionEnabled ? `transform ${TRANSITION_MS}ms ease` : 'none',
          gap: `${CARD_GAP}px`,
          willChange: 'transform',
        }}
      >
        {items.map((story, idx) => (
          <article
            key={`${story.name}-${idx}`}
            className="group flex flex-col overflow-hidden rounded-2xl border bg-white select-none"
            style={{
              borderColor: C.border,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              flex: `0 0 calc(${itemWidthPercent}% - ${(CARD_GAP * (visibleCount - 1)) / visibleCount}px)`,
              minWidth: 0,
              userSelect: 'none',
            }}
          >
            {/* Konten Card (Tetap sama) */}
            <div className="relative h-60 overflow-hidden pointer-events-none" style={{ background: C.lightGray }}>
              <Image
                src={story.img}
                alt={story.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none"
                style={{ filter: 'brightness(0.85) saturate(0.9)' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                draggable={false}
              />
              <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, rgba(20,6,6,0.35), transparent)' }} />
            </div>

            <div className="flex flex-1 flex-col bg-white p-7">
              <div className="mb-6">
                <span className="mb-2 block font-display text-3xl leading-none" style={{ color: C.crimson }}>&quot;</span>
                <p className="flex-1 text-base leading-relaxed" style={{ color: C.textSub, fontStyle: 'italic' }}>{story.quote}</p>
              </div>
              <div className="mt-auto border-t pt-5" style={{ borderColor: C.border }}>
                <p className="font-display text-base font-bold" style={{ color: C.text }}>{story.name}</p>
                <p className="mt-1 text-xs" style={{ color: C.muted }}>{story.batch}</p>
              </div>
              {/* <a href="#cerita" className="mt-4 inline-flex items-center gap-1 text-xs font-bold tracking-wide transition-all duration-200 group-hover:gap-2" style={{ color: C.crimson, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                READ THEIR STORY
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block ml-1" aria-hidden>
                  <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a> */}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export function MemberStories({ stories }: { stories: Story[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [visibleCount, setVisibleCount] = useState(3)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  const dragStartRef = useRef<{ x: number; y: number } | null>(null)
  const dragDeltaRef = useRef<number>(0)
  const isDraggingRef = useRef(false)

  const TRANSITION_MS = 500

  /* Responsive visible cards */
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2)
      } else {
        setVisibleCount(3)
      }
    }

    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)

    return () => {
      window.removeEventListener('resize', updateVisibleCount)
    }
  }, [])

  /* Reset position when responsive breakpoint changes */
  useEffect(() => {
    setCurrentIndex(0)
  }, [visibleCount])

  /* Move carousel with safeguard against rapid clicks */
  const next = useCallback(() => {
    if (stories.length <= visibleCount || isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prev) => {
      const nextIndex = (prev + 1) % stories.length
      setTimeout(() => setIsTransitioning(false), TRANSITION_MS)
      return nextIndex
    })
  }, [stories.length, visibleCount, isTransitioning])

  const previous = useCallback(() => {
    if (stories.length <= visibleCount || isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prev) => {
      const prevIndex = prev === 0 ? stories.length - 1 : prev - 1
      setTimeout(() => setIsTransitioning(false), TRANSITION_MS)
      return prevIndex
    })
  }, [stories.length, visibleCount, isTransitioning])

  /* Handle drag start */
  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (stories.length <= visibleCount || isTransitioning) return

      isDraggingRef.current = true
      setIsPaused(true)

      const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
      dragStartRef.current = { x: clientX, y: 0 }
      dragDeltaRef.current = 0

      if (trackRef.current) {
        trackRef.current.style.transition = 'none'
      }
    },
    [stories.length, visibleCount, isTransitioning]
  )

/* Handle drag move (Real-time DOM update) */
  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDraggingRef.current || !dragStartRef.current || !trackRef.current) return

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX
    const delta = clientX - dragStartRef.current.x
    dragDeltaRef.current = delta

    const itemWidthPercent = 100 / visibleCount
    const gapShift = (currentIndex * CARD_GAP) / visibleCount // PERBAIKAN DI SINI
    
    trackRef.current.style.transform = `translateX(calc(-${currentIndex * itemWidthPercent}% - ${gapShift}px + ${delta}px))`
  }, [currentIndex, visibleCount])

  /* Handle drag end */
  const handleDragEnd = useCallback(() => {
    if (!isDraggingRef.current) return

    isDraggingRef.current = false

    if (trackRef.current) {
      trackRef.current.style.transition = `transform ${TRANSITION_MS}ms ease`
    }

    if (Math.abs(dragDeltaRef.current) > DRAG_THRESHOLD) {
      if (dragDeltaRef.current > 0) {
        previous()
      } else {
        next()
      }
    } else {
      const itemWidthPercent = 100 / visibleCount
      const gapShift = (currentIndex * CARD_GAP) / visibleCount // PERBAIKAN DI SINI
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(calc(-${currentIndex * itemWidthPercent}% - ${gapShift}px))`
      }
    }

    dragStartRef.current = null
    dragDeltaRef.current = 0
    setIsPaused(false)
  }, [next, previous, currentIndex, visibleCount])

  /* Attach drag move and end listeners */
  useEffect(() => {
    if (stories.length <= visibleCount) return

    const onMove = (e: MouseEvent | TouchEvent) => handleDragMove(e)
    const onEnd = () => handleDragEnd()

    document.addEventListener('mousemove', onMove)
    document.addEventListener('touchmove', onMove)
    document.addEventListener('mouseup', onEnd)
    document.addEventListener('touchend', onEnd)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('touchmove', onMove)
      document.removeEventListener('mouseup', onEnd)
      document.removeEventListener('touchend', onEnd)
    }
  }, [handleDragMove, handleDragEnd, stories.length, visibleCount])

  /* Autoplay every 5 seconds */
  useEffect(() => {
    if (isPaused || stories.length <= visibleCount) {
      return
    }

    autoplayRef.current = setInterval(() => {
      next()
    }, AUTOPLAY_INTERVAL)

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [isPaused, next, stories.length, visibleCount])

  if (!stories.length) {
    return null
  }

  return (
    <Section id="cerita" style={{ background: C.white }}>
      <SectionHeading
        eyebrow="People"
        title={
          <>
            THE PEOPLE
            <br />
            BEHIND THE
            <br />
            JOURNEY.
          </>
        }
      />

      {/* Carousel */}
      <div
        className="relative"
        onMouseEnter={() => !isDraggingRef.current && setIsPaused(true)}
        onMouseLeave={() => !isDraggingRef.current && setIsPaused(false)}
      >
        {/* Previous Button */}
        {stories.length > visibleCount && (
          <button
            type="button"
            onClick={previous}
            aria-label="Previous story"
            disabled={isTransitioning}
            className="absolute -left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border bg-white transition-all duration-300 hover:-translate-x-1 hover:bg-[#8B1A1A] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 lg:-left-6 shadow-md"
            style={{
              borderColor: C.crimson,
              color: C.crimson,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Cards: sliding track */}
        <div className="overflow-hidden">
          <Track
            stories={stories}
            visibleCount={visibleCount}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            isTransitioning={isTransitioning}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            trackRef={trackRef}
          />
        </div>

        {/* Next Button */}
        {stories.length > visibleCount && (
          <button
            type="button"
            onClick={next}
            aria-label="Next story"
            className="absolute -right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border bg-white transition-all duration-300 hover:translate-x-1 hover:bg-[#8B1A1A] hover:text-white lg:-right-6 shadow-md"
            style={{
              borderColor: C.crimson,
              color: C.crimson,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Progress Indicators */}
      {stories.length > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {stories.map((story, index) => (
            <button
              key={`${story.name}-indicator-${index}`}
              type="button"
              aria-label={`Go to story ${index + 1}`}
              onClick={() => {
                setCurrentIndex(index)
                setIsPaused(false)
              }}
              disabled={isTransitioning}
              className="group relative h-1 overflow-hidden rounded-full transition-all duration-300 disabled:cursor-not-allowed"
              style={{
                width: index === currentIndex ? 42 : 24,
                background: index === currentIndex ? C.crimson : C.border,
                opacity: isTransitioning ? 0.5 : 1,
              }}
            >
              {index === currentIndex && !isPaused && (
                <span
                  key={`progress-${currentIndex}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-[#C94A4A]"
                  style={{
                    animation: `storyProgress ${AUTOPLAY_INTERVAL}ms linear forwards`,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Progress animation */}
      <style jsx>{`
        @keyframes storyProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </Section>
  )
}