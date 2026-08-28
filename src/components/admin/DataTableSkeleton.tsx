export function DataTableSkeleton({
  rowCount = 6,
  columns = 6,
}: {
  rowCount?: number
  columns?: number
}) {
  return (
    <div className="w-full animate-pulse space-y-5">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-2">
        <div className="h-4 w-12 rounded-md bg-[#E8E5E0]/70" />
        <span className="text-xs text-[#E8E5E0]">\</span>
        <div className="h-4 w-20 rounded-md bg-[#E8E5E0]/70" />
      </div>

      {/* Page Header Skeleton */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="h-8 w-44 rounded-xl bg-[#E8E5E0]" />
          <div className="h-4 w-64 rounded-lg bg-[#E8E5E0]/60" />
        </div>
        <div className="h-10 w-32 rounded-xl bg-[#E8E5E0]" />
      </div>

      {/* Search Bar Skeleton */}
      <div className="mb-4 flex gap-2">
        <div className="h-10 w-full max-w-xs rounded-xl bg-[#E8E5E0]/60" />
        <div className="h-10 w-20 rounded-xl bg-[#E8E5E0]/60" />
      </div>

      {/* Unified Table Card Skeleton */}
      <div className="overflow-hidden rounded-2xl border border-[#E8E5E0] bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            {/* Header Skeleton */}
            <thead className="border-b border-[#E8E5E0] bg-[#FAF9F7]">
              <tr>
                {Array.from({ length: columns }).map((_, i) => (
                  <th key={i} className="px-4 py-3.5">
                    <div
                      className="h-3.5 rounded-md bg-[#E8E5E0]"
                      style={{ width: `${Math.floor(Math.random() * 40) + 50}px` }}
                    />
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body Rows Skeleton */}
            <tbody className="divide-y divide-[#E8E5E0]">
              {Array.from({ length: rowCount }).map((_, rowIndex) => (
                <tr key={rowIndex} className="last:border-0">
                  {/* Thumbnail / Image Column */}
                  <td className="px-4 py-3">
                    <div className="h-11 w-16 rounded-lg bg-[#E8E5E0]/80" />
                  </td>

                  {/* Main Title Column */}
                  <td className="px-4 py-3">
                    <div className="h-4 w-40 sm:w-56 rounded-md bg-[#E8E5E0]" />
                  </td>

                  {/* Secondary Data Column */}
                  <td className="px-4 py-3">
                    <div className="h-3.5 w-24 rounded-md bg-[#E8E5E0]/70" />
                  </td>

                  {/* Date / Order Column */}
                  <td className="px-4 py-3">
                    <div className="h-3.5 w-20 rounded-md bg-[#E8E5E0]/70" />
                  </td>

                  {/* Status Badge Column */}
                  <td className="px-4 py-3">
                    <div className="h-6 w-16 rounded-full bg-[#E8E5E0]/80" />
                  </td>

                  {/* Row Actions Column */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-[#E8E5E0]" />
                      <div className="h-8 w-8 rounded-lg bg-[#E8E5E0]/60" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Attached Pagination Footer Skeleton */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8E5E0] bg-white px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-32 rounded-lg bg-[#E8E5E0]/70" />
            <div className="h-4 w-28 rounded-md bg-[#E8E5E0]/60" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-8 w-20 rounded-lg bg-[#E8E5E0]/70" />
            <div className="flex items-center gap-1">
              <div className="h-8 w-8 rounded-lg bg-[#E8E5E0]" />
              <div className="h-8 w-8 rounded-lg bg-[#E8E5E0]/60" />
              <div className="h-8 w-8 rounded-lg bg-[#E8E5E0]/60" />
            </div>
            <div className="h-8 w-16 rounded-lg bg-[#E8E5E0]/70" />
          </div>
        </div>
      </div>
    </div>
  )
}
