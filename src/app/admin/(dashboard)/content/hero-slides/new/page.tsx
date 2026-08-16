import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'

import { createHeroSlide } from '../actions'
import { HeroSlideForm } from '../hero-form'

export default async function NewHeroSlidePage() {
  
  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Content' },
          { label: 'Hero Slides', href: '/admin/content/hero-slides' },
          { label: 'New' },
        ]}
      />
      <PageHeader title="Add Hero Slide" />
      <HeroSlideForm  onSubmit={createHeroSlide}  />
    </div>
  )
}
