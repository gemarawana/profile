import { z } from 'zod'
import { BENTO_SPAN_OPTIONS, GALLERY_GRID_PRESETS, WHY_CARD_ICONS } from '@/lib/constants/cms'
import { HEX_COLOR_REGEX } from '@/lib/theme'

const whyIconValues = WHY_CARD_ICONS.map(i => i.value) as [string, ...string[]]
const bentoValues = BENTO_SPAN_OPTIONS.map(i => i.value) as [string, ...string[]]
const gridValues = GALLERY_GRID_PRESETS.map(i => i.value) as [string, ...string[]]

export const heroSlideSchema = z.object({
  label: z.string().min(1).max(255),
  description: z.string().min(1),
  image_url: z.string().url(),
  order_index: z.coerce.number().int().min(0).default(0),
  is_published: z.coerce.boolean().default(true),
})

export const whyCardSchema = z.object({
  title: z.string().min(1).max(255),
  desc_text: z.string().min(1),
  icon_name: z.enum(whyIconValues),
  order_index: z.coerce.number().int().min(0).default(0),
  is_published: z.coerce.boolean().default(true),
})

export const divisionSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug'),
  description: z.string().optional().nullable(),
  order_index: z.coerce.number().int().min(0).default(0),
  is_published: z.coerce.boolean().default(true),
})

export const memberSchema = z.object({
  name: z.string().min(1).max(255),
  role: z.string().min(1).max(255),
  batch: z.string().min(1).max(255),
  division_id: z.string().uuid().optional().nullable().or(z.literal('')),
  image_url: z.string().url(),
  order_index: z.coerce.number().int().min(0).default(0),
  is_active: z.coerce.boolean().default(true),
})

export const activitySchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug'),
  subtitle: z.string().min(1),
  description: z.string().optional().nullable(),
  division_id: z.string().uuid().optional().nullable().or(z.literal('')),
  image_url: z.string().url(),
  bento_span: z.enum(bentoValues).default('normal'),
  order_index: z.coerce.number().int().min(0).default(0),
  is_published: z.coerce.boolean().default(true),
})

export const journeyStepSchema = z.object({
  step_number: z.string().min(1).max(10),
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  image_url: z.string().url(),
  order_index: z.coerce.number().int().min(0).default(0),
  is_published: z.coerce.boolean().default(true),
})

export const galleryItemSchema = z.object({
  image_url: z.string().url(),
  alt_text: z.string().min(1).max(255),
  grid_class: z.enum(gridValues).default('col-span-1 row-span-1'),
  order_index: z.coerce.number().int().min(0).default(0),
  is_published: z.coerce.boolean().default(true),
})

export const memberStorySchema = z.object({
  name: z.string().min(1).max(255),
  batch: z.string().min(1).max(255),
  quote: z.string().min(1),
  full_story: z.string().optional().nullable(),
  image_url: z.string().url(),
  order_index: z.coerce.number().int().min(0).default(0),
  is_published: z.coerce.boolean().default(true),
})

export const articleSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug'),
  excerpt: z.string().min(1),
  content: z.string().optional().nullable(),
  category: z.string().min(1).max(255),
  author_name: z.string().min(1).max(255),
  publication_date: z.string().min(1),
  read_time: z.string().min(1).max(50),
  division_id: z.string().uuid().optional().nullable().or(z.literal('')),
  image_url: z.string().url(),
  is_featured: z.coerce.boolean().default(false),
  is_published: z.coerce.boolean().default(true),
})

export const historyMilestoneSchema = z.object({
  year: z.string().min(1).max(10),
  event_description: z.string().min(1),
  order_index: z.coerce.number().int().min(0).default(0),
  is_published: z.coerce.boolean().default(true),
})

export const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  category: z.string().min(1).max(255).default('General'),
  order_index: z.coerce.number().int().min(0).default(0),
  is_published: z.coerce.boolean().default(true),
})

export const impactStatisticSchema = z.object({
  stat_key: z.string().min(1).max(255).regex(/^[a-z0-9_]+$/, 'Use lowercase snake_case'),
  stat_value: z.coerce.number().int(),
  stat_suffix: z.string().max(50).default('+'),
  label: z.string().min(1).max(255),
  order_index: z.coerce.number().int().min(0).default(0),
})

export const imageAssetSchema = z.object({
  asset_key: z.string().min(1).max(255).regex(/^[a-zA-Z0-9_-]+$/, 'Invalid asset key'),
  image_url: z.string().url(),
  alt_text: z.string().max(255).optional().nullable(),
  is_published: z.coerce.boolean().default(true),
})

export const navLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
})

export const themeColorSchema = z.object({
  primary: z
    .string()
    .trim()
    .regex(HEX_COLOR_REGEX, 'Format warna Primary harus hex 6 digit (contoh: #8B1D1D)')
    .transform(v => v.toUpperCase()),
  primary_hover: z
    .string()
    .trim()
    .regex(HEX_COLOR_REGEX, 'Format warna Primary Hover harus hex 6 digit (contoh: #6E1515)')
    .transform(v => v.toUpperCase()),
  primary_light: z
    .string()
    .trim()
    .regex(HEX_COLOR_REGEX, 'Format warna Primary Light harus hex 6 digit (contoh: #FDF2F2)')
    .transform(v => v.toUpperCase()),
  preset_name: z.string().trim().min(1, 'Nama preset wajib diisi').max(100),
})

export const siteSettingsSchema = z.object({
  nav_links: z.array(navLinkSchema),
  contact: z.array(navLinkSchema),
  footer_socials: z.array(navLinkSchema),
  intro_image: z.string().optional(),
  cta_image: z.string().optional(),
  join_url: z.string().optional(),
  theme_color: themeColorSchema,
})

export type ActionResult = {
  success?: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
}
