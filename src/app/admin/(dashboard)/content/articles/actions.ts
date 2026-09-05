'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth/require-admin'
import {
  adminCreate,
  adminDelete,
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
  articleSchema,
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

    excerpt: String(
      formData.get('excerpt') || ''
    ).trim(),

    content: emptyToNull(
      String(formData.get('content') || '').trim()
    ),

    category: String(
      formData.get('category') || ''
    ).trim(),

    author_name: String(
      formData.get('author_name') || ''
    ).trim(),

    publication_date: String(
      formData.get('publication_date') || ''
    ).trim(),

    read_time: String(
      formData.get('read_time') || ''
    ).trim(),

    division_id: emptyToNull(
      String(formData.get('division_id') || '')
    ),

    image_url: emptyToNull(
      String(formData.get('image_url') || '').trim()
    ),

    is_featured: formBool(
      formData,
      'is_featured',
      false
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
      articleSchema,
      payload
    )

    if (!parsed.data) {
      return fail(
        parsed.error!,
        parsed.fieldErrors
      )
    }

    await adminCreate(
      'articles',
      parsed.data
    )

    revalidatePath(
      '/admin/content/articles'
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
      articleSchema,
      payload
    )

    if (!parsed.data) {
      return fail(
        parsed.error!,
        parsed.fieldErrors
      )
    }

    await adminUpdate(
      'articles',
      id,
      parsed.data
    )

    revalidatePath(
      '/admin/content/articles'
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
      'articles',
      id
    )

    revalidatePath(
      '/admin/content/articles'
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