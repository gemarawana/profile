import { notFound } from 'next/navigation'
import { adminGetById } from '@/lib/dal/admin'
import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { updateItem } from '../actions'
import { HistoryForm } from '../history-form'

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await adminGetById('history_milestones', id)
  if (!row) notFound()

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Content' },
          { label: 'History', href: '/admin/content/history' },
          { label: 'Edit' },
        ]}
      />
      <PageHeader title="Edit Milestone" />
      <HistoryForm initial={row} onSubmit={updateItem.bind(null, id)} />
    </div>
  )
}
