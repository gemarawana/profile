import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { createItem } from '../actions'
import { HistoryForm } from '../history-form'

export default function NewPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Content' },
          { label: 'History', href: '/admin/content/history' },
          { label: 'New' },
        ]}
      />
      <PageHeader title="Add Milestone" />
      <HistoryForm onSubmit={createItem} />
    </div>
  )
}
