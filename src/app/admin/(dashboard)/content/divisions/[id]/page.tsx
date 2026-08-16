import { notFound } from 'next/navigation'
import { adminGetById } from '@/lib/dal/admin'
import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { updateItem } from '../actions'
import { DivisionForm } from '../division-form'

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await adminGetById('organization_divisions', id)
  if (!row) notFound()
  return (
    <div>
      <Breadcrumb items={[{ label: 'Content' }, { label: 'Divisions', href: '/admin/content/divisions' }, { label: 'Edit' }]} />
      <PageHeader title="Edit Division" />
      <DivisionForm initial={row} onSubmit={updateItem.bind(null, id)} />
    </div>
  )
}
