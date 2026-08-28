"use client"

import { SmoothImage } from '@/components/ui/SmoothImage'
import { Container } from '@/components/ui/Container'
import { C } from '@/lib/constants'
import { useInView } from '@/hooks/useInView'
import { useModal } from '@/components/ui/ModalProvider'

export function RecruitmentCTA({ backgroundImage }: { backgroundImage: string }) {
  const { ref, visible } = useInView(0.1)
  const { openModal } = useModal()
  return (
    <section id="join" className="relative overflow-hidden flex items-center py-24 md:py-32" style={{ background: C.crimsonDeep, minHeight: '650px' }}>
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
          style={{ background: 'linear-gradient(135deg, rgba(20,6,6,0.95) 0%, rgba(42,12,12,0.72) 100%)' }}
        />
      </div>

      {/* Red glow */}
      <div
        className="absolute pointer-events-none z-10"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,26,26,0.25) 0%, transparent 70%)',
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
          <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: C.crimson, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Join Us
          </p>
          <h2
            className="font-display font-black leading-none mb-8 text-white"
            style={{ fontSize: 'clamp(2.75rem, 8vw, 6.5rem)', letterSpacing: '-0.02em' }}
          >
            YOUR NEXT<br />ADVENTURE<br />
            <span style={{ color: C.crimson, textShadow: '0 0 80px rgba(139,26,26,0.6)' }}>STARTS HERE.</span>
          </h2>
          <p className="text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed" style={{ color: C.onDarkDim }}>
            No need to wait to be ready. Start your journey with Gemarawana.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              id="cta-join-btn"
              href="#"
              className="inline-flex items-center gap-2 px-9 py-4 btn-primer text-base font-bold tracking-wide transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: C.crimson, color: '#fff', fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 4px 32px rgba(139,26,26,0.5)' }}
              onClick={e => {
                e.preventDefault()
                openModal({ title: 'Join Gemarawana', message: 'Open recruitment and membership details will be available soon.' })
              }}
            >
              <span>JOIN GEMARAWANA</span>
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
              ASK US ANYTHING
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
