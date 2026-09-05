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
  journeyStepSchema,
  type ActionResult,
} from '@/lib/validations/cms'

function payloadFromForm(formData: FormData) {
  return {
    step_number: String(
      formData.get('step_number') || ''
    ).trim(),

    title: String(
      formData.get('title') || ''
    ).trim(),

    description: String(
      formData.get('description') || ''
    ).trim(),

    image_url: String(
      formData.get('image_url') || ''
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
      journeyStepSchema,
      payload
    )

    if (!parsed.data) {
      return fail(
        parsed.error!,
        parsed.fieldErrors
      )
    }

    await adminCreate(
      'journey_steps',
      parsed.data
    )

    revalidatePath(
      '/admin/content/journey'
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
      journeyStepSchema,
      payload
    )

    if (!parsed.data) {
      return fail(
        parsed.error!,
        parsed.fieldErrors
      )
    }

    await adminUpdate(
      'journey_steps',
      id,
      parsed.data
    )

    revalidatePath(
      '/admin/content/journey'
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
      'journey_steps',
      id
    )

    revalidatePath(
      '/admin/content/journey'
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
      'journey_steps',
      id,
      direction
    )

    revalidatePath(
      '/admin/content/journey'
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