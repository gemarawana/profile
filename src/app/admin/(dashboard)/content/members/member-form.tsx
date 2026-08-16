'use client'

import { FormShell, TextField, SelectField, CheckboxField } from '@/components/admin/FormFields'
import { ImageUploadField } from '@/components/admin/ImagePicker'
import type { Database } from '@/types/database.types'
import type { ActionResult } from '@/lib/validations/cms'

type Row = Database['public']['Tables']['organization_members']['Row']

export function MemberForm({
  initial,

  divisions,
  onSubmit,

}: {
  initial?: Row | null

  divisions: { value: string; label: string }[]
  onSubmit: (formData: FormData) => Promise<ActionResult>

}) {
  return (
    <FormShell cancelHref="/admin/content/members" onSubmit={onSubmit}>
      <TextField label="Name" name="name" defaultValue={initial?.name} required />
      <TextField label="Role" name="role" defaultValue={initial?.role} required />
      <TextField label="Batch" name="batch" defaultValue={initial?.batch} required />
      <SelectField
        label="Division"
        name="division_id"
        defaultValue={initial?.division_id}
        options={divisions}
        allowEmpty
      />
      <ImageUploadField
        name="image_url"
        value={initial?.image_url}

        folder='organization'

        required
      />
      <TextField label="Order" name="order_index" type="number" defaultValue={initial?.order_index ?? 0} />
      <CheckboxField label="Active" name="is_active" defaultChecked={initial?.is_active ?? true} />
    </FormShell>
  )
}
