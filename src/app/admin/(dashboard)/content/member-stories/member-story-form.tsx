'use client'

import { FormShell, TextField, TextAreaField, CheckboxField } from '@/components/admin/FormFields'
import { ImageUploadField } from '@/components/admin/ImagePicker'
import type { Database } from '@/types/database.types'
import type { ActionResult } from '@/lib/validations/cms'

type Row = Database['public']['Tables']['member_stories']['Row']

export function MemberStoryForm({
  initial,

  onSubmit,

}: {
  initial?: Row | null

  onSubmit: (formData: FormData) => Promise<ActionResult>

}) {
  return (
    <FormShell cancelHref="/admin/content/member-stories" onSubmit={onSubmit}>
      <TextField label="Name" name="name" defaultValue={initial?.name} required />
      <TextField label="Batch" name="batch" defaultValue={initial?.batch} required />
      <TextAreaField label="Quote" name="quote" defaultValue={initial?.quote} required />
      <TextAreaField label="Full Story" name="full_story" defaultValue={initial?.full_story} rows={6} />
      <ImageUploadField
        name="image_url"
        value={initial?.image_url}
        folder='memberstory'
        required
      />
      <TextField label="Order" name="order_index" type="number" defaultValue={initial?.order_index ?? 0} />
      <CheckboxField label="Published" name="is_published" defaultChecked={initial?.is_published ?? true} />
    </FormShell>
  )
}
