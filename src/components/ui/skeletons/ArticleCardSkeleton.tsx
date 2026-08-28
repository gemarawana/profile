import { BaseSkeleton } from './BaseSkeleton'
import { C } from '@/lib/constants'

export function ArticleCardSkeleton() {
  return (
    <div
      className="rounded-2xl overflow-hidden border flex flex-col justify-between"
      style={{ background: C.white, borderColor: C.border }}
    >
      <div>
        {/* Cover Image Skeleton with Badge */}
        <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
          <BaseSkeleton className="w-full h-full rounded-none" />
          <div className="absolute top-3 left-3 z-10">
            <BaseSkeleton className="w-24 h-6 rounded-full bg-gray-300/80" />
          </div>
        </div>

        {/* Content Body Skeleton */}
        <div className="p-6">
          {/* Date & Read Time */}
          <div className="flex items-center gap-2 mb-3">
            <BaseSkeleton className="w-20 h-3 rounded" />
            <BaseSkeleton className="w-2 h-2 rounded-full" />
            <BaseSkeleton className="w-14 h-3 rounded" />
          </div>

          {/* Title (2 lines) */}
          <div className="space-y-2 mb-3">
            <BaseSkeleton className="w-full h-5 rounded-md" />
            <BaseSkeleton className="w-3/4 h-5 rounded-md" />
          </div>

          {/* Excerpt (3 lines) */}
          <div className="space-y-1.5">
            <BaseSkeleton className="w-full h-3 rounded" />
            <BaseSkeleton className="w-full h-3 rounded" />
            <BaseSkeleton className="w-2/3 h-3 rounded" />
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="p-6 pt-0 flex items-center justify-between">
        <BaseSkeleton className="w-24 h-3 rounded" />
        <BaseSkeleton className="w-16 h-4 rounded-md" />
      </div>
    </div>
  )
}
