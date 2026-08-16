import { notFound } from 'next/navigation'
import { adminGetById } from '@/lib/dal/admin'
import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'

import { updateItem } from '../actions'
import { MemberStoryForm } from '../member-story-form'

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [row] = await Promise.all([adminGetById('member_stories', id), ])
  if (!row) notFound()

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Content' },
          { label: 'Member Stories', href: '/admin/content/member-stories' },
          { label: 'Edit' },
        ]}
      />
      <PageHeader title="Edit Member Story" />
      <MemberStoryForm
        initial={row}
        
        onSubmit={updateItem.bind(null, id)}
        
      />
    </div>
  )
}
