import { RecruitmentCTA } from '@/components/sections/RecruitmentCTA'
import { FAQ } from '@/components/sections/FAQ'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getFaqs, getImageUrls, getSiteSettings } from '@/lib/dal'

type Link = { label: string; href: string }

export default async function RecruitmentPage() {
  const [faqs, navLinks, footerNavigation, footerSocials, imageUrls] = await Promise.all([
    getFaqs(), getSiteSettings('nav_links'), getSiteSettings('footer_nav_links'), getSiteSettings('footer_socials'),
    getImageUrls(),
  ])
  return (
    <div className="font-sans" style={{ paddingTop: 'var(--navbar-h)' }}>
      <Navbar links={navLinks as Link[]} />
      <main>
        <RecruitmentCTA backgroundImage={imageUrls.ctaBg} />
        <FAQ faqs={faqs} />
      </main>
      <Footer navigation={footerNavigation as Link[]} socials={footerSocials as Link[]} />
    </div>
  )
}
