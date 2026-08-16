import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { createItem } from '../actions'
import { DivisionForm } from '../division-form'

export default function NewPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: 'Content' }, { label: 'Divisions', href: '/admin/content/divisions' }, { label: 'New' }]} />
      <PageHeader title="Add Division" />
      <DivisionForm onSubmit={createItem} />
    </div>
  )
}
