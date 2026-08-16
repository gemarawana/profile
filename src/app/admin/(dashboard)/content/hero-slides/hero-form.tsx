'use client'

import { FormShell, TextField, TextAreaField, CheckboxField } from '@/components/admin/FormFields'
import { ImageUploadField } from '@/components/admin/ImagePicker'
import type { Database } from '@/types/database.types'
import type { ActionResult } from '@/lib/validations/cms'

type HeroSlide = Database['public']['Tables']['hero_slides']['Row']

export function HeroSlideForm({
  initial,

  onSubmit,

}: {
  initial?: HeroSlide | null

  onSubmit: (formData: FormData) => Promise<ActionResult>

}) {
  return (
    <FormShell cancelHref="/admin/content/hero-slides" onSubmit={onSubmit}>
      <TextField label="Label" name="label" defaultValue={initial?.label} required />
      <TextAreaField label="Description" name="description" defaultValue={initial?.description} required />
      <ImageUploadField
        name="image_url"
        value={initial?.image_url}
        folder='hero'

        required
      />
      <TextField label="Order" name="order_index" type="number" defaultValue={initial?.order_index ?? 0} />
      <CheckboxField label="Published" name="is_published" defaultChecked={initial?.is_published ?? true} />
    </FormShell>
  )
}
