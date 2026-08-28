'use client'

import { SmoothImage } from '@/components/ui/SmoothImage'
import { Section } from '@/components/ui/Section'
import { C } from '@/lib/constants'
import { useInView } from '@/hooks/useInView'
import { useCounter } from '@/hooks/useCounter'

function StatCounter({ value, label, suffix = '+' }: { value: number; label: string; suffix?: string }) {
  const { ref, visible } = useInView()
  const count = useCounter(value, visible)
  return (
    <div ref={ref} className="flex flex-col">
      <span className="font-display font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.75rem)', color: C.crimson }}>
        {count}{suffix}
      </span>
      <span className="text-sm font-medium mt-2" style={{ color: C.muted, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{label}</span>
    </div>
  )
}

export function Introduction({ imageUrl }: { imageUrl: string }) {
  const { ref, visible } = useInView()
  return (
    <Section id="tentang" style={{ background: C.white }}>
      <div
        ref={ref}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-1000"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)' }}
      >
        {/* Text side */}
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: C.crimson, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Mapala Telkom University — Since 2008
          </p>
          <h2
            className="font-display font-black leading-none mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', color: C.text, letterSpacing: '-0.02em' }}
          >
            WHAT IS <br />GEMARAWANA?
          </h2>
          <p className="text-lg leading-relaxed mb-4" style={{ color: C.textSub, maxWidth: '520px' }}>
            Gema Rawana merupakan wadah penggiat alam Universitas Telkom yang menjadi ruang untuk menjelajah, bertumbuh, dan membangun karakter melalui pengalaman di alam bebas.
          </p>
          <p className="text-base leading-relaxed mb-10" style={{ color: C.muted, maxWidth: '480px' }}>
            Berlandaskan kekeluargaan dan kode etik penggiat alam, kami membentuk pribadi yang tangguh, terampil, berintegritas, serta peduli terhadap alam dan sesama.
          </p>

          <div className="grid grid-cols-2 gap-8 pt-8 border-t" style={{ borderColor: C.border }}>
            <StatCounter value={98} label="Active Members" />
            <StatCounter value={new Date().getFullYear() - 2008}  label="Years of Journey" />
            <StatCounter value={120} label="Activities" />
            <StatCounter value={64}  label="Destinations" />
          </div>
        </div>

        {/* Image side — pb-10 at mobile/tablet reserves space for the absolute floating card so it
            does not overlap the next section. At lg+ the grid is two-column so no bleed occurs. */}
        <div className="relative pb-10 lg:pb-0">
          <div
            className="rounded-3xl overflow-hidden w-full max-w-md mx-auto lg:ml-auto relative"
            style={{ background: C.lightGray, aspectRatio: '3/4' }}
          >
            {imageUrl && (
              <SmoothImage
                src={imageUrl}
                alt="Gemarawana members hiking together"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 450px"
              />
            )}
          </div>

          {/* Floating card — sits inside the pb-10 padding space below image */}
          <div
            className="absolute -bottom-6 left-0 sm:left-2 md:-left-4 rounded-2xl px-7 py-6 z-10"
            style={{ background: C.crimson, color: '#fff', boxShadow: '0 12px 40px rgba(139,26,26,0.4)' }}
          >
            <div className="font-display font-black text-4xl leading-none">{new Date().getFullYear() - 2008}</div>
            <div className="text-xs font-semibold mt-2 uppercase tracking-wider opacity-90" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Years of<br />Adventure
            </div>
          </div>

          {/* Decorative element */}
          <div
            className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl pointer-events-none"
            style={{ background: C.crimsonAlpha, border: `1px solid rgba(139,26,26,0.12)` }}
          />
        </div>
      </div>
    </Section>
  )
}
