import { notFound } from 'next/navigation'
import { adminGetById } from '@/lib/dal/admin'
import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { updateItem } from '../actions'
import { WhyCardForm } from '../why-form'

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await adminGetById('why_cards', id)
  if (!row) notFound()
  return (
    <div>
      <Breadcrumb items={[{ label: 'Content' }, { label: 'Why Gemarawana', href: '/admin/content/why-cards' }, { label: 'Edit' }]} />
      <PageHeader title="Edit Why Card" />
      <WhyCardForm initial={row} onSubmit={updateItem.bind(null, id)} />
    </div>
  )
}
