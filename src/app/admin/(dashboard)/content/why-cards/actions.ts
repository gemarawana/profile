'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth/require-admin'
import { adminCreate, adminDelete, adminReorder, adminUpdate } from '@/lib/dal/admin'
import { emptyToNull, fail, formBool, ok, parseForm } from '@/lib/admin-form'
import { whyCardSchema, type ActionResult } from '@/lib/validations/cms'

function payloadFromForm(formData: FormData) {
  return {
    title: String(formData.get('title') || ''),
    desc_text: String(formData.get('desc_text') || ''),
    icon_name: String(formData.get('icon_name') || ''),
    order_index: Number(formData.get('order_index') || 0),
    is_published: formBool(formData, 'is_published', true),
  }
}

export async function createItem(formData: FormData): Promise<ActionResult> {
  await requireAdmin()
  const parsed = parseForm(whyCardSchema, payloadFromForm(formData))
  if (!parsed.data) return fail(parsed.error!, parsed.fieldErrors)
  try {
    await adminCreate('why_cards', parsed.data as never)
    revalidatePath('/admin/content/why-cards')
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Create failed')
  }
}

export async function updateItem(id: string, formData: FormData): Promise<ActionResult> {
  await requireAdmin()
  const parsed = parseForm(whyCardSchema, payloadFromForm(formData))
  if (!parsed.data) return fail(parsed.error!, parsed.fieldErrors)
  try {
    await adminUpdate('why_cards', id, parsed.data as never)
    revalidatePath('/admin/content/why-cards')
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Update failed')
  }
}

export async function deleteItem(id: string): Promise<ActionResult> {
  await requireAdmin()
  try {
    await adminDelete('why_cards', id)
    revalidatePath('/admin/content/why-cards')
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Delete failed')
  }
}

export async function reorderItem(id: string, direction: 'up' | 'down'): Promise<ActionResult> {
  await requireAdmin()
  try {
    await adminReorder('why_cards', id, direction)
    revalidatePath('/admin/content/why-cards')
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Reorder failed')
  }
}
