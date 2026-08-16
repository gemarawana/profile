'use client'

import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { C } from '@/lib/constants'
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
        style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', color: C.crimson }}
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

export function Impact({ statistics }: { statistics: ImpactStatistic[] }) {
  return (
    <Section id="impact" size="sm" style={{ background: C.crimsonDeep }}>
      <SectionHeading
        className="max-w-5xl mx-auto"
        title={<>BEYOND THE JOURNEY.<br /><span style={{ color: C.crimson }}>INTO THE IMPACT.</span></>}
        description="Explore the wild. Protect the earth. Empower humanity."
        align="center"
        titleColor={C.onDark}
        descColor={C.onDarkDim}
      />

      <div
        className="grid grid-cols-2 md:grid-cols-4"
        style={{
          border: '1px solid rgba(250,245,245,0.08)',
          borderRadius: '24px',
          overflow: 'hidden',
        }}
      >
        {statistics.map((s, i) => (
          <div
            key={i}
            className="border-r border-b md:border-b-0 last:border-r-0"
            style={{ borderColor: 'rgba(250,245,245,0.08)' }}
          >
            <ImpactStat value={s.value} label={s.label} suffix={s.suffix} />
          </div>
        ))}
      </div>
    </Section>
  )
}
