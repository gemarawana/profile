'use client'

import { useTransition } from 'react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'

export function OrderButtons({
  onMoveUp,
  onMoveDown,
}: {
  onMoveUp: () => Promise<{ error?: string } | void>
  onMoveDown: () => Promise<{ error?: string } | void>
}) {
  const [pending, startTransition] = useTransition()

  return (
    <div className="flex gap-1">
      <Button
        type="button"
        size="sm"
        variant="ghost"
        disabled={pending}
        aria-label="Move up"
        onClick={() =>
          startTransition(async () => {
            const res = await onMoveUp()
            if (res && 'error' in res && res.error) toast(res.error, 'error')
          })
        }
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        disabled={pending}
        aria-label="Move down"
        onClick={() =>
          startTransition(async () => {
            const res = await onMoveDown()
            if (res && 'error' in res && res.error) toast(res.error, 'error')
          })
        }
      >
        <ArrowDown className="h-4 w-4" />
      </Button>
    </div>
  )
}
