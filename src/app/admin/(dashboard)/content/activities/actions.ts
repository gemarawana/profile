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
  emptyToNull,
  fail,
  formBool,
  ok,
  parseForm,
} from '@/lib/admin-form'
import {
  activitySchema,
  type ActionResult,
} from '@/lib/validations/cms'

function payloadFromForm(formData: FormData) {
  return {
    title: String(
      formData.get('title') || ''
    ).trim(),

    slug: String(
      formData.get('slug') || ''
    ).trim(),

    subtitle: String(
      formData.get('subtitle') || ''
    ).trim(),

    description: emptyToNull(
      String(
        formData.get('description') || ''
      ).trim()
    ),

    division_id: emptyToNull(
      String(
        formData.get('division_id') || ''
      ).trim()
    ),

    image_url: emptyToNull(
      String(
        formData.get('image_url') || ''
      ).trim()
    ),

    bento_span: String(
      formData.get('bento_span') || 'normal'
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
      activitySchema,
      payload
    )

    if (!parsed.data) {
      return fail(
        parsed.error!,
        parsed.fieldErrors
      )
    }

    await adminCreate(
      'activities',
      parsed.data
    )

    revalidatePath(
      '/admin/content/activities'
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
      activitySchema,
      payload
    )

    if (!parsed.data) {
      return fail(
        parsed.error!,
        parsed.fieldErrors
      )
    }

    await adminUpdate(
      'activities',
      id,
      parsed.data
    )

    revalidatePath(
      '/admin/content/activities'
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
      'activities',
      id
    )

    revalidatePath(
      '/admin/content/activities'
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
      'activities',
      id,
      direction
    )

    revalidatePath(
      '/admin/content/activities'
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