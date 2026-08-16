"use client"

import { LogoMark } from '@/components/common/LogoMark'
import { Container } from '@/components/ui/Container'
import { C } from '@/lib/constants'
import { useModal } from '@/components/ui/ModalProvider'
type Link = { label: string; href: string }

export function Footer({ navigation, socials }: { navigation: Link[]; socials: Link[] }) {
  const { openModal } = useModal()
  return (
    <footer id="footer" className="py-16 md:py-20" style={{ background: C.crimsonDeep }}>
      <Container>
        {/* Top */}
        <div
          className="flex flex-col md:flex-row md:justify-between gap-12 mb-14 pb-14 border-b"
          style={{ borderColor: 'rgba(250,245,245,0.08)' }}
        >
          {/* Brand */}
          <div className="max-w-xs">
            <a href="#" className="flex items-center gap-3 mb-4 group" aria-label="Gemarawana home">
              <img src="/gemarawana_white.png" alt="Gemarawana logo" className="w-10 h-10" />
              <span
                className="font-display font-black text-base tracking-widest uppercase"
                style={{ color: C.onDark, letterSpacing: '0.14em' }}
              >
                GEMARAWANA
              </span>
            </a>
            <p className="text-base font-semibold mb-2" style={{ color: C.onDarkDim, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Mapala Telkom University
            </p>
            <p className="text-sm leading-relaxed" style={{ color: C.onDarkFaint }}>
              Jalan Telekomunikasi No. 1, Terusan Buahbatu, Sukapura, Kecamatan Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-12 md:gap-16">
            <div>
              <p
                className="text-xs font-bold tracking-widest uppercase mb-5"
                style={{ color: C.onDarkFaint, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                Contact
              </p>
              <nav className="flex flex-col gap-3" aria-label="Footer navigation">
                {navigation.map(l => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: C.onDarkDim, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <p
                className="text-xs font-bold tracking-widest uppercase mb-5"
                style={{ color: C.onDarkFaint, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                Social
              </p>
              <div className="flex flex-col gap-3">
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors duration-200"
                    style={{
                      color: C.onDarkDim,
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
          <p className="text-xs" style={{ color: C.onDarkFaint }}>© 2026 Gemarawana. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}
