import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { createItem } from '../actions'
import { WhyCardForm } from '../why-form'

export default function NewPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: 'Content' }, { label: 'Why Gemarawana', href: '/admin/content/why-cards' }, { label: 'New' }]} />
      <PageHeader title="Add Why Card" />
      <WhyCardForm onSubmit={createItem} />
    </div>
  )
}
