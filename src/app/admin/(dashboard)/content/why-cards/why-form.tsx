'use client'

import { FormShell, TextField, TextAreaField, SelectField, CheckboxField } from '@/components/admin/FormFields'
import { WHY_CARD_ICONS } from '@/lib/constants/cms'
import type { Database } from '@/types/database.types'
import type { ActionResult } from '@/lib/validations/cms'

type Row = Database['public']['Tables']['why_cards']['Row']

export function WhyCardForm({
  initial,
  onSubmit,
}: {
  initial?: Row | null
  onSubmit: (formData: FormData) => Promise<ActionResult>
}) {
  return (
    <FormShell cancelHref="/admin/content/why-cards" onSubmit={onSubmit}>
      <TextField label="Title" name="title" defaultValue={initial?.title} required />
      <TextAreaField label="Description" name="desc_text" defaultValue={initial?.desc_text} required />
      <SelectField
        label="Icon"
        name="icon_name"
        defaultValue={initial?.icon_name ?? 'adventure'}
        options={WHY_CARD_ICONS.map(i => ({ value: i.value, label: i.label }))}
        required
      />
      <TextField label="Order" name="order_index" type="number" defaultValue={initial?.order_index ?? 0} />
      <CheckboxField label="Published" name="is_published" defaultChecked={initial?.is_published ?? true} />
    </FormShell>
  )
}
