'use client'

import { FormShell, TextField } from '@/components/admin/FormFields'
import type { Database } from '@/types/database.types'
import type { ActionResult } from '@/lib/validations/cms'

type Row = Database['public']['Tables']['impact_statistics']['Row']

export function StatisticForm({
  initial,
  onSubmit,
}: {
  initial?: Row | null
  onSubmit: (formData: FormData) => Promise<ActionResult>
}) {
  return (
    <FormShell cancelHref="/admin/content/statistics" onSubmit={onSubmit}>
      <TextField
        label="Stat Key"
        name="stat_key"
        defaultValue={initial?.stat_key}
        required
        placeholder="members_count"
      />
      <TextField label="Value" name="stat_value" type="number" defaultValue={initial?.stat_value ?? 0} required />
      <TextField label="Suffix" name="stat_suffix" defaultValue={initial?.stat_suffix ?? '+'} />
      <TextField label="Label" name="label" defaultValue={initial?.label} required />
      <TextField label="Order" name="order_index" type="number" defaultValue={initial?.order_index ?? 0} />
    </FormShell>
  )
}
