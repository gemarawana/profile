'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth/require-admin'
import { fail, ok, parseForm } from '@/lib/admin-form'
import { updateAllSiteSettings } from '@/lib/site-settings'
import {
  siteSettingsSchema,
  type ActionResult,
} from '@/lib/validations/cms'

import { formatRedirectUrl } from '@/lib/utils'

function parseJsonArray(
  raw: string,
  field: string
) {
  try {
    const value = JSON.parse(raw || '[]')

    if (!Array.isArray(value)) {
      throw new Error(
        `${field} must be a JSON array`
      )
    }

    return value
  } catch (e) {
    if (e instanceof SyntaxError) {
      throw new Error(
        `${field} is invalid JSON`
      )
    }

    throw e
  }
}

export async function saveSettings(
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdmin()

    const rawJoinUrl = String(formData.get('join_url') || '').trim()
    const normalizedJoinUrl = formatRedirectUrl(rawJoinUrl).href

    const payload = {
      nav_links: parseJsonArray(
        String(
          formData.get('nav_links') || '[]'
        ),
        'nav_links'
      ),

      contact: parseJsonArray(
        String(
          formData.get('contact') || '[]'
        ),
        'contact'
      ),

      footer_socials: parseJsonArray(
        String(
          formData.get('footer_socials') || '[]'
        ),
        'footer_socials'
      ),

      intro_image: String(
        formData.get('intro_image') || ''
      ).trim(),

      cta_image: String(
        formData.get('cta_image') || ''
      ).trim(),

      join_url: normalizedJoinUrl,
    }

    const parsed = parseForm(
      siteSettingsSchema,
      payload
    )

    if (!parsed.data) {
      return fail(
        parsed.error!,
        parsed.fieldErrors
      )
    }

    await updateAllSiteSettings({
      nav_links: parsed.data.nav_links,
      contact: parsed.data.contact,
      footer_socials: parsed.data.footer_socials,
      intro_image: parsed.data.intro_image ?? '',
      cta_image: parsed.data.cta_image ?? '',
      join_url: parsed.data.join_url ?? '',
    })
    revalidatePath('/admin/settings')

    return ok()
  } catch (e) {
    if (
      e &&
      typeof e === 'object' &&
      'digest' in e
    ) {
      throw e
    }

    return fail(
      e instanceof Error
        ? e.message
        : 'Save failed'
    )
  }
}