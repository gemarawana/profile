"use client"

import { useState, useEffect } from 'react'
import { useModal } from '@/components/ui/ModalProvider'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { C } from '@/lib/constants'
import type { HeroSlide } from '@/types'

export function Hero({ slides }: { slides: HeroSlide[] }) {
  const [slide, setSlide] = useState(0)
  const { openModal } = useModal()

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % slides.length), 5500)
    return () => clearInterval(t)
  }, [slides.length])

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col justify-end pb-16 md:pb-24"
      style={{
        /* 100svh accounts for mobile browser chrome (address bar, toolbar) */
        minHeight: '100svh',
        background: C.crimsonDeep,
        /* Pad top by exact navbar height so content never hides underneath */
        paddingTop: 'var(--navbar-h)',
      }}
      aria-label="Hero section"
    >
      {/* Slide images */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1200"
          style={{ opacity: i === slide ? 1 : 0, transitionDuration: '1200ms' }}
          aria-hidden={i !== slide}
        >
          <Image
            src={s.img}
            alt={s.label}
            fill
            priority={i === 0}
            className="object-cover object-top"
            style={{ filter: 'brightness(0.38)' }}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(20,6,6,0.5) 0%, transparent 35%, rgba(20,6,6,0.92) 100%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(20,6,6,0.55) 0%, transparent 65%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(139,26,26,0.08)' }} />

      <Container className="relative z-10">
        {/* Tag
        <div className="mb-6">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border"
            style={{
              color: 'rgba(250,245,245,0.9)',
              borderColor: 'rgba(255,255,255,0.2)',
              background: 'rgba(139,26,26,0.45)',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            #FindYourWild
          </span>
        </div> */}

        {/* Main headline */}
        <h1
          className="font-display font-black text-white mb-8 mt-12"
          style={{
            fontSize: 'clamp(3rem, 7.5vw, 7rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.02em',
          }}
        >
          GEMA<br />
          <span style={{ color: C.crimson, textShadow: '0 0 60px rgba(139,26,26,0.7)' }}>RAWANA.</span>
        </h1>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16 justify-between">
          {/* Left: description + CTAs */}
          <div className="max-w-2xl">
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: 'rgba(250,245,245,0.75)' }}>
              Bangun Jiwa yang Berani, Setia pada Kawan, Tangguh Seperti Serigala.
            </p>
            <div className="flex gap-4">
              <a
                id="hero-join-btn"
                href="#join"
                className="btn-primer inline-flex items-center gap-2 px-8 py-4 text-sm font-bold tracking-wide transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: C.crimson,
                  color: '#fff',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  boxShadow: '0 4px 24px rgba(139,26,26,0.5)',
                }}
                onClick={e => {
                  e.preventDefault()
                  openModal({ title: 'Join Gemarawana', message: 'Open recruitment and membership details will be available soon.' })
                }}
              >
                <>JOIN GEMARAWANA
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block" style={{ marginLeft: 6 }} aria-hidden>
                    <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              </a>
              <a
                href="#berita"
                className="btn-primer inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold border transition-all duration-200 hover:bg-white/10"
                style={{
                  borderColor: 'rgba(250,245,245,0.25)',
                  color: C.onDark,
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  backdropFilter: 'blur(8px)',
                }}
              >
                EXPLORE OUR STORY
              </a>
            </div>
          </div>

          {/* Right: slide counter + dots
          <div className="flex items-center gap-6 self-start md:self-end">
            <div className="text-right">
              <div className="font-display font-black tabular-nums" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'rgba(250,245,245,0.18)', lineHeight: 1 }}>
                {String(slide + 1).padStart(2, '0')}<span style={{ color: 'rgba(250,245,245,0.1)' }}> / {String(slides.length).padStart(2, '0')}</span>
              </div>
              <div className="text-xs mt-1.5 font-bold tracking-widest uppercase" style={{ color: C.crimson, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {slides[slide].desc}
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              {slides.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className="btn-primer flex items-center gap-2.5 transition-all duration-300 py-1"
                  style={{ color: i === slide ? C.crimson : 'rgba(250,245,245,0.2)' }}
                  aria-label={`Go to slide ${i + 1}: ${s.label}`}
                >
                  <span
                    className="block rounded-full transition-all duration-400"
                    style={{
                      width: i === slide ? '28px' : '8px',
                      height: '2px',
                      background: 'currentColor',
                    }}
                  />
                  {i === slide && (
                    <span className="text-xs font-semibold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                      {s.label}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div> */}
        </div>
      </Container>
    </section>
  )
}
