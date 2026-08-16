import Link from 'next/link'
import { adminList } from '@/lib/dal/admin'
import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { DataTable, Pagination, RowActions, SearchBar } from '@/components/admin/DataTable'
import { OrderButtons } from '@/components/admin/OrderButtons'
import { Button } from '@/components/ui/button'
import { deleteItem, reorderItem } from './actions'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const sp = await searchParams
  const page = Number(sp.page || 1)
  const { data, page: currentPage, totalPages } = await adminList('impact_statistics', {
    search: sp.q,
    searchColumns: ['stat_key', 'label'],
    page,
  })

  return (
    <div>
      <Breadcrumb items={[{ label: 'Content' }, { label: 'Impact Statistics' }]} />
      <PageHeader
        title="Impact Statistics"
        description="Manage homepage impact numbers."
        actions={
          <Link href="/admin/content/statistics/new">
            <Button>+ Add Statistic</Button>
          </Link>
        }
      />
      <div className="mb-4">
        <SearchBar defaultValue={sp.q} placeholder="Search key or label…" />
      </div>
      <DataTable
        headers={['Key', 'Value', 'Label', 'Order', 'Reorder', 'Actions']}
        isEmpty={data.length === 0}
      >
        {data.map(row => (
          <tr key={row.id} className="border-b border-[#E8E5E0] last:border-0">
            <td className="px-4 py-3 font-mono text-sm">{row.stat_key}</td>
            <td className="px-4 py-3 font-medium">
              {row.stat_value}
              {row.stat_suffix}
            </td>
            <td className="px-4 py-3">{row.label}</td>
            <td className="px-4 py-3">{row.order_index}</td>
            <td className="px-4 py-3">
              <OrderButtons
                onMoveUp={reorderItem.bind(null, row.id, 'up')}
                onMoveDown={reorderItem.bind(null, row.id, 'down')}
              />
            </td>
            <td className="px-4 py-3">
              <RowActions
                editHref={`/admin/content/statistics/${row.id}`}
                deleteLabel={row.label}
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
