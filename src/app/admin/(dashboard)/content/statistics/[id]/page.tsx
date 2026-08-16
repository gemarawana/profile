import { notFound } from 'next/navigation'
import { adminGetById } from '@/lib/dal/admin'
import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { updateItem } from '../actions'
import { StatisticForm } from '../statistic-form'

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await adminGetById('impact_statistics', id)
  if (!row) notFound()

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Content' },
          { label: 'Impact Statistics', href: '/admin/content/statistics' },
          { label: 'Edit' },
        ]}
      />
      <PageHeader title="Edit Statistic" />
      <StatisticForm initial={row} onSubmit={updateItem.bind(null, id)} />
    </div>
  )
}
