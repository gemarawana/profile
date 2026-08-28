import Link from 'next/link'
import Image from 'next/image'
import { adminList } from '@/lib/dal/admin'
import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { DataTable, RowActions, SearchBar } from '@/components/admin/DataTable'
import { DataTablePagination } from '@/components/admin/DataTablePagination'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { Button } from '@/components/ui/button'
import { deleteItem } from './actions'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; limit?: string }>
}) {
  const sp = await searchParams
  const page = Math.max(1, Number(sp.page || 1))
  const limit = Number(sp.limit || 10)

  const { data, count } = await adminList('articles', {
    search: sp.q,
    searchColumns: ['title', 'slug', 'category', 'author_name'],
    page,
    pageSize: limit,
    orderBy: 'publication_date',
    ascending: false,
  })

  return (
    <div>
      <Breadcrumb items={[{ label: 'Content' }, { label: 'Articles' }]} />
      <PageHeader
        title="Articles"
        description="Manage stories and articles."
        actions={
          <Link href="/admin/content/articles/new">
            <Button>+ Add Article</Button>
          </Link>
        }
      />
      <div className="mb-4">
        <SearchBar defaultValue={sp.q} placeholder="Search title…" />
      </div>

      <DataTable
        headers={['Image', 'Title', 'Category', 'Date', 'Featured', 'Status', 'Actions']}
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
            <td className="px-4 py-3 font-medium text-[#1A0A0A]">{row.title}</td>
            <td className="px-4 py-3 text-[#6B5A5A]">{row.category}</td>
            <td className="px-4 py-3 text-[#6B5A5A]">{row.publication_date?.slice(0, 10)}</td>
            <td className="px-4 py-3 font-medium">{row.is_featured ? 'Yes' : '—'}</td>
            <td className="px-4 py-3">
              <StatusBadge published={row.is_published} />
            </td>
            <td className="px-4 py-3">
              <RowActions
                editHref={`/admin/content/articles/${row.id}`}
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
