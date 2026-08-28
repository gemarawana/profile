import { cn } from '@/lib/utils'

interface BaseSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function BaseSkeleton({ className, ...props }: BaseSkeletonProps) {
  return (
    <div
      className={cn('animate-pulse bg-gray-200/80 rounded-xl', className)}
      {...props}
    />
  )
}
