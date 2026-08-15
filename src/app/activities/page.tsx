import { WhatWeDo } from '@/components/sections/WhatWeDo'
import { Article } from '@/components/sections/Article'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getActivities, getArticles, getSiteSettings } from '@/lib/dal'

type Link = { label: string; href: string }

export default async function ActivitiesPage() {
  const [activities, articles, navLinks, footerNavigation, footerSocials] = await Promise.all([
    getActivities(), getArticles(), getSiteSettings('nav_links'), getSiteSettings('footer_nav_links'), getSiteSettings('footer_socials'),
  ])
  return (
    <div className="font-sans" style={{ paddingTop: 'var(--navbar-h)' }}>
      <Navbar links={navLinks as Link[]} />
      <main>
        <WhatWeDo activities={activities} />
        <Article articles={articles} />
      </main>
      <Footer navigation={footerNavigation as Link[]} socials={footerSocials as Link[]} />
    </div>
  )
}
