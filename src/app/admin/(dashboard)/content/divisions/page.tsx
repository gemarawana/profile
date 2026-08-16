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
  const { data, page: currentPage, totalPages } = await adminList('organization_divisions', {
    search: sp.q,
    searchColumns: ["name","slug"],
    page,
  })

  return (
    <div>
      <Breadcrumb items={[{ label: 'Content' }, { label: 'Divisions' }]} />
      <PageHeader
        title="Divisions"
        description="Manage organization divisions."
        actions={
          <Link href="/admin/content/divisions/new">
            <Button>+ Add Division</Button>
          </Link>
        }
      />
      <div className="mb-4">
        <SearchBar defaultValue={sp.q} />
      </div>
      <DataTable headers={["Name","Slug","Order","Status","Reorder","Actions"]} isEmpty={data.length === 0}>
        {data.map(row => (
          <tr key={row.id} className="border-b border-[#E8E5E0] last:border-0">
            <td className="px-4 py-3 font-medium">{row.name}</td>
            <td className="px-4 py-3 text-[#6B5A5A]">{row.slug}</td>
            <td className="px-4 py-3">{row.order_index}</td>
            <td className="px-4 py-3"><StatusBadge published={row.is_published} /></td>
            <td className="px-4 py-3">
              <OrderButtons
                onMoveUp={reorderItem.bind(null, row.id, 'up')}
                onMoveDown={reorderItem.bind(null, row.id, 'down')}
              />
            </td>
            <td className="px-4 py-3">
              <RowActions
                editHref={`/admin/content/divisions/${row.id}`}
                deleteLabel={String(row.name)}
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
