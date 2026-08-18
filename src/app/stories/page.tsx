import { MemberStories } from '@/components/sections/MemberStories'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getMemberStories, getSiteSettings } from '@/lib/dal'

type Link = { label: string; href: string }

export default async function StoriesPage() {
  const [stories, navLinks, footerNavigation, footerSocials] = await Promise.all([
    getMemberStories(), getSiteSettings('nav_links'), getSiteSettings('contact'), getSiteSettings('footer_socials'),
  ])
  return (
    <div className="font-sans" style={{ paddingTop: 'var(--navbar-h)' }}>
      <Navbar links={navLinks as Link[]} />
      <main>
        <MemberStories stories={stories} />
      </main>
      <Footer navigation={footerNavigation as Link[]} socials={footerSocials as Link[]} />
    </div>
  )
}
