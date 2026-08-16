import { notFound } from 'next/navigation'
import { adminGetById } from '@/lib/dal/admin'
import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'

import { updateHeroSlide } from '../actions'
import { HeroSlideForm } from '../hero-form'

export default async function EditHeroSlidePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [row] = await Promise.all([adminGetById('hero_slides', id), ])
  if (!row) notFound()

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Content' },
          { label: 'Hero Slides', href: '/admin/content/hero-slides' },
          { label: 'Edit' },
        ]}
      />
      <PageHeader title="Edit Hero Slide" />
      <HeroSlideForm
        initial={row}
        
        onSubmit={updateHeroSlide.bind(null, id)}
        
      />
    </div>
  )
}
