import { BaseSkeleton } from './BaseSkeleton'
import { Container } from '@/components/ui/Container'
import { C } from '@/lib/constants'

export function HeroSkeleton() {
  return (
    <section
      className="relative w-full overflow-hidden flex flex-col justify-end pb-16 md:pb-24"
      style={{
        minHeight: '100svh',
        background: C.crimsonDeep,
        paddingTop: 'var(--navbar-h)',
      }}
      aria-label="Hero loading skeleton"
    >
      {/* Background shimmer */}
      <div className="absolute inset-0 bg-white/[0.02]" />

      <Container className="relative z-10">
        {/* Main headline placeholder */}
        <div className="mb-8 mt-12 space-y-3">
          <BaseSkeleton className="h-16 sm:h-24 md:h-28 w-72 sm:w-96 rounded-2xl bg-white/10" />
          <BaseSkeleton className="h-16 sm:h-24 md:h-28 w-80 sm:w-[32rem] rounded-2xl bg-white/15" />
        </div>

        {/* Bottom row: description + sub text */}
        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16 justify-between">
          <div className="max-w-2xl w-full space-y-3">
            <BaseSkeleton className="h-5 sm:h-6 w-full max-w-xl rounded-lg bg-white/10" />
            <BaseSkeleton className="h-5 sm:h-6 w-3/4 max-w-md rounded-lg bg-white/10" />
          </div>
        </div>
      </Container>
    </section>
  )
}
