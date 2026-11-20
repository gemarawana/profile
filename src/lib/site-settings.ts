import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database.types'
import type { SiteSettingsKey } from '@/lib/constants/cms'
import { SITE_SETTINGS_KEYS } from '@/lib/constants/cms'
import { z } from 'zod'
import { navLinkSchema, themeColorSchema } from '@/lib/validations/cms'
import { revalidatePublic } from '@/lib/dal/admin'
import { DEFAULT_THEME_COLOR, normalizeThemeColor, type ThemeColorConfig } from '@/lib/theme'

export type NavLink = z.infer<typeof navLinkSchema>

type Json = Database['public']['Tables']['site_settings']['Row']['value']

export type TypedSiteSettings = {
  nav_links: NavLink[]
  contact: NavLink[]
  footer_socials: NavLink[]
  intro_image: string
  cta_image: string
  join_url: string
  theme_color: ThemeColorConfig
}

const DEFAULTS: TypedSiteSettings = {
  nav_links: [],
  contact: [],
  footer_socials: [],
  intro_image: '',
  cta_image: '',
  join_url: '',
  theme_color: { ...DEFAULT_THEME_COLOR },
}

function parseLinks(value: unknown): NavLink[] {
  const parsed = z.array(navLinkSchema).safeParse(value)

  return parsed.success ? parsed.data : []
}

export async function getTypedSiteSettings(): Promise<TypedSiteSettings> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('site_settings')
    .select('key, value')
    .in('key', [...SITE_SETTINGS_KEYS])

  if (error) {
    throw new Error(error.message)
  }

  const result: TypedSiteSettings = {
    ...DEFAULTS,
    theme_color: { ...DEFAULT_THEME_COLOR },
  }

  for (const row of data ?? []) {
    const key = row.key as SiteSettingsKey

    if (!SITE_SETTINGS_KEYS.includes(key)) {
      continue
    }

    if (key === 'intro_image' || key === 'cta_image' || key === 'join_url') {
      result[key] = typeof row.value === 'string'
        ? row.value
        : ''
    } else if (key === 'theme_color') {
      result.theme_color = normalizeThemeColor(row.value)
    } else {
      result[key] = parseLinks(row.value)
    }
  }

  return result
}

export async function updateSiteSetting(
  key: SiteSettingsKey,
  value: unknown
) {
  const supabase = await createClient()

  let jsonValue: Json

  if (key === 'intro_image' || key === 'cta_image' || key === 'join_url') {
    if (typeof value !== 'string') {
      throw new Error(`${key} must be a string`)
    }

    jsonValue = value
  } else if (key === 'theme_color') {
    jsonValue = themeColorSchema.parse(value) as Json
  } else {
    jsonValue = z.array(navLinkSchema).parse(value)
  }

  const { error } = await supabase
    .from('site_settings')
    .upsert(
      {
        key,
        value: jsonValue,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'key',
      }
    )

  if (error) {
    throw new Error(error.message)
  }

  revalidatePublic()
}

export async function updateAllSiteSettings(
  settings: TypedSiteSettings
) {
  for (const key of SITE_SETTINGS_KEYS) {
    await updateSiteSetting(key, settings[key])
  }
}
