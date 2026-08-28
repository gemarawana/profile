'use client'

import { useState } from 'react'
import { SmoothImage } from '@/components/ui/SmoothImage'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { C } from '@/lib/constants'
import type { JourneyStep } from '@/types'

export function Journey({ steps }: { steps: JourneyStep[] }) {
  const [active, setActive] = useState(0)
  const activeStep = steps[active]

  if (!activeStep) return null

  return (
    <Section id="journey" size="lg" style={{ background: C.crimsonDeep }}>
      <SectionHeading
        eyebrow="The Path"
        title={<>YOUR JOURNEY<br />STARTS HERE.</>}
        description="Every journey begins step by step."
        eyebrowColor={C.crimson}
        titleColor={C.onDark}
        descColor={C.onDarkDim}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Steps */}
        <div className="flex flex-col" role="tablist" aria-label="Journey steps">
          {steps.map((j, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className="flex items-start gap-5 py-6 border-b text-left transition-all duration-300 group"
              style={{ borderColor: 'rgba(250,245,245,0.08)' }}
            >
              <span
                className="font-display font-black text-sm tabular-nums mt-0.5 min-w-[2rem] transition-colors duration-300"
                style={{ color: i === active ? C.crimson : 'rgba(250,245,245,0.2)' }}
              >
                {j.num}
              </span>
              <div className="flex-1">
                <h3
                  className="font-display font-black text-lg md:text-xl transition-colors duration-300"
                  style={{ color: i === active ? C.onDark : 'rgba(250,245,245,0.35)' }}
                >
                  {j.title}
                </h3>
                <div
                  className="overflow-hidden transition-all duration-400"
                  style={{ maxHeight: i === active ? '100px' : '0', opacity: i === active ? 1 : 0 }}
                >
                  <p className="text-sm leading-relaxed mt-2.5" style={{ color: C.onDarkDim }}>
                    {j.desc}
                  </p>
                </div>
              </div>
              <span
                className="mt-1 transition-all duration-300 flex-shrink-0"
                style={{
                  color: i === active ? C.crimson : 'rgba(250,245,245,0.12)',
                  transform: i === active ? 'translateX(4px)' : 'none',
                }}
              >
                &rarr;
              </span>
            </button>
          ))}
        </div>

        {/* Image stays in view while user scrolls through steps. */}
        <div className="relative hidden lg:block" style={{ position: 'sticky', top: 'calc(var(--navbar-h) + 1.5rem)', alignSelf: 'start' }}>
          <div
            className="rounded-3xl overflow-hidden relative"
            style={{ background: C.crimsonCard, aspectRatio: '1/1' }}
            role="tabpanel"
            aria-label={`Journey step: ${activeStep.title}`}
          >
            <SmoothImage
              src={activeStep.imageUrl}
              alt={activeStep.title}
              fill
              className="object-cover transition-opacity duration-500"
              style={{ filter: 'brightness(0.7)' }}
              sizes="600px"
            />
            <div
              className="absolute bottom-0 left-0 right-0 p-8 z-10"
              style={{ background: 'linear-gradient(to top, rgba(20,6,6,0.95), transparent)' }}
            >
              <span
                className="font-display font-black block leading-none mb-2"
                style={{ fontSize: '5rem', color: 'rgba(139,26,26,0.4)' }}
              >
                {activeStep.num}
              </span>
              <span className="font-display font-black text-2xl text-white">{activeStep.title}</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
