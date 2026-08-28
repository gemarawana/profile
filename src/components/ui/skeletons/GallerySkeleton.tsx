import { BaseSkeleton } from './BaseSkeleton'
import { Section } from '@/components/ui/Section'
import { SectionHeaderSkeleton } from './SectionHeaderSkeleton'
import { C } from '@/lib/constants'

export function GallerySkeleton({ count = 8 }: { count?: number }) {
  const heights = ['h-[210px]', 'h-[210px]', 'h-[210px] md:h-[436px] md:row-span-2', 'h-[210px]']

  return (
    <Section id="galeri-skeleton" style={{ background: C.warmWhite }}>
      <SectionHeaderSkeleton align="center" />

      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        style={{ gridAutoRows: '210px' }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`rounded-2xl overflow-hidden relative bg-gray-200/80 ${
              i === 2 ? 'md:row-span-2' : ''
            }`}
          >
            <BaseSkeleton className="w-full h-full rounded-none" />
          </div>
        ))}
      </div>
    </Section>
  )
}
