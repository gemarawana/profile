import { Introduction } from '@/components/sections/Introduction'
import { OurStory } from '@/components/sections/OurStory'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getHistoryMilestones, getSiteSettings } from '@/lib/dal'

type Link = { label: string; href: string }

export default async function AboutPage() {
  const [milestones, navLinks, footerNavigation, footerSocials, introImage] = await Promise.all([
    getHistoryMilestones(), getSiteSettings('nav_links'), getSiteSettings('footer_nav_links'), getSiteSettings('footer_socials'),
    getSiteSettings('intro_image'),
  ])
  return (
    <div className="font-sans" style={{ paddingTop: 'var(--navbar-h)' }}>
      <Navbar links={navLinks as Link[]} />
      <main>
        <Introduction imageUrl={(introImage as string) || ''} />
        <OurStory milestones={milestones} />
      </main>
      <Footer navigation={footerNavigation as Link[]} socials={footerSocials as Link[]} />
    </div>
  )
}
