'use client'

import { FormShell, TextField, TextAreaField, CheckboxField } from '@/components/admin/FormFields'
import { ImageUploadField } from '@/components/admin/ImagePicker'
import type { Database } from '@/types/database.types'
import type { ActionResult } from '@/lib/validations/cms'

type Row = Database['public']['Tables']['journey_steps']['Row']

export function JourneyForm({
  initial,

  onSubmit,

}: {
  initial?: Row | null

  onSubmit: (formData: FormData) => Promise<ActionResult>

}) {
  return (
    <FormShell cancelHref="/admin/content/journey" onSubmit={onSubmit}>
      <TextField label="Step Number" name="step_number" defaultValue={initial?.step_number} required />
      <TextField label="Title" name="title" defaultValue={initial?.title} required />
      <TextAreaField label="Description" name="description" defaultValue={initial?.description} required />
      <ImageUploadField
        name="image_url"
        value={initial?.image_url}
        folder='journey'
        required
      />
      <TextField label="Order" name="order_index" type="number" defaultValue={initial?.order_index ?? 0} />
      <CheckboxField label="Published" name="is_published" defaultChecked={initial?.is_published ?? true} />
    </FormShell>
  )
}
