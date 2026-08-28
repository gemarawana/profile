import { BaseSkeleton } from './BaseSkeleton'
import { Section } from '@/components/ui/Section'
import { C } from '@/lib/constants'

export function IntroductionSkeleton() {
  return (
    <Section id="tentang-skeleton" style={{ background: C.white }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Text side */}
        <div>
          <BaseSkeleton className="w-48 h-4 rounded-full mb-4" />
          <div className="space-y-3 mb-6">
            <BaseSkeleton className="w-64 sm:w-80 h-10 sm:h-12 rounded-xl" />
            <BaseSkeleton className="w-80 sm:w-96 h-10 sm:h-12 rounded-xl" />
          </div>
          <div className="space-y-2.5 mb-4 max-w-lg">
            <BaseSkeleton className="w-full h-4 rounded" />
            <BaseSkeleton className="w-full h-4 rounded" />
            <BaseSkeleton className="w-4/5 h-4 rounded" />
          </div>
          <div className="space-y-2.5 mb-10 max-w-md">
            <BaseSkeleton className="w-full h-4 rounded" />
            <BaseSkeleton className="w-5/6 h-4 rounded" />
          </div>

          <div className="grid grid-cols-2 gap-8 pt-8 border-t" style={{ borderColor: C.border }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-2">
                <BaseSkeleton className="w-20 h-10 rounded-lg" />
                <BaseSkeleton className="w-28 h-4 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Image side */}
        <div className="relative pb-10 lg:pb-0">
          <div
            className="rounded-3xl overflow-hidden w-full max-w-md mx-auto lg:ml-auto relative bg-gray-100"
            style={{ aspectRatio: '3/4' }}
          >
            <BaseSkeleton className="w-full h-full rounded-none" />
          </div>

          {/* Floating card skeleton */}
          <div
            className="absolute -bottom-6 left-0 sm:left-2 md:-left-4 rounded-2xl px-7 py-6 z-10 w-44"
            style={{ background: C.crimson }}
          >
            <BaseSkeleton className="w-16 h-8 rounded bg-white/20 mb-2" />
            <BaseSkeleton className="w-24 h-3 rounded bg-white/20" />
          </div>
        </div>
      </div>
    </Section>
  )
}
