import { BaseSkeleton } from './BaseSkeleton'

interface SectionHeaderSkeletonProps {
  align?: 'center' | 'left' | 'between'
  isDark?: boolean
}

export function SectionHeaderSkeleton({ align = 'left', isDark = false }: SectionHeaderSkeletonProps) {
  const isCenter = align === 'center'
  const isBetween = align === 'between'

  return (
    <div
      className={`mb-12 md:mb-16 ${
        isCenter
          ? 'flex flex-col items-center text-center'
          : isBetween
          ? 'flex flex-col md:flex-row md:items-end justify-between gap-6'
          : 'flex flex-col items-start'
      }`}
    >
      <div className={isCenter ? 'flex flex-col items-center' : 'max-w-2xl'}>
        {/* Eyebrow badge */}
        <BaseSkeleton
          className={`w-28 h-5 rounded-full mb-4 ${
            isDark ? 'bg-white/10' : 'bg-gray-200'
          }`}
        />

        {/* Title */}
        <div className={`space-y-2 mb-4 ${isCenter ? 'flex flex-col items-center' : ''}`}>
          <BaseSkeleton
            className={`h-9 md:h-12 w-64 md:w-80 rounded-xl ${
              isDark ? 'bg-white/15' : 'bg-gray-300'
            }`}
          />
          <BaseSkeleton
            className={`h-9 md:h-12 w-48 md:w-60 rounded-xl ${
              isDark ? 'bg-white/15' : 'bg-gray-300'
            }`}
          />
        </div>

        {/* Description */}
        {!isBetween && (
          <BaseSkeleton
            className={`h-4 w-72 md:w-96 rounded ${
              isDark ? 'bg-white/10' : 'bg-gray-200'
            }`}
          />
        )}
      </div>

      {isBetween && (
        <div className="max-w-md w-full md:w-auto">
          <BaseSkeleton
            className={`h-4 w-60 md:w-80 rounded ${
              isDark ? 'bg-white/10' : 'bg-gray-200'
            }`}
          />
        </div>
      )}
    </div>
  )
}
