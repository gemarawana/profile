'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth/require-admin'
import { fail, ok, parseForm } from '@/lib/admin-form'
import { updateAllSiteSettings } from '@/lib/site-settings'
import {
  siteSettingsSchema,
  type ActionResult,
} from '@/lib/validations/cms'

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

    const payload = {
      nav_links: parseJsonArray(
        String(
          formData.get('nav_links') || '[]'
        ),
        'nav_links'
      ),

      footer_nav_links: parseJsonArray(
        String(
          formData.get('footer_nav_links') || '[]'
        ),
        'footer_nav_links'
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
      footer_nav_links: parsed.data.footer_nav_links,
      footer_socials: parsed.data.footer_socials,
      intro_image: parsed.data.intro_image ?? '',
      cta_image: parsed.data.cta_image ?? '',
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