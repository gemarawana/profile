import Link from 'next/link'
import { adminList } from '@/lib/dal/admin'
import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { DataTable, RowActions, SearchBar } from '@/components/admin/DataTable'
import { DataTablePagination } from '@/components/admin/DataTablePagination'
import { OrderButtons } from '@/components/admin/OrderButtons'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { Button } from '@/components/ui/button'
import { deleteItem, reorderItem } from './actions'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; limit?: string }>
}) {
  const sp = await searchParams
  const page = Math.max(1, Number(sp.page || 1))
  const limit = Number(sp.limit || 10)

  const { data, count } = await adminList('faqs', {
    search: sp.q,
    searchColumns: ['question', 'answer', 'category'],
    page,
    pageSize: limit,
  })

  return (
    <div>
      <Breadcrumb items={[{ label: 'Content' }, { label: 'FAQ' }]} />
      <PageHeader
        title="FAQ"
        description="Manage frequently asked questions."
        actions={
          <Link href="/admin/content/faq/new">
            <Button>+ Add FAQ</Button>
          </Link>
        }
      />
      <div className="mb-4">
        <SearchBar defaultValue={sp.q} placeholder="Search questions…" />
      </div>
      <DataTable
        headers={['Question', 'Category', 'Order', 'Status', 'Reorder', 'Actions']}
        isEmpty={data.length === 0}
        pagination={
          <DataTablePagination
            totalItems={count}
            currentPage={page}
            itemsPerPage={limit}
          />
        }
      >
        {data.map(row => (
          <tr key={row.id} className="border-b border-[#E8E5E0] last:border-0 hover:bg-[#FAF9F7]/50 transition-colors">
            <td className="px-4 py-3 font-medium max-w-md truncate">{row.question}</td>
            <td className="px-4 py-3 text-[#6B5A5A]">{row.category}</td>
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
                editHref={`/admin/content/faq/${row.id}`}
                deleteLabel={row.question}
                onDelete={deleteItem.bind(null, row.id)}
              />
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  )
}
