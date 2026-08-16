'use client'

import { FormShell, TextField, TextAreaField, CheckboxField } from '@/components/admin/FormFields'
import type { Database } from '@/types/database.types'
import type { ActionResult } from '@/lib/validations/cms'

type Row = Database['public']['Tables']['faqs']['Row']

export function FaqForm({
  initial,
  onSubmit,
}: {
  initial?: Row | null
  onSubmit: (formData: FormData) => Promise<ActionResult>
}) {
  return (
    <FormShell cancelHref="/admin/content/faq" onSubmit={onSubmit}>
      <TextField label="Question" name="question" defaultValue={initial?.question} required />
      <TextAreaField label="Answer" name="answer" defaultValue={initial?.answer} required rows={5} />
      <TextField label="Category" name="category" defaultValue={initial?.category ?? 'General'} required />
      <TextField label="Order" name="order_index" type="number" defaultValue={initial?.order_index ?? 0} />
      <CheckboxField label="Published" name="is_published" defaultChecked={initial?.is_published ?? true} />
    </FormShell>
  )
}
