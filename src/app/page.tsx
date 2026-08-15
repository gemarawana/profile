import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Introduction } from '@/components/sections/Introduction'
import { WhyGemarawana } from '@/components/sections/WhyGemarawana'
import { WhatWeDo } from '@/components/sections/WhatWeDo'
import { Journey } from '@/components/sections/Journey'
import { GallerySection } from '@/components/sections/GallerySection'
import { MemberStories } from '@/components/sections/MemberStories'
import { Article } from '@/components/sections/Article'
import { Impact } from '@/components/sections/Impact'
import { OurStory } from '@/components/sections/OurStory'
import { Organization } from '@/components/sections/Organization'
import { FAQ } from '@/components/sections/FAQ'
import { RecruitmentCTA } from '@/components/sections/RecruitmentCTA'
import { Partners } from '@/components/sections/Partners'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/common/ScrollToTop'
import {
  getActivities,
  getArticles,
  getFaqs,
  getGalleryItems,
  getHeroSlides,
  getHistoryMilestones,
  getImageUrls,
  getImpactStatistics,
  getJourneySteps,
  getMemberStories,
  getOrganizationMembers,
  getSiteSettings,
  getWhyCards,
} from '@/lib/dal'

type Link = { label: string; href: string }

export default async function Home() {
  const [
    heroSlides, whyCards, activities, journeySteps, galleryItems, memberStories,
    articles, impactStatistics, historyMilestones, organizationMembers, faqs,
    navLinks, footerNavigation, footerSocials, imageUrls,
  ] = await Promise.all([
    getHeroSlides(), getWhyCards(), getActivities(), getJourneySteps(), getGalleryItems(),
    getMemberStories(), getArticles(), getImpactStatistics(), getHistoryMilestones(),
    getOrganizationMembers(), getFaqs(), getSiteSettings('nav_links'),
    getSiteSettings('footer_nav_links'), getSiteSettings('footer_socials'),
    getImageUrls(),
  ])

  return (
    <div className="font-sans">
      <Navbar links={navLinks as Link[]} />
      <main>
        <Hero slides={heroSlides} />
        <Introduction imageUrl={imageUrls.intro} />
        <WhyGemarawana cards={whyCards} />
        <OurStory milestones={historyMilestones} />
        <Organization members={organizationMembers} />
        <WhatWeDo activities={activities} />
        <Journey steps={journeySteps} />
        <Article articles={articles} />
        <MemberStories stories={memberStories} />
        <Impact statistics={impactStatistics} />
        <GallerySection items={galleryItems} />
        <FAQ faqs={faqs} />
        <Partners />
        <RecruitmentCTA backgroundImage={imageUrls.ctaBg} />
      </main>
      <Footer navigation={footerNavigation as Link[]} socials={footerSocials as Link[]} />
      <ScrollToTop />
    </div>
  )
}
