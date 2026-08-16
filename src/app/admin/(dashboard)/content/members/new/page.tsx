import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { adminGetDivisionsOptions } from '@/lib/dal/admin'

import { createItem } from '../actions'
import { MemberForm } from '../member-form'

export default async function NewPage() {
  const [divisions] = await Promise.all([ adminGetDivisionsOptions()])
  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Content' },
          { label: 'Members', href: '/admin/content/members' },
          { label: 'New' },
        ]}
      />
      <PageHeader title="Add Member" />
      <MemberForm
        
        divisions={divisions.map(d => ({ value: d.id, label: d.name }))}
        onSubmit={createItem}
        
      />
    </div>
  )
}
