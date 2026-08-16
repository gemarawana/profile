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
  memberSchema,
  type ActionResult,
} from '@/lib/validations/cms'

async function payloadFromForm(formData: FormData) {
  return {
    name: String(formData.get('name') || ''),
    role: String(formData.get('role') || ''),
    batch: String(formData.get('batch') || ''),
    division_id: emptyToNull(
      String(formData.get('division_id') || '')
    ),
    image_url: emptyToNull(
      String(formData.get('image_url') || '')
    ),
    order_index: Number(
      formData.get('order_index') || 0
    ),
    is_active: formBool(
      formData,
      'is_active',
      true
    ),
  }
}

export async function createItem(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin()
    const payload = await payloadFromForm(formData);
    const parsed = parseForm(memberSchema, payload)
    if (!parsed.data) return fail(parsed.error!, parsed.fieldErrors)
    await adminCreate('organization_members', parsed.data)
    revalidatePath('/admin/content/members')
    return ok()
  } catch (e) {
    if (e && typeof e === 'object' && 'digest' in e) throw e
    return fail(e instanceof Error ? e.message : 'Create failed')
  }
}

export async function updateItem(id: string, formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin()
    const payload = await payloadFromForm(formData);
    const parsed = parseForm(memberSchema, payload)
    if (!parsed.data) return fail(parsed.error!, parsed.fieldErrors)
    await adminUpdate('organization_members', id, parsed.data)
    revalidatePath('/admin/content/members')
    return ok()
  } catch (e) {
    if (e && typeof e === 'object' && 'digest' in e) throw e
    return fail(e instanceof Error ? e.message : 'Update failed')
  }
}

export async function deleteItem(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await adminDelete('organization_members', id)
    revalidatePath('/admin/content/members')
    return ok()
  } catch (e) {
    if (e && typeof e === 'object' && 'digest' in e) throw e
    return fail(e instanceof Error ? e.message : 'Delete failed')
  }
}

export async function reorderItem(id: string, direction: 'up' | 'down'): Promise<ActionResult> {
  try {
    await requireAdmin()
    await adminReorder('organization_members', id, direction)
    revalidatePath('/admin/content/members')
    return ok()
  } catch (e) {
    if (e && typeof e === 'object' && 'digest' in e) throw e
    return fail(e instanceof Error ? e.message : 'Reorder failed')
  }
}
