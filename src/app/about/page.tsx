import { Introduction } from '@/components/sections/Introduction'
import { OurStory } from '@/components/sections/OurStory'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getHistoryMilestones, getImageUrls, getSiteSettings } from '@/lib/dal'

type Link = { label: string; href: string }

export default async function AboutPage() {
  const [milestones, navLinks, footerNavigation, footerSocials, imageUrls] = await Promise.all([
    getHistoryMilestones(), getSiteSettings('nav_links'), getSiteSettings('footer_nav_links'), getSiteSettings('footer_socials'),
    getImageUrls(),
  ])
  return (
    <div className="font-sans" style={{ paddingTop: 'var(--navbar-h)' }}>
      <Navbar links={navLinks as Link[]} />
      <main>
        <Introduction imageUrl={imageUrls.intro} />
        <OurStory milestones={milestones} />
      </main>
      <Footer navigation={footerNavigation as Link[]} socials={footerSocials as Link[]} />
    </div>
  )
}
