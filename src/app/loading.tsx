import { HeroSkeleton } from '@/components/ui/skeletons/HeroSkeleton'
import { IntroductionSkeleton } from '@/components/ui/skeletons/IntroductionSkeleton'
import { CardGridSkeleton } from '@/components/ui/skeletons/CardGridSkeleton'
import { GallerySkeleton } from '@/components/ui/skeletons/GallerySkeleton'
import { FeaturedArticleSkeleton } from '@/components/ui/skeletons/FeaturedArticleSkeleton'
import { ArticleCardSkeleton } from '@/components/ui/skeletons/ArticleCardSkeleton'
import { SectionHeaderSkeleton } from '@/components/ui/skeletons/SectionHeaderSkeleton'
import { Section } from '@/components/ui/Section'
import { C } from '@/lib/constants'

export default function RootLoading() {
  return (
    <div className="font-sans min-h-screen bg-neutral-50">
      {/* 1. Hero Section */}
      <HeroSkeleton />

      {/* 2. Introduction Section */}
      <IntroductionSkeleton />

      {/* 3. Why Gemarawana */}
      <CardGridSkeleton
        count={6}
        columns={3}
        variant="feature"
        background={C.lightGray}
        headerAlign="between"
      />

      {/* 4. Organization */}
      <CardGridSkeleton
        count={4}
        columns={4}
        variant="portrait"
        background={C.crimsonDeep}
        isDark={true}
        headerAlign="between"
      />

      {/* 5. What We Do */}
      <CardGridSkeleton
        count={6}
        columns={3}
        variant="tall"
        background={C.white}
        headerAlign="between"
      />

      {/* 6. Article Section */}
      <Section style={{ background: C.lightGray }}>
        <SectionHeaderSkeleton align="center" />
        <div className="flex flex-col gap-8">
          <FeaturedArticleSkeleton />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* 7. Member Stories */}
      <CardGridSkeleton
        count={3}
        columns={3}
        variant="portrait"
        background={C.white}
        headerAlign="between"
      />

      {/* 8. Gallery Section */}
      <GallerySkeleton count={8} />
    </div>
  )
}
