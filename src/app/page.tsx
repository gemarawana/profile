import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Introduction } from '@/components/sections/Introduction'
import { Why } from '@/components/sections/Why'
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
  getImpactStatistics,
  getJourneySteps,
  getMemberStories,
  getOrganizationMembers,
  getSectionContents,
  getSiteSettings,
  getWhyCards,
} from '@/lib/dal'

type Link = { label: string; href: string }

export default async function Home() {
  const [
    heroSlides, whyCards, activities, journeySteps, galleryItems, memberStories,
    articles, impactStatistics, historyMilestones, organizationMembers, faqs,
    navLinks, footerNavigation, footerSocials, introImage, ctaImage, joinUrl,
    sectionContents,
  ] = await Promise.all([
    getHeroSlides(), getWhyCards(), getActivities(), getJourneySteps(), getGalleryItems(),
    getMemberStories(), getArticles(), getImpactStatistics(), getHistoryMilestones(),
    getOrganizationMembers(), getFaqs(), getSiteSettings('nav_links'),
    getSiteSettings('contact'), getSiteSettings('footer_socials'),
    getSiteSettings('intro_image'), getSiteSettings('cta_image'),
    getSiteSettings('join_url'), getSectionContents(),
  ])

  return (
    <div className="font-sans">
      <Navbar links={navLinks as Link[]} joinUrl={(joinUrl as string) || ''} />
      <main>
        <Hero slides={heroSlides} content={sectionContents.hero} />
        <Introduction imageUrl={(introImage as string) || ''} content={sectionContents.introduction} />
        <Why cards={whyCards} content={sectionContents.about} />
        <OurStory milestones={historyMilestones} content={sectionContents.our_story} />
        <Organization members={organizationMembers} content={sectionContents.organization} />
        <WhatWeDo activities={activities} content={sectionContents.activities} />
        <Journey steps={journeySteps} content={sectionContents.journey} />
        <Article articles={articles} content={sectionContents.articles} />
        <MemberStories stories={memberStories} content={sectionContents.stories} />
        <Impact statistics={impactStatistics} content={sectionContents.impact} />
        <GallerySection items={galleryItems} content={sectionContents.gallery} />
        <FAQ faqs={faqs} content={sectionContents.faq} />
        <Partners />
        <RecruitmentCTA
          backgroundImage={(ctaImage as string) || ''}
          joinUrl={(joinUrl as string) || ''}
          content={sectionContents.cta}
        />
      </main>
      <Footer navigation={footerNavigation as Link[]} socials={footerSocials as Link[]} />
      <ScrollToTop />
    </div>
  )
}
