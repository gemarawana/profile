import { Badge } from '@/components/ui/card'

export function StatusBadge({
  published,
  activeLabel = 'Published',
  inactiveLabel = 'Draft',
}: {
  published: boolean
  activeLabel?: string
  inactiveLabel?: string
}) {
  return (
    <Badge variant={published ? 'success' : 'muted'}>
      {published ? activeLabel : inactiveLabel}
    </Badge>
  )
}
