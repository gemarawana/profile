import { notFound } from 'next/navigation'
import { adminGetById, adminGetDivisionsOptions } from '@/lib/dal/admin'
import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'

import { updateItem } from '../actions'
import { ActivityForm } from '../activity-form'

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [row, divisions] = await Promise.all([
    adminGetById('activities', id),
    
    adminGetDivisionsOptions(),
  ])
  if (!row) notFound()

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Content' },
          { label: 'Activities', href: '/admin/content/activities' },
          { label: 'Edit' },
        ]}
      />
      <PageHeader title="Edit Activity" />
      <ActivityForm
        initial={row}
        
        divisions={divisions.map(d => ({ value: d.id, label: d.name }))}
        onSubmit={updateItem.bind(null, id)}
        
      />
    </div>
  )
}
