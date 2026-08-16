import { RecruitmentCTA } from '@/components/sections/RecruitmentCTA'
import { FAQ } from '@/components/sections/FAQ'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings } from '@/lib/dal'

type Link = { label: string; href: string }

export default async function RecruitmentPage() {
  const [faqs, navLinks, footerNavigation, footerSocials, ctaImage] = await Promise.all([
    getFaqs(), getSiteSettings('nav_links'), getSiteSettings('footer_nav_links'), getSiteSettings('footer_socials'),
    getSiteSettings('cta_image'),
  ])
  return (
    <div className="font-sans" style={{ paddingTop: 'var(--navbar-h)' }}>
      <Navbar links={navLinks as Link[]} />
      <main>
        <RecruitmentCTA backgroundImage={(ctaImage as string) || ''} />
        <FAQ faqs={faqs} />
      </main>
      <Footer navigation={footerNavigation as Link[]} socials={footerSocials as Link[]} />
    </div>
  )
}
