import Link from 'next/link'
import Image from 'next/image'
import { adminGetDivisionsOptions, adminList } from '@/lib/dal/admin'
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

  const [{ data, count }, divisions] = await Promise.all([
    adminList('activities', {
      search: sp.q,
      searchColumns: ['title', 'slug', 'subtitle'],
      page,
      pageSize: limit,
    }),
    adminGetDivisionsOptions(),
  ])
  const divisionMap = Object.fromEntries(divisions.map(d => [d.id, d.name]))

  return (
    <div>
      <Breadcrumb items={[{ label: 'Content' }, { label: 'Activities' }]} />
      <PageHeader
        title="Activities"
        description="Manage activity cards."
        actions={
          <Link href="/admin/content/activities/new">
            <Button>+ Add Activity</Button>
          </Link>
        }
      />
      <div className="mb-4">
        <SearchBar defaultValue={sp.q} placeholder="Search title…" />
      </div>
      <DataTable
        headers={['Image', 'Title', 'Slug', 'Division', 'Order', 'Status', 'Reorder', 'Actions']}
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
            <td className="px-4 py-3">
              <div className="relative h-12 w-20 overflow-hidden rounded-md bg-[#F4F3F0]">
                <Image src={row.image_url} alt={row.title} fill className="object-cover" sizes="80px" unoptimized />
              </div>
            </td>
            <td className="px-4 py-3 font-medium">{row.title}</td>
            <td className="px-4 py-3 text-[#6B5A5A]">{row.slug}</td>
            <td className="px-4 py-3 text-[#6B5A5A]">
              {row.division_id ? divisionMap[row.division_id] ?? '—' : '—'}
            </td>
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
                editHref={`/admin/content/activities/${row.id}`}
                deleteLabel={row.title}
                onDelete={deleteItem.bind(null, row.id)}
              />
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  )
}
