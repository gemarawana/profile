import { createClient } from '@/lib/supabase/server'
import type { SiteSettingsKey } from '@/lib/constants/cms'
import { SITE_SETTINGS_KEYS } from '@/lib/constants/cms'
import { z } from 'zod'
import { navLinkSchema } from '@/lib/validations/cms'
import { revalidatePublic } from '@/lib/dal/admin'

export type NavLink = z.infer<typeof navLinkSchema>

export type TypedSiteSettings = {
  nav_links: NavLink[]
  footer_nav_links: NavLink[]
  footer_socials: NavLink[]
  intro_image: string
  cta_image: string
}

const DEFAULTS: TypedSiteSettings = {
  nav_links: [],
  footer_nav_links: [],
  footer_socials: [],
  intro_image: '',
  cta_image: '',
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

  if (error) throw new Error(error.message)

  const result = { ...DEFAULTS }
  for (const row of data ?? []) {
    const key = row.key as SiteSettingsKey
    if (SITE_SETTINGS_KEYS.includes(key)) {
      if (key === 'intro_image' || key === 'cta_image') {
        result[key] = typeof row.value === 'string' ? row.value : ''
      } else {
        result[key] = parseLinks(row.value)
      }
    }
  }
  return result
}

export async function updateSiteSetting(key: SiteSettingsKey, value: unknown) {
  const supabase = await createClient()
  
  let jsonValue = value
  if (key !== 'intro_image' && key !== 'cta_image') {
    jsonValue = z.array(navLinkSchema).parse(value)
  }

  const { error } = await supabase.from('site_settings').upsert(
    {
      key,
      value: jsonValue as any,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'key' }
  )

  if (error) throw new Error(error.message)
  revalidatePublic()
}

export async function updateAllSiteSettings(settings: TypedSiteSettings) {
  for (const key of SITE_SETTINGS_KEYS) {
    await updateSiteSetting(key, settings[key])
  }
}
