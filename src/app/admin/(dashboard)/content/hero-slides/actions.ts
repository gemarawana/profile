'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth/require-admin'
import {
  adminCreate,
  adminDelete,
  adminReorder,
  adminUpdate,
} from '@/lib/dal/admin'
import {
  fail,
  formBool,
  ok,
  parseForm,
} from '@/lib/admin-form'
import {
  heroSlideSchema,
  type ActionResult,
} from '@/lib/validations/cms'

async function payloadFromForm(formData: FormData) {
  return {
    label: String(formData.get('label') || ''),
    description: String(formData.get('description') || ''),
    image_url: String(formData.get('image_url') || ''),
    order_index: Number(
      formData.get('order_index') || 0
    ),
    is_published: formBool(
      formData,
      'is_published',
      false
    ),
  }
}

export async function createHeroSlide(
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdmin()

    const payload = await payloadFromForm(formData)

    const parsed = parseForm(
      heroSlideSchema,
      payload
    )

    if (!parsed.data) {
      return fail(
        parsed.error!,
        parsed.fieldErrors
      )
    }

    await adminCreate(
      'hero_slides',
      parsed.data
    )

    revalidatePath(
      '/admin/content/hero-slides'
    )

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
        : 'Create failed'
    )
  }
}

export async function updateHeroSlide(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdmin()

    const payload = await payloadFromForm(formData)

    const parsed = parseForm(
      heroSlideSchema,
      payload
    )

    if (!parsed.data) {
      return fail(
        parsed.error!,
        parsed.fieldErrors
      )
    }

    await adminUpdate(
      'hero_slides',
      id,
      parsed.data
    )

    revalidatePath(
      '/admin/content/hero-slides'
    )

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
        : 'Update failed'
    )
  }
}

export async function deleteHeroSlide(
  id: string
): Promise<ActionResult> {
  try {
    await requireAdmin()

    await adminDelete(
      'hero_slides',
      id
    )

    revalidatePath(
      '/admin/content/hero-slides'
    )

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
        : 'Delete failed'
    )
  }
}

export async function reorderHeroSlide(
  id: string,
  direction: 'up' | 'down'
): Promise<ActionResult> {
  try {
    await requireAdmin()

    await adminReorder(
      'hero_slides',
      id,
      direction
    )

    revalidatePath(
      '/admin/content/hero-slides'
    )

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
        : 'Reorder failed'
    )
  }
}