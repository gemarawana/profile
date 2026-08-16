import { notFound } from 'next/navigation'
import { adminGetById } from '@/lib/dal/admin'
import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'

import { updateItem } from '../actions'
import { GalleryForm } from '../gallery-form'

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [row] = await Promise.all([adminGetById('gallery_items', id), ])
  if (!row) notFound()

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Content' },
          { label: 'Gallery', href: '/admin/content/gallery' },
          { label: 'Edit' },
        ]}
      />
      <PageHeader title="Edit Gallery Item" />
      <GalleryForm
        initial={row}
        
        onSubmit={updateItem.bind(null, id)}
        
      />
    </div>
  )
}
