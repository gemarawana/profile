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
  galleryItemSchema,
  type ActionResult,
} from '@/lib/validations/cms'

function payloadFromForm(formData: FormData) {
  return {
    image_url: String(
      formData.get('image_url') || ''
    ).trim(),

    alt_text: String(
      formData.get('alt_text') || ''
    ).trim(),

    grid_class: String(
      formData.get('grid_class') ||
      'col-span-1 row-span-1'
    ).trim(),

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

export async function createItem(
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdmin()

    const payload = payloadFromForm(formData)

    const parsed = parseForm(
      galleryItemSchema,
      payload
    )

    if (!parsed.data) {
      return fail(
        parsed.error!,
        parsed.fieldErrors
      )
    }

    await adminCreate(
      'gallery_items',
      parsed.data
    )

    revalidatePath(
      '/admin/content/gallery'
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

export async function updateItem(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdmin()

    const payload = payloadFromForm(formData)

    const parsed = parseForm(
      galleryItemSchema,
      payload
    )

    if (!parsed.data) {
      return fail(
        parsed.error!,
        parsed.fieldErrors
      )
    }

    await adminUpdate(
      'gallery_items',
      id,
      parsed.data
    )

    revalidatePath(
      '/admin/content/gallery'
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

export async function deleteItem(
  id: string
): Promise<ActionResult> {
  try {
    await requireAdmin()

    await adminDelete(
      'gallery_items',
      id
    )

    revalidatePath(
      '/admin/content/gallery'
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

export async function reorderItem(
  id: string,
  direction: 'up' | 'down'
): Promise<ActionResult> {
  try {
    await requireAdmin()

    await adminReorder(
      'gallery_items',
      id,
      direction
    )

    revalidatePath(
      '/admin/content/gallery'
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