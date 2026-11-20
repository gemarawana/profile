import { WhatWeDo } from '@/components/sections/WhatWeDo'
import { Article } from '@/components/sections/Article'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getActivities, getArticles, getSectionContents, getSiteSettings } from '@/lib/dal'

type Link = { label: string; href: string }

export default async function ActivitiesPage() {
  const [activities, articles, navLinks, footerNavigation, footerSocials, joinUrl, sectionContents] = await Promise.all([
    getActivities(), getArticles(), getSiteSettings('nav_links'), getSiteSettings('contact'), getSiteSettings('footer_socials'),
    getSiteSettings('join_url'), getSectionContents(),
  ])
  return (
    <div className="font-sans" style={{ paddingTop: 'var(--navbar-h)' }}>
      <Navbar links={navLinks as Link[]} joinUrl={(joinUrl as string) || ''} />
      <main>
        <WhatWeDo activities={activities} content={sectionContents.activities} />
        <Article articles={articles} content={sectionContents.articles} />
      </main>
      <Footer navigation={footerNavigation as Link[]} socials={footerSocials as Link[]} />
    </div>
  )
}
