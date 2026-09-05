'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useModal } from '@/components/ui/ModalProvider'
import { C } from '@/lib/constants'
import { formatRedirectUrl } from '@/lib/utils'

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
interface NavbarProps {
  links: { label: string; href: string }[]
  joinUrl?: string
}

function getResolvedHref(href: string, pathname: string) {
  if (!href || href === '#') return '/'
  if (href.startsWith('#')) {
    return pathname === '/' ? href : `/${href}`
  }
  return href
}

export function Navbar({ links, joinUrl }: NavbarProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { openModal } = useModal()

  const { href: targetHref, isExternal } = formatRedirectUrl(joinUrl)
  const hasJoinUrl = Boolean(targetHref)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const defaultJoinHref = pathname === '/' ? '#join' : '/#join'
  const resolvedJoinHref = hasJoinUrl ? getResolvedHref(targetHref, pathname) : defaultJoinHref

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300"
      style={{ height: '80px' }}
      aria-label="Main navigation"
    >
      <div className="relative h-full w-full">
        <div
          className="absolute inset-0 transition-all duration-400 pointer-events-none"
          style={{
            background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(20px)',
            boxShadow: scrolled ? '0 4px 32px rgba(139,26,26,0.10)' : '0 2px 16px rgba(0,0,0,0.06)',
            borderBottom: `1px solid ${scrolled ? C.border : 'rgba(255,255,255,0.5)'}`,
            borderRadius: 0,
          }}
        />

        <div className="relative z-10 h-full w-full px-4 sm:px-5 md:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" aria-label="Gemarawana home">
            <img src="/gemarawana_color.png" alt="Gemarawana logo" className="w-10 h-10" />
            <div className="flex flex-col leading-[0.8]">
              <span
                className="font-display font-black text-lg tracking-widest uppercase"
                style={{ color: C.text, letterSpacing: '0.14em' }}
              >
                GEMARAWANA
              </span>
              <span
                className="text-[9px] font-bold uppercase"
                style={{ color: C.textSub, letterSpacing: '0.12em', marginTop: '1px' }}
              >
                #TangguhSepertiSerigala
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8" role="menubar">
            {(links || []).map(l => {
              const resolvedHref = getResolvedHref(l.href, pathname)
              const isExternalLink = resolvedHref.startsWith('http')

              if (isExternalLink) {
                return (
                  <a
                    key={l.label}
                    href={resolvedHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    className="text-sm font-semibold transition-colors duration-200 py-1"
                    style={{ color: C.textSub, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                    onMouseEnter={e => (e.currentTarget.style.color = C.crimson)}
                    onMouseLeave={e => (e.currentTarget.style.color = C.textSub)}
                  >
                    {l.label}
                  </a>
                )
              }

              return (
                <Link
                  key={l.label}
                  href={resolvedHref}
                  role="menuitem"
                  className="text-sm font-semibold transition-colors duration-200 py-1"
                  style={{ color: C.textSub, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.crimson)}
                  onMouseLeave={e => (e.currentTarget.style.color = C.textSub)}
                >
                  {l.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <a
              id="nav-join-btn"
              href={resolvedJoinHref}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
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
                if (!hasJoinUrl) {
                  e.preventDefault()
                  openModal({ title: 'Join Gemarawana', message: 'Open recruitment and membership details will be available soon. Follow our socials for updates.' })
                }
              }}
            >
              <>JOIN
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block" style={{ marginLeft: 6 }} aria-hidden>
                  <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            </a>

            <button
              id="mobile-menu-btn"
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-200 relative"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              style={{ background: menuOpen ? C.crimsonAlpha : 'transparent' }}
            >
              {menuOpen ? (
                <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                  <span className="absolute block w-full h-[1.5px] rounded-full transition-all duration-300 rotate-45" style={{ background: C.text }} />
                  <span className="absolute block w-full h-[1.5px] rounded-full transition-all duration-300 -rotate-45" style={{ background: C.text }} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="block w-3.5 h-[1.5px] rounded-full" style={{ background: C.text }} />
                  <span className="block w-3.5 h-[1.5px] rounded-full" style={{ background: C.text }} />
                  <span className="block w-3.5 h-[1.5px] rounded-full" style={{ background: C.text }} />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className="overflow-hidden transition-all duration-400"
        style={{
          maxHeight: menuOpen ? '500px' : '0',
          opacity: menuOpen ? 1 : 0,
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: menuOpen ? `1px solid ${C.border}` : '1px solid transparent',
          marginTop: menuOpen ? '0' : '0',
        }}
        aria-hidden={!menuOpen}
      >
        <div className="p-5 flex flex-col gap-2">
          {(links || []).map(l => {
            const resolvedHref = getResolvedHref(l.href, pathname)
            const isExternalLink = resolvedHref.startsWith('http')

            if (isExternalLink) {
              return (
                <a
                  key={l.label}
                  href={resolvedHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl text-base font-semibold transition-colors duration-200"
                  style={{ color: C.text, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.crimsonAlpha; e.currentTarget.style.color = C.crimson }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.text }}
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </a>
              )
            }

            return (
              <Link
                key={l.label}
                href={resolvedHref}
                className="py-3 px-4 rounded-xl text-base font-semibold transition-colors duration-200"
                style={{ color: C.text, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                onMouseEnter={e => { e.currentTarget.style.background = C.crimsonAlpha; e.currentTarget.style.color = C.crimson }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.text }}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            )
          })}
          <a
            href={resolvedJoinHref}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="mt-2 flex items-center justify-center gap-2 px-6 py-3.5 btn-primer text-sm font-bold tracking-wider"
            style={{ background: C.crimson, color: '#fff', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            onClick={e => {
              if (!hasJoinUrl) {
                e.preventDefault()
                setMenuOpen(false)
                openModal({ title: 'Join Gemarawana', message: 'Open recruitment and membership details will be available soon. Follow our socials for updates.' })
              } else {
                setMenuOpen(false)
              }
            }}
          >
            <>JOIN
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block" style={{ marginLeft: 6 }} aria-hidden>
                <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          </a>
        </div>
      </div>
    </nav>
  )
}