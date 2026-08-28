import { BaseSkeleton } from './BaseSkeleton'
import { C } from '@/lib/constants'

export function FeaturedArticleSkeleton() {
  return (
    <div
      className="relative rounded-3xl overflow-hidden border flex flex-col lg:flex-row items-stretch"
      style={{ background: C.white, borderColor: C.border }}
    >
      {/* Left side: Cover Image Skeleton */}
      <div className="relative lg:w-3/5 min-h-[280px] lg:min-h-[380px] bg-gray-100 overflow-hidden">
        <BaseSkeleton className="w-full h-full rounded-none" />
        <div className="absolute top-4 left-4 z-10">
          <BaseSkeleton className="w-32 h-7 rounded-full bg-gray-300/80" />
        </div>
      </div>

      {/* Right side: Content Skeleton */}
      <div className="lg:w-2/5 p-8 lg:p-10 flex flex-col justify-between">
        <div>
          {/* Date & Read Time */}
          <div className="flex items-center gap-2 mb-4">
            <BaseSkeleton className="w-24 h-3.5 rounded" />
            <BaseSkeleton className="w-2 h-2 rounded-full" />
            <BaseSkeleton className="w-16 h-3.5 rounded" />
          </div>

          {/* Large Title */}
          <div className="space-y-2.5 mb-4">
            <BaseSkeleton className="w-full h-7 rounded-lg" />
            <BaseSkeleton className="w-4/5 h-7 rounded-lg" />
          </div>

          {/* Excerpt */}
          <div className="space-y-2 mb-6">
            <BaseSkeleton className="w-full h-3.5 rounded" />
            <BaseSkeleton className="w-full h-3.5 rounded" />
            <BaseSkeleton className="w-3/4 h-3.5 rounded" />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t flex items-center justify-between" style={{ borderColor: C.border }}>
          <BaseSkeleton className="w-32 h-4 rounded" />
          <BaseSkeleton className="w-28 h-5 rounded-md" />
        </div>
      </div>
    </div>
  )
}
