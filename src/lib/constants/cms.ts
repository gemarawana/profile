export const WHY_CARD_ICONS = [
  { value: 'adventure', label: 'Adventure' },
  { value: 'growth', label: 'Personal Growth' },
  { value: 'brotherhood', label: 'Brotherhood' },
  { value: 'memories', label: 'Memories' },
  { value: 'networking', label: 'Networking' },
  { value: 'compass', label: 'Skill Mastery / Compass' },
] as const

export type WhyCardIconName = (typeof WHY_CARD_ICONS)[number]['value']

export const BENTO_SPAN_OPTIONS = [
  { value: 'normal', label: 'Normal' },
  { value: 'large-left', label: 'Large Left' },
  { value: 'middle-top', label: 'Middle Top' },
  { value: 'middle-bottom', label: 'Middle Bottom' },
  { value: 'right-top', label: 'Right Top' },
  { value: 'wide-bottom', label: 'Wide Bottom' },
] as const

export type BentoSpan = (typeof BENTO_SPAN_OPTIONS)[number]['value']

export const BENTO_SPAN_CLASS: Record<BentoSpan, string> = {
  normal: '',
  'large-left': 'sm:col-span-2 md:col-span-1 md:row-span-2',
  'middle-top': '',
  'middle-bottom': '',
  'right-top': '',
  'wide-bottom': 'sm:col-span-2 md:col-span-1 md:row-span-1',
}

export const GALLERY_GRID_PRESETS = [
  { value: 'col-span-1 row-span-1', label: '1×1 (Normal)' },
  { value: 'col-span-2 row-span-1', label: '2×1 (Wide)' },
  { value: 'col-span-1 row-span-2', label: '1×2 (Tall)' },
] as const

export type GalleryGridClass = (typeof GALLERY_GRID_PRESETS)[number]['value']

export const SITE_SETTINGS_KEYS = ['nav_links', 'contact', 'footer_socials', 'intro_image', 'cta_image', 'join_url'] as const
export type SiteSettingsKey = (typeof SITE_SETTINGS_KEYS)[number]

export const ADMIN_NAV = [
  {
    title: 'Dashboard',
    href: '/admin',
  },
  {
    title: 'Content',
    items: [
      { title: 'Hero Slides', href: '/admin/content/hero-slides' },
      { title: 'Why Gemarawana', href: '/admin/content/why-cards' },
      { title: 'Divisions', href: '/admin/content/divisions' },
      { title: 'Members', href: '/admin/content/members' },
      { title: 'Activities', href: '/admin/content/activities' },
      { title: 'Journey', href: '/admin/content/journey' },
      { title: 'Gallery', href: '/admin/content/gallery' },
      { title: 'Member Stories', href: '/admin/content/member-stories' },
      { title: 'Articles', href: '/admin/content/articles' },
      { title: 'History', href: '/admin/content/history' },
      { title: 'FAQ', href: '/admin/content/faq' },
      { title: 'Impact Statistics', href: '/admin/content/statistics' },
    ],
  },

  {
    title: 'Settings',
    items: [{ title: 'Site Settings', href: '/admin/settings' }],
  },
] as const

export const PUBLIC_REVALIDATE_PATHS = ['/', '/about', '/activities', '/gallery', '/stories', '/recruitment'] as const
