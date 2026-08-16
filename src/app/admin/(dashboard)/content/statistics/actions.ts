'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth/require-admin'
import { adminCreate, adminDelete, adminReorder, adminUpdate } from '@/lib/dal/admin'
import { fail, ok, parseForm } from '@/lib/admin-form'
import { impactStatisticSchema, type ActionResult } from '@/lib/validations/cms'

function payloadFromForm(formData: FormData) {
  return {
    stat_key: String(formData.get('stat_key') || ''),
    stat_value: Number(formData.get('stat_value') || 0),
    stat_suffix: String(formData.get('stat_suffix') || '+'),
    label: String(formData.get('label') || ''),
    order_index: Number(formData.get('order_index') || 0),
  }
}

export async function createItem(formData: FormData): Promise<ActionResult> {
  await requireAdmin()
  const parsed = parseForm(impactStatisticSchema, payloadFromForm(formData))
  if (!parsed.data) return fail(parsed.error!, parsed.fieldErrors)
  try {
    await adminCreate('impact_statistics', parsed.data as never)
    revalidatePath('/admin/content/statistics')
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Create failed')
  }
}

export async function updateItem(id: string, formData: FormData): Promise<ActionResult> {
  await requireAdmin()
  const parsed = parseForm(impactStatisticSchema, payloadFromForm(formData))
  if (!parsed.data) return fail(parsed.error!, parsed.fieldErrors)
  try {
    await adminUpdate('impact_statistics', id, parsed.data as never)
    revalidatePath('/admin/content/statistics')
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Update failed')
  }
}

export async function deleteItem(id: string): Promise<ActionResult> {
  await requireAdmin()
  try {
    await adminDelete('impact_statistics', id)
    revalidatePath('/admin/content/statistics')
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Delete failed')
  }
}

export async function reorderItem(id: string, direction: 'up' | 'down'): Promise<ActionResult> {
  await requireAdmin()
  try {
    await adminReorder('impact_statistics', id, direction)
    revalidatePath('/admin/content/statistics')
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Reorder failed')
  }
}
