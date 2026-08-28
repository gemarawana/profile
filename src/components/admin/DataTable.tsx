'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { toast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'

export function SearchBar({
  placeholder = 'Search…',
  defaultValue = '',
}: {
  placeholder?: string
  defaultValue?: string
}) {
  const router = useRouter()
  const [value, setValue] = useState(defaultValue)

  return (
    <form
      className="flex gap-2"
      onSubmit={e => {
        e.preventDefault()
        const params = new URLSearchParams(window.location.search)
        if (value) params.set('q', value)
        else params.delete('q')
        params.delete('page')
        router.push(`?${params.toString()}`)
      }}
    >
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
        className="max-w-xs"
      />
      <Button type="submit" variant="outline">
        Search
      </Button>
    </form>
  )
}

export function Pagination({
  page,
  totalPages,
}: {
  page: number
  totalPages: number
}) {
  const router = useRouter()
  if (totalPages <= 1) return null

  function go(p: number) {
    const params = new URLSearchParams(window.location.search)
    params.set('page', String(p))
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="mt-4 flex items-center justify-between text-sm text-[#6B5A5A]">
      <span>
        Page {page} of {totalPages}
      </span>
      <div className="flex gap-2">
        <Button type="button" size="sm" variant="outline" disabled={page <= 1} onClick={() => go(page - 1)}>
          Previous
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={page >= totalPages}
          onClick={() => go(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export function DataTable({
  headers,
  children,
  emptyMessage = 'No items found.',
  isEmpty,
  pagination,
}: {
  headers: string[]
  children: React.ReactNode
  emptyMessage?: string
  isEmpty?: boolean
  pagination?: React.ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E8E5E0] bg-white shadow-2xs">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[#E8E5E0] bg-[#FAF9F7] text-xs uppercase tracking-wide text-[#6B5A5A]">
            <tr>
              {headers.map(h => (
                <th key={h} className="px-4 py-3 font-bold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isEmpty ? (
              <tr>
                <td colSpan={headers.length} className="px-4 py-10 text-center text-[#6B5A5A]">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>
      {pagination}
    </div>
  )
}

export function RowActions({
  editHref,
  onDelete,
  deleteLabel = 'this item',
}: {
  editHref: string
  onDelete: () => Promise<{ error?: string } | void>
  deleteLabel?: string
}) {
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()

  return (
    <>
      <div className={cn('flex items-center gap-1')}>
        <Link href={editHref}>
          <Button type="button" size="sm" variant="ghost" aria-label="Edit">
            <Pencil className="h-4 w-4" />
          </Button>
        </Link>
        <Button type="button" size="sm" variant="ghost" aria-label="Delete" onClick={() => setOpen(true)}>
          <Trash2 className="h-4 w-4 text-red-600" />
        </Button>
      </div>
      <ConfirmDialog
        open={open}
        title="Are you sure?"
        message={`This will permanently delete ${deleteLabel}. This action cannot be undone.`}
        loading={pending}
        onCancel={() => setOpen(false)}
        onConfirm={() =>
          startTransition(async () => {
            const res = await onDelete()
            setOpen(false)
            if (res && 'error' in res && res.error) toast(res.error, 'error')
            else toast('Deleted successfully')
          })
        }
      />
    </>
  )
}
