'use client'

import { FormShell, TextField, TextAreaField, CheckboxField } from '@/components/admin/FormFields'
import type { Database } from '@/types/database.types'
import type { ActionResult } from '@/lib/validations/cms'

type Row = Database['public']['Tables']['history_milestones']['Row']

export function HistoryForm({
  initial,
  onSubmit,
}: {
  initial?: Row | null
  onSubmit: (formData: FormData) => Promise<ActionResult>
}) {
  return (
    <FormShell cancelHref="/admin/content/history" onSubmit={onSubmit}>
      <TextField label="Year" name="year" defaultValue={initial?.year} required />
      <TextAreaField
        label="Event Description"
        name="event_description"
        defaultValue={initial?.event_description}
        required
      />
      <TextField label="Order" name="order_index" type="number" defaultValue={initial?.order_index ?? 0} />
      <CheckboxField label="Published" name="is_published" defaultChecked={initial?.is_published ?? true} />
    </FormShell>
  )
}
