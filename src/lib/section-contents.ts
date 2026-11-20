export type HeroSectionContent = {
  title: string
  title_highlight: string
  description: string
}

export type StandardSectionContent = {
  badge: string
  title: string
  title_highlight: string
  description: string
}

export type IntroductionSectionContent = StandardSectionContent & {
  secondary_description: string
}

export type ButtonSectionContent = StandardSectionContent & {
  button_text: string
}

export type CtaSectionContent = ButtonSectionContent & {
  secondary_button_text: string
}

export type SectionContentsConfig = {
  hero: HeroSectionContent
  introduction: IntroductionSectionContent
  about: StandardSectionContent
  our_story: StandardSectionContent
  organization: StandardSectionContent
  activities: StandardSectionContent
  journey: StandardSectionContent
  articles: ButtonSectionContent
  stories: StandardSectionContent
  impact: StandardSectionContent
  gallery: ButtonSectionContent
  faq: StandardSectionContent
  cta: CtaSectionContent
}

export const SECTION_CONTENT_KEYS = [
  'hero',
  'introduction',
  'about',
  'our_story',
  'organization',
  'activities',
  'journey',
  'articles',
  'stories',
  'impact',
  'gallery',
  'faq',
  'cta',
] as const

export type SectionContentKey = (typeof SECTION_CONTENT_KEYS)[number]

export type SectionContentField =
  | 'badge'
  | 'title'
  | 'title_highlight'
  | 'description'
  | 'secondary_description'
  | 'button_text'
  | 'secondary_button_text'

export const SECTION_CONTENT_META: Record<
  SectionContentKey,
  {
    label: string
    hint: string
    fields: readonly SectionContentField[]
  }
> = {
  hero: {
    label: 'Hero',
    hint: 'Headline utama dan subjudul pada bagian paling atas beranda.',
    fields: ['title', 'title_highlight', 'description'],
  },
  introduction: {
    label: 'Introduction',
    hint: 'Bagian pengenalan "WHAT IS GEMARAWANA?" beserta dua paragraf pengantar.',
    fields: ['badge', 'title', 'title_highlight', 'description', 'secondary_description'],
  },
  about: {
    label: 'Why Gemarawana',
    hint: 'Alasan bergabung dengan Gemarawana ("WHY GEMARAWANA?").',
    fields: ['badge', 'title', 'title_highlight', 'description'],
  },
  our_story: {
    label: 'Our Story',
    hint: 'Heading untuk linimasa sejarah organisasi.',
    fields: ['badge', 'title', 'title_highlight', 'description'],
  },
  organization: {
    label: 'Organization',
    hint: 'Heading untuk daftar pengurus dan divisi organisasi.',
    fields: ['badge', 'title', 'title_highlight', 'description'],
  },
  activities: {
    label: 'What We Do',
    hint: 'Heading dan deskripsi bagian katalog kegiatan.',
    fields: ['badge', 'title', 'title_highlight', 'description'],
  },
  journey: {
    label: 'Journey',
    hint: 'Heading dan deskripsi bagian perjalanan anggota (section gelap).',
    fields: ['badge', 'title', 'title_highlight', 'description'],
  },
  articles: {
    label: 'Articles',
    hint: 'Heading, deskripsi, dan label tombol lihat semua artikel.',
    fields: ['badge', 'title', 'title_highlight', 'description', 'button_text'],
  },
  stories: {
    label: 'Member Stories',
    hint: 'Heading dan deskripsi bagian testimoni/cerita anggota.',
    fields: ['badge', 'title', 'title_highlight', 'description'],
  },
  impact: {
    label: 'Impact Statistics',
    hint: 'Badge, heading beraksen terang, dan deskripsi bagian statistik dampak.',
    fields: ['badge', 'title', 'title_highlight', 'description'],
  },
  gallery: {
    label: 'Gallery',
    hint: 'Heading, deskripsi, dan teks tombol muat lebih banyak foto.',
    fields: ['badge', 'title', 'title_highlight', 'description', 'button_text'],
  },
  faq: {
    label: 'FAQ',
    hint: 'Heading dan deskripsi bagian pertanyaan umum.',
    fields: ['badge', 'title', 'title_highlight', 'description'],
  },
  cta: {
    label: 'Recruitment CTA',
    hint: 'Ajakan bergabung dan label tombol utama maupun tombol tanya.',
    fields: ['badge', 'title', 'title_highlight', 'description', 'button_text', 'secondary_button_text'],
  },
}

