"use client"

import { useState, useEffect } from 'react'
import { useModal } from '@/components/ui/ModalProvider'
import { LogoMark } from '@/components/common/LogoMark'
import { Container } from '@/components/ui/Container'
import { C } from '@/lib/constants'

/*
 * Navbar height contract: --navbar-h = 80px (defined in globals.css)
 *
 * Height breakdown:
 *   nav vertical padding (unscrolled): 10px top + 10px bottom = 20px
 *   inner pill vertical padding: py-3 = 12px top + 12px bottom = 24px
 *   logo / content height: ~36px (logo 32px + vertical alignment)
 *   total ≈ 20 + 24 + 36 = 80px ✓
 *
 * Architecture:
 *   - Container defines the page content grid.
 *   - Glass background is an absolute shell expanding -mx-4 md:-mx-6 around Container content.
 *   - Navbar content is flush (0px inset) with Container content boundary.
 */
interface NavbarProps { links: { label: string; href: string }[] }

export function Navbar({ links }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { openModal } = useModal()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ paddingTop: '10px', paddingBottom: '10px' }}
      aria-label="Main navigation"
    >
      <Container>
        <div className="relative">
          {/* Glass background shell — floats visually -mx-4 / md:-mx-6 around content grid without shifting content */}
          <div
            className="absolute inset-0 -mx-4 md:-mx-6 rounded-2xl transition-all duration-400 pointer-events-none"
            style={{
              background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.88)',
              backdropFilter: 'blur(20px)',
              boxShadow: scrolled ? '0 4px 32px rgba(139,26,26,0.10)' : '0 2px 16px rgba(0,0,0,0.06)',
              border: `1px solid ${scrolled ? C.border : 'rgba(255,255,255,0.5)'}`,
            }}
          />

          {/* Actual Navbar Content — Flush with Container grid boundary (0px additional offset) */}
          <div className="relative z-10 py-3 flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group" aria-label="Gemarawana home">
              <img src="/gemarawana_color.png" alt="Gemarawana logo" className="w-10 h-10" />
              <span
                className="font-display font-black text-sm tracking-widest uppercase"
                style={{ color: C.text, letterSpacing: '0.14em' }}
              >
                GEMARAWANA
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8" role="menubar">
              {links.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  role="menuitem"
                  className="text-sm font-semibold transition-colors duration-200 py-1"
                  style={{ color: C.textSub, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.crimson)}
                  onMouseLeave={e => (e.currentTarget.style.color = C.textSub)}
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <a
                id="nav-join-btn"
                href="#join"
                className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 btn-primer text-xs font-bold tracking-wider transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: C.crimson,
                  color: '#fff',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  boxShadow: '0 4px 16px rgba(139,26,26,0.28)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = C.crimsonDark
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(139,26,26,0.4)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = C.crimson
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(139,26,26,0.28)'
                }}
                onClick={e => {
                  e.preventDefault()
                  openModal({ title: 'Join Gemarawana', message: 'Open recruitment and membership details will be available soon. Follow our socials for updates.' })
                }}
              >
                <>JOIN
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block ml-1" aria-hidden>
                    <path d="M14 3h7v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 14L21 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              </a>
              <button
                id="mobile-menu-btn"
                className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl transition-colors duration-200"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                style={{ background: menuOpen ? C.crimsonAlpha : 'transparent' }}
              >
                <span className="block w-5 h-0.5 rounded-full transition-all duration-300" style={{ background: C.text, transform: menuOpen ? 'rotate(45deg) translate(2px, 3px)' : 'none' }} />
                <span className="block w-5 h-0.5 rounded-full transition-all duration-300" style={{ background: C.text, opacity: menuOpen ? 0 : 1, transform: menuOpen ? 'translateX(-8px)' : 'none' }} />
                <span className="block w-5 h-0.5 rounded-full transition-all duration-300" style={{ background: C.text, transform: menuOpen ? 'rotate(-45deg) translate(2px, -3px)' : 'none' }} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className="mt-2 rounded-2xl overflow-hidden transition-all duration-400"
          style={{
            maxHeight: menuOpen ? '500px' : '0',
            opacity: menuOpen ? 1 : 0,
            background: 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(20px)',
            border: menuOpen ? `1px solid ${C.border}` : '1px solid transparent',
          }}
          aria-hidden={!menuOpen}
        >
          <div className="p-5 flex flex-col gap-2">
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="py-3 px-4 rounded-xl text-base font-semibold transition-colors duration-200"
                style={{ color: C.text, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                onMouseEnter={e => { e.currentTarget.style.background = C.crimsonAlpha; e.currentTarget.style.color = C.crimson }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.text }}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#join"
              className="mt-2 flex items-center justify-center gap-2 px-6 py-3.5 btn-primer text-sm font-bold tracking-wider"
              style={{ background: C.crimson, color: '#fff', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              onClick={e => {
                e.preventDefault()
                setMenuOpen(false)
                openModal({ title: 'Join Gemarawana', message: 'Open recruitment and membership details will be available soon. Follow our socials for updates.' })
              }}
            >
              <>JOIN GEMARAWANA
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block ml-1" aria-hidden>
                  <path d="M14 3h7v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 14L21 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            </a>
          </div>
        </div>
      </Container>
    </nav>
  )
}
