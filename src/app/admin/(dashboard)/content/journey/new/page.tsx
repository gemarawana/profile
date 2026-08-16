import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'

import { createItem } from '../actions'
import { JourneyForm } from '../journey-form'

export default async function NewPage() {
  
  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Content' },
          { label: 'Journey', href: '/admin/content/journey' },
          { label: 'New' },
        ]}
      />
      <PageHeader title="Add Journey Step" />
      <JourneyForm  onSubmit={createItem}  />
    </div>
  )
}
