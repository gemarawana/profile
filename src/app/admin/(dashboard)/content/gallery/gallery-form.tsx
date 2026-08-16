'use client'

import { FormShell, TextField, SelectField, CheckboxField } from '@/components/admin/FormFields'
import { ImageUploadField } from '@/components/admin/ImagePicker'
import { GALLERY_GRID_PRESETS } from '@/lib/constants/cms'
import type { Database } from '@/types/database.types'
import type { ActionResult } from '@/lib/validations/cms'

type Row = Database['public']['Tables']['gallery_items']['Row']

export function GalleryForm({
  initial,

  onSubmit,

}: {
  initial?: Row | null

  onSubmit: (formData: FormData) => Promise<ActionResult>

}) {
  return (
    <FormShell cancelHref="/admin/content/gallery" onSubmit={onSubmit}>
      <ImageUploadField
        name="image_url"
        value={initial?.image_url}
        folder='gallery'
        required
      />
      <TextField label="Alt Text" name="alt_text" defaultValue={initial?.alt_text} required />
      <SelectField
        label="Grid Class"
        name="grid_class"
        defaultValue={initial?.grid_class ?? 'col-span-1 row-span-1'}
        options={GALLERY_GRID_PRESETS.map(o => ({ value: o.value, label: o.label }))}
        required
      />
      <TextField label="Order" name="order_index" type="number" defaultValue={initial?.order_index ?? 0} />
      <CheckboxField label="Published" name="is_published" defaultChecked={initial?.is_published ?? true} />
    </FormShell>
  )
}
