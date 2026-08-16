import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'

import { createItem } from '../actions'
import { GalleryForm } from '../gallery-form'

export default async function NewPage() {
  
  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Content' },
          { label: 'Gallery', href: '/admin/content/gallery' },
          { label: 'New' },
        ]}
      />
      <PageHeader title="Add Gallery Item" />
      <GalleryForm  onSubmit={createItem}  />
    </div>
  )
}
