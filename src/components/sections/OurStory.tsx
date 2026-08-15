'use client'

import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { C } from '@/lib/constants'
import type { HistoryItem } from '@/types'

export function OurStory({ milestones }: { milestones: HistoryItem[] }) {
  return (
    <Section id="story" size="lg" style={{ background: C.white }}>
      <SectionHeading eyebrow="History" title="OUR STORY" />

      <div className="relative pt-4">
        {/* Center line */}
        <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px" style={{ background: C.border }} />

        <div className="flex flex-col gap-0">
          {milestones.map((h, i) => (
            <div
              key={i}
              className={`relative flex gap-8 md:gap-0 pb-16 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-3 md:left-1/2 top-2.5 w-4 h-4 rounded-full -translate-x-1/2 border-2 z-10"
                style={{ background: C.crimson, borderColor: C.white, boxShadow: '0 0 0 4px rgba(139,26,26,0.15)' }}
              />

              {/* Content */}
              <div
                className={`pl-8 md:pl-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}
              >
                <span
                  className="font-display font-black block"
                  style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', color: 'rgba(139,26,26,0.08)', lineHeight: 1 }}
                >
                  {h.year}
                </span>
                <p className="text-base leading-relaxed mt-2" style={{ color: C.textSub, maxWidth: '360px', marginLeft: i % 2 !== 0 ? 0 : 'auto' }}>
                  {h.event}
                </p>
              </div>

              <div className="hidden md:block md:w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
