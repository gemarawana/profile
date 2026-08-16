'use client'

import { FormShell, TextField, TextAreaField, CheckboxField } from '@/components/admin/FormFields'
import { slugify } from '@/lib/utils'
import type { Database } from '@/types/database.types'
import type { ActionResult } from '@/lib/validations/cms'
import { useState } from 'react'
import { Label } from '@/components/ui/input'

type Row = Database['public']['Tables']['organization_divisions']['Row']

export function DivisionForm({
  initial,
  onSubmit,
}: {
  initial?: Row | null
  onSubmit: (formData: FormData) => Promise<ActionResult>
}) {
  const [slug, setSlug] = useState(initial?.slug ?? '')

  return (
    <FormShell cancelHref="/admin/content/divisions" onSubmit={onSubmit}>
      <TextField label="Name" name="name" defaultValue={initial?.name} required />
      <div>
        <Label htmlFor="slug">Slug</Label>
        <input
          id="slug"
          name="slug"
          value={slug}
          onChange={e => setSlug(e.target.value)}
          required
          className="flex h-10 w-full rounded-lg border border-[#E8E5E0] bg-white px-3 py-2 text-sm"
        />
        {!initial && (
          <button
            type="button"
            className="mt-1 text-xs text-[#8B1A1A]"
            onClick={() => {
              const nameInput = document.querySelector<HTMLInputElement>('input[name="name"]')
              if (nameInput?.value) setSlug(slugify(nameInput.value))
            }}
          >
            Generate from name
          </button>
        )}
      </div>
      <TextAreaField label="Description" name="description" defaultValue={initial?.description} />
      <TextField label="Order" name="order_index" type="number" defaultValue={initial?.order_index ?? 0} />
      <CheckboxField label="Published" name="is_published" defaultChecked={initial?.is_published ?? true} />
    </FormShell>
  )
}
