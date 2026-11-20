"use client"

import { SmoothImage } from '@/components/ui/SmoothImage'
import { Container } from '@/components/ui/Container'
import { C } from '@/lib/constants'
import { DEFAULT_SECTION_CONTENTS, type CtaSectionContent } from '@/lib/section-contents'
import { useInView } from '@/hooks/useInView'
import { useModal } from '@/components/ui/ModalProvider'
import { formatRedirectUrl } from '@/lib/utils'

export function RecruitmentCTA({
  backgroundImage,
  joinUrl,
  content,
}: {
  backgroundImage: string
  joinUrl?: string
  content?: CtaSectionContent
}) {
  const copy = content ?? DEFAULT_SECTION_CONTENTS.cta
  const { ref, visible } = useInView(0.1)
  const { openModal } = useModal()
  const { href: targetHref, isExternal } = formatRedirectUrl(joinUrl)
  const hasJoinUrl = Boolean(targetHref)

  return (
    <section id="join" className="relative overflow-hidden flex items-center py-24 md:py-32" style={{ background: C.darkBg, minHeight: '650px' }}>
      {/* Background */}
      <div className="absolute inset-0">
        {backgroundImage && (
          <SmoothImage
            src={backgroundImage}
            alt="Mountain landscape background"
            fill
            className="object-cover"
            style={{ filter: 'brightness(0.2)' }}
            sizes="100vw"
          />
        )}
        <div
          className="absolute inset-0 z-10"
          style={{ background: 'linear-gradient(135deg, rgba(var(--color-dark-bg-rgb, 22, 11, 11), 0.95) 0%, rgba(var(--color-dark-surface-rgb, 37, 19, 19), 0.72) 100%)' }}
        />
      </div>

      {/* Red glow */}
      <div
        className="absolute pointer-events-none z-10"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(var(--theme-primary-rgb, 139, 29, 29), 0.25) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <Container className="relative z-20 text-center">
        <div
          ref={ref}
          className="max-w-4xl mx-auto transition-all duration-1000"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)' }}
        >
          {copy.badge && (
            <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: C.primaryBright, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {copy.badge}
            </p>
          )}
          <h2
            className="font-display font-black leading-none mb-8 text-white"
            style={{ fontSize: 'clamp(2.75rem, 8vw, 6.5rem)', letterSpacing: '-0.02em' }}
          >
            {copy.title}
            {copy.title_highlight && (
              <>
                <br />
                <span style={{ color: C.primaryBright, textShadow: '0 0 80px rgba(var(--theme-primary-rgb, 139, 29, 29), 0.6)' }}>
                  {copy.title_highlight}
                </span>
              </>
            )}
          </h2>
          {copy.description && (
            <p className="text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed" style={{ color: C.onDarkDim }}>
              {copy.description}
            </p>
          )}
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              id="cta-join-btn"
              href={hasJoinUrl ? targetHref : '#'}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 px-9 py-4 btn-primer text-base font-bold tracking-wide transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: C.crimson, color: '#fff', fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 4px 32px rgba(var(--theme-primary-rgb, 139, 29, 29), 0.5)' }}
              onClick={e => {
                if (!hasJoinUrl) {
                  e.preventDefault()
                  openModal({ title: 'Join Gemarawana', message: 'Open recruitment and membership details will be available soon.' })
                }
              }}
            >
              <span>{copy.button_text || DEFAULT_SECTION_CONTENTS.cta.button_text}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block" style={{ marginLeft: 6 }} aria-hidden>
                <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#faq"
              className="inline-flex items-center gap-2 px-9 py-4 btn-primer text-base font-semibold border transition-all duration-200 hover:bg-white/10"
              style={{ borderColor: 'rgba(250,245,245,0.25)', color: C.onDark, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              onClick={e => {
                e.preventDefault()
                openModal({ title: 'Ask Us Anything', message: 'Send us your questions — this contact form will be available soon.' })
              }}
            >
              {copy.secondary_button_text || DEFAULT_SECTION_CONTENTS.cta.secondary_button_text}
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
