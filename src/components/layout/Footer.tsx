"use client"

import { Container } from '@/components/ui/Container'
import { C } from '@/lib/constants'

type Link = { label: string; href: string }

export function Footer({
  navigation,
  contact,
  socials,
}: {
  navigation?: Link[]
  contact?: Link[]
  socials?: Link[]
}) {
  const contactLinks = contact ?? navigation ?? []

  return (
    <footer id="footer" className="py-16 md:py-20" style={{ background: C.crimsonDeep }}>
      <Container>
        {/* Top */}
        <div
          className="flex flex-col md:flex-row md:justify-between gap-12 mb-14 pb-14 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.12)' }}
        >
          {/* Brand */}
          <div className="max-w-xs">
            <a href="#" className="flex items-center gap-3 mb-4 group" aria-label="Gemarawana home">
              <img src="/gemarawana_white.png" alt="Gemarawana logo" className="w-10 h-10" />
              <span
                className="font-display font-black text-base tracking-widest uppercase text-white"
                style={{ letterSpacing: '0.14em' }}
              >
                GEMARAWANA
              </span>
            </a>
            <p className="text-base font-semibold mb-2 text-gray-100" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Mapala Telkom University
            </p>
            <p className="text-sm leading-relaxed text-gray-300">
              Jalan Telekomunikasi No. 1, Terusan Buahbatu, Sukapura, Kecamatan Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257.
            </p>
          </div>

          {/* Footer Section */}
          <div className="flex flex-col sm:flex-row gap-12 md:gap-16">
            <div>
              <p
                className="text-xs font-bold tracking-widest uppercase mb-5 text-gray-100"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                Contact
              </p>
              <nav className="flex flex-col gap-3" aria-label="Footer contact">
                {contactLinks.map(l => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <p
                className="text-xs font-bold tracking-widest uppercase mb-5 text-gray-100"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                Social
              </p>
              <div className="flex flex-col gap-3">
                {(socials || []).map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                    style={{
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                    }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex justify-center items-center gap-3 text-center">
          <p className="text-xs text-gray-400">© 2026 Gemarawana. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}
