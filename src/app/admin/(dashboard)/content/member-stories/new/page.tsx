import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'

import { createItem } from '../actions'
import { MemberStoryForm } from '../member-story-form'

export default async function NewPage() {
  
  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Content' },
          { label: 'Member Stories', href: '/admin/content/member-stories' },
          { label: 'New' },
        ]}
      />
      <PageHeader title="Add Member Story" />
      <MemberStoryForm  onSubmit={createItem}  />
    </div>
  )
}