export const DEFAULT_SECTION_CONTENTS: SectionContentsConfig = {
  hero: {
    title: 'GEMA',
    title_highlight: 'RAWANA.',
    description: 'Bangun Jiwa yang Berani, Setia pada Kawan, Tangguh Seperti Serigala.',
  },
  introduction: {
    badge: 'Mapala Telkom University — Since 2008',
    title: 'WHAT IS',
    title_highlight: 'GEMARAWANA?',
    description:
      'Gema Rawana merupakan wadah penggiat alam Universitas Telkom yang menjadi ruang untuk menjelajah, bertumbuh, dan membangun karakter melalui pengalaman di alam bebas.',
    secondary_description:
      'Berlandaskan kekeluargaan dan kode etik penggiat alam, kami membentuk pribadi yang tangguh, terampil, berintegritas, serta peduli terhadap alam dan sesama.',
  },
  about: {
    badge: 'The Difference',
    title: 'WHY',
    title_highlight: 'GEMARAWANA?',
    description: "Because the best lessons aren't always learned inside a classroom.",
  },
  our_story: {
    badge: 'History',
    title: 'OUR STORY',
    title_highlight: '',
    description: '',
  },
  organization: {
    badge: 'Leadership',
    title: 'MEET THE PEOPLE BEHIND GEMARAWANA',
    title_highlight: '',
    description: '',
  },
  activities: {
    badge: 'Activities',
    title: 'WHAT',
    title_highlight: 'WE DO',
    description: 'From learning the basics to standing on the summit.',
  },
  journey: {
    badge: 'The Path',
    title: 'YOUR JOURNEY',
    title_highlight: 'STARTS HERE.',
    description: 'Every journey begins step by step.',
  },
  articles: {
    badge: 'Journalism & Events',
    title: 'LATEST DISPATCHES',
    title_highlight: '& REPORTS',
    description: 'Expedition reports, activity updates, and news coverage from all Gemarawana divisions.',
    button_text: 'Lihat Berita Lainnya',
  },
  stories: {
    badge: 'People',
    title: 'THE PEOPLE BEHIND THE',
    title_highlight: 'JOURNEY.',
    description: '',
  },
  impact: {
    badge: '',
    title: 'BEYOND THE JOURNEY.',
    title_highlight: 'INTO THE IMPACT.',
    description: 'Explore the wild. Protect the earth. Empower humanity.',
  },
  gallery: {
    badge: 'Gallery',
    title: 'LIFE AT',
    title_highlight: 'GEMARAWANA',
    description: 'Not every great memory happens at the summit.',
    button_text: 'See More',
  },
  faq: {
    badge: 'FAQ',
    title: "CURIOUS? WE'VE GOT",
    title_highlight: 'ANSWERS.',
    description: '',
  },
  cta: {
    badge: 'Join Us',
    title: 'YOUR NEXT ADVENTURE',
    title_highlight: 'STARTS HERE.',
    description: 'No need to wait to be ready. Start your journey with Gemarawana.',
    button_text: 'JOIN GEMARAWANA',
    secondary_button_text: 'ASK US ANYTHING',
  },
}

/** Returns an isolated deep clone of all default section contents. */
export function cloneDefaultSectionContents(): SectionContentsConfig {
  return {
    hero: { ...DEFAULT_SECTION_CONTENTS.hero },
    introduction: { ...DEFAULT_SECTION_CONTENTS.introduction },
    about: { ...DEFAULT_SECTION_CONTENTS.about },
    our_story: { ...DEFAULT_SECTION_CONTENTS.our_story },
    organization: { ...DEFAULT_SECTION_CONTENTS.organization },
    activities: { ...DEFAULT_SECTION_CONTENTS.activities },
    journey: { ...DEFAULT_SECTION_CONTENTS.journey },
    articles: { ...DEFAULT_SECTION_CONTENTS.articles },
    stories: { ...DEFAULT_SECTION_CONTENTS.stories },
    impact: { ...DEFAULT_SECTION_CONTENTS.impact },
    gallery: { ...DEFAULT_SECTION_CONTENTS.gallery },
    faq: { ...DEFAULT_SECTION_CONTENTS.faq },
    cta: { ...DEFAULT_SECTION_CONTENTS.cta },
  }
}

function readOptionalString(source: Record<string, unknown>, key: string, fallback: string): string {
  const val = source[key]
  return typeof val === 'string' ? val : fallback
}

function readRequiredTitle(source: Record<string, unknown>, fallback: string): string {
  const val = source.title
  return typeof val === 'string' && val.trim().length > 0 ? val : fallback
}

function normalizeSection<T extends Record<string, string>>(
  rawSection: unknown,
  defaults: T
): T {
  if (!rawSection || typeof rawSection !== 'object' || Array.isArray(rawSection)) {
    return { ...defaults }
  }

  const record = rawSection as Record<string, unknown>
  const result: Record<string, string> = {}

  for (const field of Object.keys(defaults)) {
    result[field] =
      field === 'title'
        ? readRequiredTitle(record, defaults[field])
        : readOptionalString(record, field, defaults[field])
  }

  return result as T
}

/** Deep-merges partial/untrusted JSONB section_contents into safe typed defaults. */
export function normalizeSectionContents(value: unknown): SectionContentsConfig {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return cloneDefaultSectionContents()
  }

  const record = value as Record<string, unknown>
  const defaults = cloneDefaultSectionContents()

  return {
    hero: normalizeSection(record.hero, defaults.hero),
    introduction: normalizeSection(record.introduction, defaults.introduction),
    about: normalizeSection(record.about, defaults.about),
    our_story: normalizeSection(record.our_story, defaults.our_story),
    organization: normalizeSection(record.organization, defaults.organization),
    activities: normalizeSection(record.activities, defaults.activities),
    journey: normalizeSection(record.journey, defaults.journey),
    articles: normalizeSection(record.articles, defaults.articles),
    stories: normalizeSection(record.stories, defaults.stories),
    impact: normalizeSection(record.impact, defaults.impact),
    gallery: normalizeSection(record.gallery, defaults.gallery),
    faq: normalizeSection(record.faq, defaults.faq),
    cta: normalizeSection(record.cta, defaults.cta),
  }
}
