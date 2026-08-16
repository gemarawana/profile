'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth/require-admin'
import { adminCreate, adminDelete, adminReorder, adminUpdate } from '@/lib/dal/admin'
import { emptyToNull, fail, formBool, ok, parseForm } from '@/lib/admin-form'
import { divisionSchema, type ActionResult } from '@/lib/validations/cms'

function payloadFromForm(formData: FormData) {
  return {
    name: String(formData.get('name') || ''),
    slug: String(formData.get('slug') || ''),
    description: emptyToNull(String(formData.get('description') || '')),
    order_index: Number(formData.get('order_index') || 0),
    is_published: formBool(formData, 'is_published', true),
  }
}

export async function createItem(formData: FormData): Promise<ActionResult> {
  await requireAdmin()
  const parsed = parseForm(divisionSchema, payloadFromForm(formData))
  if (!parsed.data) return fail(parsed.error!, parsed.fieldErrors)
  try {
    await adminCreate('organization_divisions', parsed.data as never)
    revalidatePath('/admin/content/divisions')
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Create failed')
  }
}

export async function updateItem(id: string, formData: FormData): Promise<ActionResult> {
  await requireAdmin()
  const parsed = parseForm(divisionSchema, payloadFromForm(formData))
  if (!parsed.data) return fail(parsed.error!, parsed.fieldErrors)
  try {
    await adminUpdate('organization_divisions', id, parsed.data as never)
    revalidatePath('/admin/content/divisions')
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Update failed')
  }
}

export async function deleteItem(id: string): Promise<ActionResult> {
  await requireAdmin()
  try {
    await adminDelete('organization_divisions', id)
    revalidatePath('/admin/content/divisions')
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Delete failed')
  }
}

export async function reorderItem(id: string, direction: 'up' | 'down'): Promise<ActionResult> {
  await requireAdmin()
  try {
    await adminReorder('organization_divisions', id, direction)
    revalidatePath('/admin/content/divisions')
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Reorder failed')
  }
}
