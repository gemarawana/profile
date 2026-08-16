import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { adminGetDivisionsOptions } from '@/lib/dal/admin'

import { createItem } from '../actions'
import { ActivityForm } from '../activity-form'

export default async function NewPage() {
  const [divisions] = await Promise.all([ adminGetDivisionsOptions()])
  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Content' },
          { label: 'Activities', href: '/admin/content/activities' },
          { label: 'New' },
        ]}
      />
      <PageHeader title="Add Activity" />
      <ActivityForm
        
        divisions={divisions.map(d => ({ value: d.id, label: d.name }))}
        onSubmit={createItem}
        
      />
    </div>
  )
}
