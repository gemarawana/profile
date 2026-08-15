'use client'

import { useState } from 'react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { C } from '@/lib/constants'
import type { FAQItem } from '@/types'

export function FAQ({ faqs }: { faqs: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <Section id="faq" style={{ background: C.white }}>
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="FAQ"
          title={<>CURIOUS?<br />WE&apos;VE GOT<br />ANSWERS.</>}
        />

        <div className="flex flex-col" role="list">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border-b transition-colors duration-200"
              style={{ borderColor: C.border }}
              role="listitem"
            >
              <button
                id={`faq-btn-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left gap-6 group"
                aria-expanded={open === i}
                aria-controls={`faq-panel-${i}`}
              >
                <span
                  className="font-display font-bold text-base md:text-lg transition-colors duration-200"
                  style={{ color: open === i ? C.crimson : C.text }}
                >
                  {faq.q}
                </span>
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 text-lg font-light"
                  style={{
                    background: open === i ? C.crimson : C.lightGray,
                    color: open === i ? '#fff' : C.text,
                    transform: open === i ? 'rotate(45deg)' : 'none',
                  }}
                >
                  +
                </span>
              </button>
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
                className="overflow-hidden transition-all duration-400"
                style={{ maxHeight: open === i ? '200px' : '0' }}
              >
                <p className="pb-7 text-base leading-relaxed" style={{ color: C.muted }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
