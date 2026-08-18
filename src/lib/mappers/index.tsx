import React from 'react'
import type { Database } from '@/types/database.types'
import { BENTO_SPAN_CLASS, type BentoSpan } from '@/lib/constants/cms'
import type {
  Activity,
  WhyCard,
  JourneyStep,
  GalleryItem,
  Story,
  NewsArticle,
  Leader,
  FAQItem,
  HistoryItem
} from '@/types'

// Map of why card icon names to their respective JSX SVGs
const WHY_CARD_ICONS: Record<string, React.ReactNode> = {
  adventure: (
    <div className="w-12 h-12 rounded-xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 flex items-center justify-center text-[#8B1A1A]">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 20h18L13 5l-3 5-2-3-5 13z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2 3" />
      </svg>
    </div>
  ),
  growth: (
    <div className="w-12 h-12 rounded-xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 flex items-center justify-center text-[#8B1A1A]">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-4 4m4-4l4 4M5 19h14" />
      </svg>
    </div>
  ),
  brotherhood: (
    <div className="w-12 h-12 rounded-xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 flex items-center justify-center text-[#8B1A1A]">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </div>
  ),
  memories: (
    <div className="w-12 h-12 rounded-xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 flex items-center justify-center text-[#8B1A1A]">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>
  ),
  networking: (
    <div className="w-12 h-12 rounded-xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 flex items-center justify-center text-[#8B1A1A]">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    </div>
  ),
  compass: (
    <div className="w-12 h-12 rounded-xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 flex items-center justify-center text-[#8B1A1A]">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.243 7.757l-2.121 6.364-6.364 2.121 2.121-6.364 6.364-2.121z" />
      </svg>
    </div>
  ),
}

export function mapHeroSlide(row: Database['public']['Tables']['hero_slides']['Row']) {
  return {
    label: row.label,
    desc: row.description,
    img: row.image_url,
  }
}

export function mapWhyCard(row: Database['public']['Tables']['why_cards']['Row']): WhyCard {
  return {
    icon: WHY_CARD_ICONS[row.icon_name] || WHY_CARD_ICONS.adventure,
    title: row.title,
    desc: row.desc_text,
  }
}

export function mapActivity(row: Database['public']['Tables']['activities']['Row']): Activity {
  const bentoSpan = row.bento_span as BentoSpan
  return {
    title: row.title,
    sub: row.subtitle,
    desc: row.description as string,
    img: row.image_url,
    bentoSpan: row.bento_span,
    bentoClass: BENTO_SPAN_CLASS[bentoSpan] ?? BENTO_SPAN_CLASS.normal,
  }
}

export function mapJourneyStep(row: Database['public']['Tables']['journey_steps']['Row']): JourneyStep {
  return {
    num: row.step_number,
    title: row.title,
    desc: row.description,
    imageUrl: row.image_url,
  }
}

export function mapGalleryItem(row: Database['public']['Tables']['gallery_items']['Row']): GalleryItem {
  return {
    img: row.image_url,
    className: row.grid_class,
    alt: row.alt_text,
  }
}

export function mapStory(row: Database['public']['Tables']['member_stories']['Row']): Story {
  return {
    quote: row.quote,
    name: row.name,
    batch: row.batch,
    img: row.image_url,
  }
}

export function mapArticle(row: Database['public']['Tables']['articles']['Row']): NewsArticle {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    date: row.publication_date,
    readTime: row.read_time,
    author: row.author_name,
    img: row.image_url,
    slug: row.slug,
    featured: row.is_featured,
  }
}

export type DbMemberWithDivision = Database['public']['Tables']['organization_members']['Row'] & {
  organization_divisions: Database['public']['Tables']['organization_divisions']['Row'] | null
}

export function mapLeader(row: DbMemberWithDivision): Leader {
  return {
    name: row.name,
    role: row.role,
    batch: row.batch,
    div: row.organization_divisions?.name || 'Executive',
    img: row.image_url,
  }
}

export function mapFAQ(row: Database['public']['Tables']['faqs']['Row']): FAQItem {
  return {
    q: row.question,
    a: row.answer,
  }
}

export function mapHistory(row: Database['public']['Tables']['history_milestones']['Row']): HistoryItem {
  return {
    year: row.year,
    event: row.event_description,
  }
}
