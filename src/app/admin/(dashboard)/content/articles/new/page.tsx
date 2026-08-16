import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { adminGetDivisionsOptions } from '@/lib/dal/admin'

import { createItem } from '../actions'
import { ArticleForm } from '../article-form'

export default async function NewPage() {
  const [divisions] = await Promise.all([ adminGetDivisionsOptions()])
  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Content' },
          { label: 'Articles', href: '/admin/content/articles' },
          { label: 'New' },
        ]}
      />
      <PageHeader title="Add Article" />
      <ArticleForm
        
        divisions={divisions.map(d => ({ value: d.id, label: d.name }))}
        onSubmit={createItem}
        
      />
    </div>
  )
}
