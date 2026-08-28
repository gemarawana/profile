'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface DataTablePaginationProps {
  totalItems: number
  currentPage?: number
  itemsPerPage?: number
  pageSizeOptions?: number[]
}

export function DataTablePagination({
  totalItems,
  currentPage = 1,
  itemsPerPage = 10,
  pageSizeOptions = [10, 25, 50],
}: DataTablePaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))
  const page = Math.min(Math.max(1, currentPage), totalPages)

  // Calculate range
  const from = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1
  const to = Math.min(page * itemsPerPage, totalItems)

  const createPageUrl = useCallback(
    (targetPage: number, targetLimit?: number) => {
      const params = new URLSearchParams(searchParams.toString())

      // Set or delete page param
      if (targetPage > 1) {
        params.set('page', String(targetPage))
      } else {
        params.delete('page')
      }

      // Set or delete limit param (default: 10)
      const limit = targetLimit ?? itemsPerPage
      if (limit !== 10) {
        params.set('limit', String(limit))
      } else {
        params.delete('limit')
      }

      const queryString = params.toString()
      return queryString ? `${pathname}?${queryString}` : pathname
    },
    [pathname, searchParams, itemsPerPage]
  )

  function handlePageChange(newPage: number) {
    if (newPage < 1 || newPage > totalPages || newPage === page) return
    router.push(createPageUrl(newPage))
  }

  function handlePageSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLimit = Number(e.target.value)
    router.push(createPageUrl(1, newLimit))
  }

  // Generate pagination items with smart ellipsis
  const paginationItems = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const items: (number | string)[] = []

    if (page <= 4) {
      items.push(1, 2, 3, 4, 5, '...', totalPages)
    } else if (page >= totalPages - 3) {
      items.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
    } else {
      items.push(1, '...', page - 1, page, page + 1, '...', totalPages)
    }

    return items
  }, [totalPages, page])

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8E5E0] bg-white px-4 py-3 sm:px-6 text-sm text-[#6B5A5A]">
      {/* Left side: Rows per page + Range indicator */}
      <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-500">Rows per page:</span>
          <select
            value={itemsPerPage}
            onChange={handlePageSizeChange}
            className="h-8 rounded-lg border border-[#E8E5E0] bg-white px-2.5 py-1 text-xs font-semibold text-[#1A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A1A]/30 cursor-pointer shadow-2xs hover:bg-[#FAF9F7]"
          >
            {pageSizeOptions.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <span className="text-gray-300 hidden sm:inline">|</span>

        <span className="font-medium text-gray-600">
          {totalItems === 0 ? '0 of 0' : `${from} - ${to} of ${totalItems}`}
        </span>
      </div>

      {/* Right side: Page Navigation */}
      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="inline-flex h-8 items-center gap-1 rounded-lg border border-[#E8E5E0] bg-white px-2.5 text-xs font-semibold text-[#1A0A0A] transition-colors hover:bg-[#FAF9F7] disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Numbered Page Buttons */}
        <div className="flex items-center gap-1">
          {paginationItems.map((item, idx) => {
            if (typeof item === 'string') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="flex h-8 w-8 items-center justify-center text-xs font-bold text-gray-400 select-none"
                >
                  …
                </span>
              )
            }

            const isActive = item === page

            return (
              <button
                key={`page-${item}`}
                type="button"
                onClick={() => handlePageChange(item)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex h-8 min-w-[32px] items-center justify-center rounded-lg px-2 text-xs font-bold transition-colors ${
                  isActive
                    ? 'bg-[#8B1A1A] text-white shadow-2xs'
                    : 'border border-[#E8E5E0] bg-white text-[#1A0A0A] hover:bg-[#FAF9F7]'
                }`}
              >
                {item}
              </button>
            )
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className="inline-flex h-8 items-center gap-1 rounded-lg border border-[#E8E5E0] bg-white px-2.5 text-xs font-semibold text-[#1A0A0A] transition-colors hover:bg-[#FAF9F7] disabled:pointer-events-none disabled:opacity-40"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
