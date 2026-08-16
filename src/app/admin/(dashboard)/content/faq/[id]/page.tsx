import { notFound } from 'next/navigation'
import { adminGetById } from '@/lib/dal/admin'
import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { updateItem } from '../actions'
import { FaqForm } from '../faq-form'

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await adminGetById('faqs', id)
  if (!row) notFound()

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Content' },
          { label: 'FAQ', href: '/admin/content/faq' },
          { label: 'Edit' },
        ]}
      />
      <PageHeader title="Edit FAQ" />
      <FaqForm initial={row} onSubmit={updateItem.bind(null, id)} />
    </div>
  )
}
