import { Container } from '@/components/ui/Container'
import { BaseSkeleton } from '@/components/ui/skeletons/BaseSkeleton'
import { ArticleCardSkeleton } from '@/components/ui/skeletons/ArticleCardSkeleton'
import { C } from '@/lib/constants'

export default function ArticlesArchiveLoading() {
  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ background: C.warmWhite }}>
      <main className="flex-1 pt-28 pb-20">
        <Container>
          {/* Breadcrumb Skeleton */}
          <div className="mb-8">
            <BaseSkeleton className="w-44 h-9 rounded-full" />
          </div>

          {/* Page Header Skeleton */}
          <div className="max-w-3xl mb-12">
            <BaseSkeleton className="w-36 h-6 rounded-full mb-4" />
            <div className="space-y-3 mb-4">
              <BaseSkeleton className="w-3/4 h-10 rounded-xl" />
              <BaseSkeleton className="w-1/2 h-10 rounded-xl" />
            </div>
            <div className="space-y-2">
              <BaseSkeleton className="w-full h-4 rounded" />
              <BaseSkeleton className="w-4/5 h-4 rounded" />
            </div>
          </div>

          {/* Controls Bar Skeleton */}
          <div className="flex flex-col gap-6 p-6 rounded-3xl border bg-white shadow-sm mb-8" style={{ borderColor: C.border }}>
            {/* Search and Items per page row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <BaseSkeleton className="w-full sm:max-w-md h-10 rounded-full" />
              <BaseSkeleton className="w-36 h-9 rounded-lg self-end sm:self-auto" />
            </div>

            {/* Category Pills Row Skeleton */}
            <div className="flex items-center gap-2 overflow-hidden pb-1">
              <BaseSkeleton className="w-32 h-8 rounded-full" />
              <BaseSkeleton className="w-28 h-8 rounded-full" />
              <BaseSkeleton className="w-36 h-8 rounded-full" />
              <BaseSkeleton className="w-24 h-8 rounded-full" />
              <BaseSkeleton className="w-32 h-8 rounded-full" />
            </div>
          </div>

          {/* Results Info Skeleton */}
          <div className="flex items-center justify-between mb-6 px-1">
            <BaseSkeleton className="w-48 h-4 rounded" />
          </div>

          {/* Grid of Article Card Skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </main>
    </div>
  )
}
