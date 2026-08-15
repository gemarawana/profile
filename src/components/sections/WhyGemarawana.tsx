'use client'

import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { C } from '@/lib/constants'
import { useInView } from '@/hooks/useInView'
import { useModal } from '@/components/ui/ModalProvider'
import type { WhyCard as WhyCardType } from '@/types'

function WhyCard({ card, delay }: { card: WhyCardType; delay: number }) {
  const { ref, visible } = useInView(0.1)
  const { openModal } = useModal()
  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      onClick={() => openModal({ title: card.title, message: card.desc })}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          openModal({ title: card.title, message: card.desc })
        }
      }}
      className="group rounded-2xl p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1.5"
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(30px)',
        transitionProperty: 'opacity, transform, border-color, box-shadow',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(139,26,26,0.22)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(139,26,26,0.08)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = C.border
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div>
        <div className="mb-5 transition-transform duration-300 group-hover:scale-110 inline-block">{card.icon}</div>
        <h3 className="font-display font-black text-xl mb-3" style={{ color: C.text }}>{card.title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{card.desc}</p>
      </div>
      <div
        className="mt-6 flex items-center gap-2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{ color: C.crimson, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
      >
        Learn more <span>→</span>
      </div>
    </div>
  )
}

export function WhyGemarawana({ cards }: { cards: WhyCardType[] }) {
  return (
    <Section id="why" style={{ background: C.lightGray }}>
      <SectionHeading
        eyebrow="The Difference"
        title={<>WHY<br />GEMARAWANA?</>}
        description="Because the best lessons aren't always learned inside a classroom."
        align="between"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <WhyCard key={i} card={card} delay={i * 60} />
        ))}
      </div>
    </Section>
  )
}
