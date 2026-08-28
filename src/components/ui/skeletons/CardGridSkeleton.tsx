import { BaseSkeleton } from './BaseSkeleton'
import { Section } from '@/components/ui/Section'
import { SectionHeaderSkeleton } from './SectionHeaderSkeleton'
import { C } from '@/lib/constants'

interface CardGridSkeletonProps {
  count?: number
  columns?: 2 | 3 | 4
  variant?: 'feature' | 'tall' | 'portrait'
  headerAlign?: 'center' | 'left' | 'between'
  background?: string
  isDark?: boolean
}

export function CardGridSkeleton({
  count = 6,
  columns = 3,
  variant = 'feature',
  headerAlign = 'between',
  background = C.lightGray,
  isDark = false,
}: CardGridSkeletonProps) {
  const colClass =
    columns === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : columns === 4
      ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <Section style={{ background }}>
      <SectionHeaderSkeleton align={headerAlign} isDark={isDark} />

      <div className={`grid ${colClass} gap-6`}>
        {Array.from({ length: count }).map((_, i) => {
          if (variant === 'tall') {
            // e.g. WhatWeDo style
            return (
              <div
                key={i}
                className="rounded-2xl overflow-hidden relative h-[290px] p-7 flex flex-col justify-end"
                style={{ background: isDark ? 'rgba(255,255,255,0.05)' : '#e5e7eb' }}
              >
                <BaseSkeleton
                  className={`w-full h-full absolute inset-0 rounded-none ${
                    isDark ? 'bg-white/5' : 'bg-gray-300/50'
                  }`}
                />
                <div className="relative z-10 space-y-2">
                  <BaseSkeleton className="w-2/3 h-6 rounded-md bg-white/20" />
                  <BaseSkeleton className="w-1/2 h-3 rounded bg-white/20" />
                </div>
              </div>
            )
          }

          if (variant === 'portrait') {
            // e.g. Organization / MemberStories style
            return (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border flex flex-col"
                style={{
                  background: isDark ? C.crimsonCard : C.white,
                  borderColor: isDark ? 'rgba(255,255,255,0.08)' : C.border,
                }}
              >
                <div className="relative w-full aspect-[4/5] bg-gray-100">
                  <BaseSkeleton
                    className={`w-full h-full rounded-none ${
                      isDark ? 'bg-white/5' : 'bg-gray-200'
                    }`}
                  />
                </div>
                <div className="p-5 space-y-2">
                  <BaseSkeleton
                    className={`w-3/4 h-5 rounded-md ${
                      isDark ? 'bg-white/15' : 'bg-gray-300'
                    }`}
                  />
                  <BaseSkeleton
                    className={`w-1/2 h-3 rounded ${
                      isDark ? 'bg-white/10' : 'bg-gray-200'
                    }`}
                  />
                </div>
              </div>
            )
          }

          // Default 'feature' variant (WhyGemarawana style)
          return (
            <div
              key={i}
              className="rounded-2xl p-7 flex flex-col justify-between"
              style={{
                background: isDark ? C.crimsonCard : C.white,
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : C.border}`,
              }}
            >
              <div>
                <BaseSkeleton
                  className={`w-12 h-12 rounded-xl mb-5 ${
                    isDark ? 'bg-white/10' : 'bg-gray-200'
                  }`}
                />
                <BaseSkeleton
                  className={`w-3/4 h-6 rounded-md mb-3 ${
                    isDark ? 'bg-white/15' : 'bg-gray-300'
                  }`}
                />
                <div className="space-y-2">
                  <BaseSkeleton
                    className={`w-full h-3.5 rounded ${
                      isDark ? 'bg-white/10' : 'bg-gray-200'
                    }`}
                  />
                  <BaseSkeleton
                    className={`w-5/6 h-3.5 rounded ${
                      isDark ? 'bg-white/10' : 'bg-gray-200'
                    }`}
                  />
                </div>
              </div>
              <BaseSkeleton
                className={`w-20 h-3 rounded mt-6 ${
                  isDark ? 'bg-white/10' : 'bg-gray-200'
                }`}
              />
            </div>
          )
        })}
      </div>
    </Section>
  )
}
