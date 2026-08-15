'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { C } from '@/lib/constants'
import type { Story } from '@/types'

const AUTOPLAY_INTERVAL = 3000
const CARD_GAP = 20 // gap in pixels

function Track({
  stories,
  visibleCount,
  currentIndex,
  setCurrentIndex,
}: {
  stories: Story[]
  visibleCount: number
  currentIndex: number
  setCurrentIndex: (n: number | ((n: number) => number)) => void
}) {
  const TRANSITION_MS = 500
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [transitionEnabled, setTransitionEnabled] = useState(true)

  const items = useMemo(() => {
    if (!stories.length) return []
    // append first `visibleCount` items to allow forward wrap
    return stories.concat(stories.slice(0, Math.min(visibleCount, stories.length)))
  }, [stories, visibleCount])

  const itemWidthPercent = 100 / visibleCount

  const translatePercent = -(currentIndex * itemWidthPercent)

  // When reaching the cloned end, reset to 0 without animation after the transition
  useEffect(() => {
    if (currentIndex === stories.length) {
      const t = setTimeout(() => {
        setTransitionEnabled(false)
        setCurrentIndex(0)
        // re-enable transition on next frame
        requestAnimationFrame(() => requestAnimationFrame(() => setTransitionEnabled(true)))
      }, TRANSITION_MS)

      return () => clearTimeout(t)
    }
    return
  }, [currentIndex, stories.length, setCurrentIndex])

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
        {items.map((story, idx) => (
          <article
            key={`${story.name}-${idx}`}
            className="group flex flex-col overflow-hidden rounded-2xl border bg-white"
            style={{
              borderColor: C.border,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              flex: `0 0 calc(${itemWidthPercent}% - ${(CARD_GAP * (visibleCount - 1)) / visibleCount}px)`,
              minWidth: 0,
            }}
          >
            <div className="relative h-60 overflow-hidden" style={{ background: C.lightGray }}>
              <Image src={story.img} alt={story.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter: 'brightness(0.85) saturate(0.9)' }} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, rgba(20,6,6,0.35), transparent)' }} />
            </div>

            <div className="flex flex-1 flex-col bg-white p-7">
              <div className="mb-6">
                <span className="mb-2 block font-display text-3xl leading-none" style={{ color: C.crimson }}>
                  &quot;
                </span>

                <p className="flex-1 text-base leading-relaxed" style={{ color: C.textSub, fontStyle: 'italic' }}>
                  {story.quote}
                </p>
              </div>

              <div className="mt-auto border-t pt-5" style={{ borderColor: C.border }}>
                <p className="font-display text-base font-bold" style={{ color: C.text }}>
                  {story.name}
                </p>

                <p className="mt-1 text-xs" style={{ color: C.muted }}>
                  {story.batch}
                </p>
              </div>

              <a href="#cerita" className="mt-4 inline-flex items-center gap-1 text-xs font-bold tracking-wide transition-all duration-200 group-hover:gap-2" style={{ color: C.crimson, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                READ THEIR STORY
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block ml-1" aria-hidden>
                  <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
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

  /*
   * Responsive visible cards
   */
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
    if (stories.length <= visibleCount || isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prev) => {
      const nextIndex = (prev + 1) % stories.length
      setTimeout(() => setIsTransitioning(false), 500)
      return nextIndex
    })
  }, [stories.length, visibleCount, isTransitioning])

  const previous = useCallback(() => {
    if (stories.length <= visibleCount || isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prev) => {
      const prevIndex = prev === 0 ? stories.length - 1 : prev - 1
      setTimeout(() => setIsTransitioning(false), 500)
      return prevIndex
    })
  }, [stories.length, visibleCount, isTransitioning])

  /*
   * Autoplay every 5 seconds
   */
  useEffect(() => {
    if (
      isPaused ||
      stories.length <= visibleCount
    ) {
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

  /*
   * Generate visible cards.
   *
   * The cards wrap around so the carousel
   * never reaches an empty state.
   */
  const visibleStories = useMemo(() => {
    if (!stories.length) return []

    return Array.from(
      { length: Math.min(visibleCount, stories.length) },
      (_, offset) => {
        const index =
          (currentIndex + offset) % stories.length

        return {
          story: stories[index],
          originalIndex: index,
        }
      }
    )
  }, [stories, currentIndex, visibleCount])

  /*
   * If there is no story, don't render section content.
   */
  if (!stories.length) {
    return null
  }

  return (
    <Section
      id="cerita"
      style={{ background: C.white }}
    >
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
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >

        {/* Previous Button */}
        {stories.length > visibleCount && (
          <button
            type="button"
            onClick={previous}
            aria-label="Previous story"
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
          {/* Track container */}
          <Track
            stories={stories}
            visibleCount={visibleCount}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </div>


        {/* Next Button */}
        {stories.length > visibleCount && (
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
                width:
                  index === currentIndex
                    ? 42
                    : 24,
                background:
                  index === currentIndex
                    ? C.crimson
                    : C.border,
                opacity: isTransitioning ? 0.5 : 1,
              }}
            >
              {/* Loading progress */}
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