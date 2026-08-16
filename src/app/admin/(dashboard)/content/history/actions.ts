'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth/require-admin'
import { adminCreate, adminDelete, adminReorder, adminUpdate } from '@/lib/dal/admin'
import { fail, formBool, ok, parseForm } from '@/lib/admin-form'
import { historyMilestoneSchema, type ActionResult } from '@/lib/validations/cms'

function payloadFromForm(formData: FormData) {
  return {
    year: String(formData.get('year') || ''),
    event_description: String(formData.get('event_description') || ''),
    order_index: Number(formData.get('order_index') || 0),
    is_published: formBool(formData, 'is_published', true),
  }
}

export async function createItem(formData: FormData): Promise<ActionResult> {
  await requireAdmin()
  const parsed = parseForm(historyMilestoneSchema, payloadFromForm(formData))
  if (!parsed.data) return fail(parsed.error!, parsed.fieldErrors)
  try {
    await adminCreate('history_milestones', parsed.data as never)
    revalidatePath('/admin/content/history')
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Create failed')
  }
}

export async function updateItem(id: string, formData: FormData): Promise<ActionResult> {
  await requireAdmin()
  const parsed = parseForm(historyMilestoneSchema, payloadFromForm(formData))
  if (!parsed.data) return fail(parsed.error!, parsed.fieldErrors)
  try {
    await adminUpdate('history_milestones', id, parsed.data as never)
    revalidatePath('/admin/content/history')
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Update failed')
  }
}

export async function deleteItem(id: string): Promise<ActionResult> {
  await requireAdmin()
  try {
    await adminDelete('history_milestones', id)
    revalidatePath('/admin/content/history')
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Delete failed')
  }
}

export async function reorderItem(id: string, direction: 'up' | 'down'): Promise<ActionResult> {
  await requireAdmin()
  try {
    await adminReorder('history_milestones', id, direction)
    revalidatePath('/admin/content/history')
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Reorder failed')
  }
}
