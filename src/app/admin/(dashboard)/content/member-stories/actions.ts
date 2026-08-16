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
  memberStorySchema,
  type ActionResult,
} from '@/lib/validations/cms'

function payloadFromForm(formData: FormData) {
  return {
    name: String(
      formData.get('name') || ''
    ).trim(),

    batch: String(
      formData.get('batch') || ''
    ).trim(),

    quote: String(
      formData.get('quote') || ''
    ).trim(),

    full_story: emptyToNull(
      String(
        formData.get('full_story') || ''
      ).trim()
    ),

    image_url: emptyToNull(
      String(
        formData.get('image_url') || ''
      ).trim()
    ),

    order_index: Number(
      formData.get('order_index') || 0
    ),

    is_published: formBool(
      formData,
      'is_published',
      true
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
      memberStorySchema,
      payload
    )

    if (!parsed.data) {
      return fail(
        parsed.error!,
        parsed.fieldErrors
      )
    }

    await adminCreate(
      'member_stories',
      parsed.data
    )

    revalidatePath(
      '/admin/content/member-stories'
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
      memberStorySchema,
      payload
    )

    if (!parsed.data) {
      return fail(
        parsed.error!,
        parsed.fieldErrors
      )
    }

    await adminUpdate(
      'member_stories',
      id,
      parsed.data
    )

    revalidatePath(
      '/admin/content/member-stories'
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
      'member_stories',
      id
    )

    revalidatePath(
      '/admin/content/member-stories'
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
      'member_stories',
      id,
      direction
    )

    revalidatePath(
      '/admin/content/member-stories'
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