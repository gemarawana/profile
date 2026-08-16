'use client'

import { useState } from 'react'
import { FormShell, TextField, TextAreaField, SelectField, CheckboxField } from '@/components/admin/FormFields'
import { ImageUploadField } from '@/components/admin/ImagePicker'
import { Label } from '@/components/ui/input'
import { BENTO_SPAN_OPTIONS } from '@/lib/constants/cms'
import { slugify } from '@/lib/utils'
import type { Database } from '@/types/database.types'
import type { ActionResult } from '@/lib/validations/cms'

type Row = Database['public']['Tables']['activities']['Row']

export function ActivityForm({
  initial,

  divisions,
  onSubmit,

}: {
  initial?: Row | null

  divisions: { value: string; label: string }[]
  onSubmit: (formData: FormData) => Promise<ActionResult>

}) {
  const [slug, setSlug] = useState(initial?.slug ?? '')

  return (
    <FormShell cancelHref="/admin/content/activities" onSubmit={onSubmit}>
      <TextField label="Title" name="title" defaultValue={initial?.title} required />
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
              const titleInput = document.querySelector<HTMLInputElement>('input[name="title"]')
              if (titleInput?.value) setSlug(slugify(titleInput.value))
            }}
          >
            Generate from title
          </button>
        )}
      </div>
      <TextField label="Subtitle" name="subtitle" defaultValue={initial?.subtitle} required />
      <TextAreaField label="Description" name="description" defaultValue={initial?.description} />
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
        folder='activity'
        required
      />
      <SelectField
        label="Bento Span"
        name="bento_span"
        defaultValue={initial?.bento_span ?? 'normal'}
        options={BENTO_SPAN_OPTIONS.map(o => ({ value: o.value, label: o.label }))}
        required
      />
      <TextField label="Order" name="order_index" type="number" defaultValue={initial?.order_index ?? 0} />
      <CheckboxField label="Published" name="is_published" defaultChecked={initial?.is_published ?? true} />
    </FormShell>
  )
}
