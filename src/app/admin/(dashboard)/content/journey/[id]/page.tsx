import { notFound } from 'next/navigation'
import { adminGetById } from '@/lib/dal/admin'
import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'

import { updateItem } from '../actions'
import { JourneyForm } from '../journey-form'

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [row] = await Promise.all([adminGetById('journey_steps', id), ])
  if (!row) notFound()

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Content' },
          { label: 'Journey', href: '/admin/content/journey' },
          { label: 'Edit' },
        ]}
      />
      <PageHeader title="Edit Journey Step" />
      <JourneyForm
        initial={row}
        
        onSubmit={updateItem.bind(null, id)}
        
      />
    </div>
  )
}
