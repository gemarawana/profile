export interface Activity {
  title: string
  sub: string
  desc: string
  img: string
  bentoSpan?: string
  bentoClass?: string
}

export interface HeroSlide {
  label: string
  img: string
  desc: string
}

export interface ImpactStatistic {
  value: number
  label: string
  suffix?: string
}

export interface WhyCard {
  icon: React.ReactNode
  title: string
  desc: string
}

export interface JourneyStep {
  num: string
  title: string
  desc: string
  imageUrl: string
}

export interface GalleryItem {
  img: string
  className: string
  alt: string
}

export interface Story {
  quote: string
  name: string
  batch: string
  img: string
}

export interface Expedition {
  mountain: string
  year: string
  img: string
  large: boolean
}

export interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content?: string | null
  category: string
  date: string
  readTime: string
  author: string
  img: string
  slug: string
  featured?: boolean
}

export interface Leader {
  name: string
  role: string
  batch: string
  div: string
  img: string
}

export interface FAQItem {
  q: string
  a: string
}

export interface HistoryItem {
  year: string
  event: string
}
