'use client'

import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { C } from '@/lib/constants'
import { DEFAULT_SECTION_CONTENTS, type StandardSectionContent } from '@/lib/section-contents'
import { useInView } from '@/hooks/useInView'
import { useCounter } from '@/hooks/useCounter'
import type { ImpactStatistic } from '@/types'

function ImpactStat({ value, label, suffix = '+' }: { value: number; label: string; suffix?: string }) {
  const { ref, visible } = useInView()
  const count = useCounter(value, visible)
  return (
    <div ref={ref} className="flex flex-col items-center text-center py-8 md:py-10 px-4">
      <span
        className="font-display font-black leading-none"
        style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', color: C.primaryBright }}
      >
        {count}{suffix}
      </span>
      <span
        className="text-xs font-bold mt-4 uppercase tracking-widest leading-relaxed"
        style={{ color: C.onDarkFaint, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
      >
        {label}
      </span>
    </div>
  )
}

export function Impact({
  statistics,
  content,
}: {
  statistics: ImpactStatistic[]
  content?: StandardSectionContent
}) {
  const copy = content ?? DEFAULT_SECTION_CONTENTS.impact
  return (
    <Section id="impact" size="sm" style={{ background: C.darkBg }}>
      <SectionHeading
        className="max-w-5xl mx-auto"
        eyebrow={copy.badge || undefined}
        title={
          <>
            {copy.title}
            {copy.title_highlight && (
              <>
                <br />
                <span style={{ color: C.primaryBright }}>{copy.title_highlight}</span>
              </>
            )}
          </>
        }
        description={copy.description || undefined}
        align="center"
        eyebrowColor={C.primaryBright}
        titleColor={C.onDark}
        descColor={C.onDarkDim}
      />

      <div
        className="grid grid-cols-2 md:grid-cols-4"
        style={{
          background: C.darkSurface,
          border: `1px solid ${C.darkBorder}`,
          borderRadius: '24px',
          overflow: 'hidden',
        }}
      >
        {statistics.map((s, i) => (
          <div
            key={i}
            className="border-r border-b md:border-b-0 last:border-r-0"
            style={{ borderColor: C.darkBorder }}
          >
            <ImpactStat value={s.value} label={s.label} suffix={s.suffix} />
          </div>
        ))}
      </div>
    </Section>
  )
}
