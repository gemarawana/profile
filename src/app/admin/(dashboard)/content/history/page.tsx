import Link from 'next/link'
import { adminList } from '@/lib/dal/admin'
import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { DataTable, Pagination, RowActions, SearchBar } from '@/components/admin/DataTable'
import { OrderButtons } from '@/components/admin/OrderButtons'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { Button } from '@/components/ui/button'
import { deleteItem, reorderItem } from './actions'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const sp = await searchParams
  const page = Number(sp.page || 1)
  const { data, page: currentPage, totalPages } = await adminList('history_milestones', {
    search: sp.q,
    searchColumns: ['year', 'event_description'],
    page,
  })

  return (
    <div>
      <Breadcrumb items={[{ label: 'Content' }, { label: 'History' }]} />
      <PageHeader
        title="History"
        description="Manage history milestones."
        actions={
          <Link href="/admin/content/history/new">
            <Button>+ Add Milestone</Button>
          </Link>
        }
      />
      <div className="mb-4">
        <SearchBar defaultValue={sp.q} placeholder="Search year…" />
      </div>
      <DataTable
        headers={['Year', 'Event', 'Order', 'Status', 'Reorder', 'Actions']}
        isEmpty={data.length === 0}
      >
        {data.map(row => (
          <tr key={row.id} className="border-b border-[#E8E5E0] last:border-0">
            <td className="px-4 py-3 font-medium">{row.year}</td>
            <td className="px-4 py-3 max-w-md truncate">{row.event_description}</td>
            <td className="px-4 py-3">{row.order_index}</td>
            <td className="px-4 py-3">
              <StatusBadge published={row.is_published} />
            </td>
            <td className="px-4 py-3">
              <OrderButtons
                onMoveUp={reorderItem.bind(null, row.id, 'up')}
                onMoveDown={reorderItem.bind(null, row.id, 'down')}
              />
            </td>
            <td className="px-4 py-3">
              <RowActions
                editHref={`/admin/content/history/${row.id}`}
                deleteLabel={row.year}
                onDelete={deleteItem.bind(null, row.id)}
              />
            </td>
          </tr>
        ))}
      </DataTable>
      <Pagination page={currentPage} totalPages={totalPages} />
    </div>
  )
}
