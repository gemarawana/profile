import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { createItem } from '../actions'
import { FaqForm } from '../faq-form'

export default function NewPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Content' },
          { label: 'FAQ', href: '/admin/content/faq' },
          { label: 'New' },
        ]}
      />
      <PageHeader title="Add FAQ" />
      <FaqForm onSubmit={createItem} />
    </div>
  )
}
