'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { C } from '@/lib/constants'
import type { Leader } from '@/types'

const AUTOPLAY_INTERVAL = 3000
const CARD_GAP = 20

function Track({
  members,
  visibleCount,
  currentIndex,
  setCurrentIndex,
}: {
  members: Leader[]
  visibleCount: number
  currentIndex: number
  setCurrentIndex: (n: number | ((n: number) => number)) => void
}) {
  const TRANSITION_MS = 500
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [transitionEnabled, setTransitionEnabled] = useState(true)

  const items = useMemo(() => {
    if (!members.length) return []
    return members.concat(members.slice(0, Math.min(visibleCount, members.length)))
  }, [members, visibleCount])

  const itemWidthPercent = 100 / visibleCount
  const translatePercent = -(currentIndex * itemWidthPercent)

  useEffect(() => {
    if (currentIndex === members.length) {
      const t = setTimeout(() => {
        setTransitionEnabled(false)
        setCurrentIndex(0)
        requestAnimationFrame(() => requestAnimationFrame(() => setTransitionEnabled(true)))
      }, TRANSITION_MS)

      return () => clearTimeout(t)
    }
  }, [currentIndex, members.length, setCurrentIndex])

  return (
    <div className="relative">
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          transform: `translateX(${translatePercent}%)`,
          transition: transitionEnabled ? `transform ${TRANSITION_MS}ms ease` : 'none',
          gap: `${CARD_GAP}px`,
        }}
      >
        {items.map((member, idx) => (
          <article
            key={`${member.name}-${idx}`}
            className="group rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-1.5"
            style={{
              background: C.white,
              border: `1px solid ${C.border}`,
              flex: `0 0 calc(${itemWidthPercent}% - ${(CARD_GAP * (visibleCount - 1)) / visibleCount}px)`,
              minWidth: 0,
            }}
          >
            <div className="overflow-hidden relative" style={{ background: C.lightGray, aspectRatio: '3/4' }}>
              <Image
                src={member.img}
                alt={member.name}
                fill
                className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="p-5">
              <p className="font-display font-bold text-base leading-tight" style={{ color: C.text }}>
                {member.name}
              </p>
              <p className="text-xs mt-1.5 font-bold" style={{ color: C.crimson, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {member.role}
              </p>
              <p className="text-xs mt-1" style={{ color: C.muted }}>
                {member.batch}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export function Organization({ members }: { members: Leader[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [visibleCount, setVisibleCount] = useState(4)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  /*
   * Responsive visible cards
   */
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(2)
      } else {
        setVisibleCount(4)
      }
    }

    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)

    return () => {
      window.removeEventListener('resize', updateVisibleCount)
    }
  }, [])

  /*
   * Reset position when responsive breakpoint changes
   */
  useEffect(() => {
    setCurrentIndex(0)
  }, [visibleCount])

  /*
   * Move carousel with safeguard against rapid clicks
   */
  const next = useCallback(() => {
    if (members.length <= visibleCount || isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prev) => {
      const nextIndex = (prev + 1) % members.length
      setTimeout(() => setIsTransitioning(false), TRANSITION_MS)
      return nextIndex
    })
  }, [members.length, visibleCount, isTransitioning])

  const previous = useCallback(() => {
    if (members.length <= visibleCount || isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prev) => {
      const prevIndex = prev === 0 ? members.length - 1 : prev - 1
      setTimeout(() => setIsTransitioning(false), TRANSITION_MS)
      return prevIndex
    })
  }, [members.length, visibleCount, isTransitioning])

  const TRANSITION_MS = 500

  /*
   * Autoplay every 3 seconds
   */
  useEffect(() => {
    if (isPaused || members.length <= visibleCount) {
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
  }, [isPaused, next, members.length, visibleCount])

  if (!members.length) {
    return null
  }

  return (
    <Section id="organisation" style={{ background: C.warmWhite }}>
      <SectionHeading eyebrow="Leadership" title="MEET THE PEOPLE BEHIND GEMARAWANA" />

      {/* Carousel */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Previous Button */}
        {members.length > visibleCount && (
          <button
            type="button"
            onClick={previous}
            aria-label="Previous member"
            disabled={isTransitioning}
            className="absolute -left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border bg-white transition-all duration-300 hover:-translate-x-1 hover:bg-[#8B1A1A] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 lg:-left-6"
            style={{
              borderColor: C.crimson,
              color: C.crimson,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {/* Cards: sliding track */}
        <div className="overflow-hidden">
          <Track
            members={members}
            visibleCount={visibleCount}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </div>

        {/* Next Button */}
        {members.length > visibleCount && (
          <button
            type="button"
            onClick={next}
            aria-label="Next story"
            className="absolute -right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border bg-white transition-all duration-300 hover:translate-x-1 hover:bg-[#8B1A1A] hover:text-white lg:-right-6"
            style={{
              borderColor: C.crimson,
              color: C.crimson,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Progress Indicators */}
      {members.length > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {members.map((member, index) => (
            <button
              key={`${member.name}-indicator-${index}`}
              type="button"
              aria-label={`Go to member ${index + 1}`}
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
              {/* Loading progress */}
              {index === currentIndex && !isPaused && (
                <span
                  key={`progress-${currentIndex}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-[#C94A4A]"
                  style={{
                    animation: `orgProgress ${AUTOPLAY_INTERVAL}ms linear forwards`,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Progress animation */}
      <style jsx>{`
        @keyframes orgProgress {
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