'use client'

import { useState } from 'react'
import { FormShell, TextField, TextAreaField, SelectField, CheckboxField } from '@/components/admin/FormFields'
import { ImageUploadField } from '@/components/admin/ImagePicker'
import { Label } from '@/components/ui/input'
import { slugify } from '@/lib/utils'
import type { Database } from '@/types/database.types'
import type { ActionResult } from '@/lib/validations/cms'

type Row = Database['public']['Tables']['articles']['Row']

function toDateInput(value?: string | null) {
  if (!value) return ''
  return value.slice(0, 10)
}

export function ArticleForm({
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
    <FormShell cancelHref="/admin/content/articles" onSubmit={onSubmit}>
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
      <TextAreaField label="Excerpt" name="excerpt" defaultValue={initial?.excerpt} required />
      <TextAreaField label="Content" name="content" defaultValue={initial?.content} rows={8} />
      <TextField label="Category" name="category" defaultValue={initial?.category} required />
      <TextField label="Author" name="author_name" defaultValue={initial?.author_name} required />
      <TextField
        label="Publication Date"
        name="publication_date"
        type="date"
        defaultValue={toDateInput(initial?.publication_date)}
        required
      />
      <TextField label="Read Time" name="read_time" defaultValue={initial?.read_time} required placeholder="5 min" />
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
        folder='article'
        required
      />
      <CheckboxField label="Featured" name="is_featured" defaultChecked={initial?.is_featured ?? false} />
      <CheckboxField label="Published" name="is_published" defaultChecked={initial?.is_published ?? true} />
    </FormShell>
  )
}
