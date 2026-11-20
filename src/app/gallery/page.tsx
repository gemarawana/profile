import { GallerySection } from '@/components/sections/GallerySection'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getGalleryItems, getSectionContents, getSiteSettings } from '@/lib/dal'

type Link = { label: string; href: string }

export default async function GalleryPage() {
  const [galleryItems, navLinks, footerNavigation, footerSocials, joinUrl, sectionContents] = await Promise.all([
    getGalleryItems(), getSiteSettings('nav_links'), getSiteSettings('contact'), getSiteSettings('footer_socials'),
    getSiteSettings('join_url'), getSectionContents(),
  ])
  return (
    <div className="font-sans" style={{ paddingTop: 'var(--navbar-h)' }}>
      <Navbar links={navLinks as Link[]} joinUrl={(joinUrl as string) || ''} />
      <main>
        <GallerySection items={galleryItems} content={sectionContents.gallery} />
      </main>
      <Footer navigation={footerNavigation as Link[]} socials={footerSocials as Link[]} />
    </div>
  )
}
