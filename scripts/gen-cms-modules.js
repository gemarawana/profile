const fs = require('fs')
const path = require('path')
const root = path.join(__dirname, '../src/app/admin/(dashboard)')

function write(rel, content) {
  const p = path.join(root, rel)
  fs.mkdirSync(path.dirname(p), { recursive: true })
  fs.writeFileSync(p, content)
  console.log('wrote', rel)
}

function actionsFile({ table, route, schema, payloadBody, hasReorder = true, extraImports = '' }) {
  return `'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth/require-admin'
import { adminCreate, adminDelete, adminReorder, adminUpdate } from '@/lib/dal/admin'
import { emptyToNull, fail, formBool, ok, parseForm } from '@/lib/admin-form'
import { ${schema}, type ActionResult } from '@/lib/validations/cms'
${extraImports}
function payloadFromForm(formData: FormData) {
${payloadBody}
}

export async function createItem(formData: FormData): Promise<ActionResult> {
  await requireAdmin()
  const parsed = parseForm(${schema}, payloadFromForm(formData))
  if (!parsed.data) return fail(parsed.error!, parsed.fieldErrors)
  try {
    await adminCreate('${table}', parsed.data as never)
    revalidatePath('${route}')
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Create failed')
  }
}

export async function updateItem(id: string, formData: FormData): Promise<ActionResult> {
  await requireAdmin()
  const parsed = parseForm(${schema}, payloadFromForm(formData))
  if (!parsed.data) return fail(parsed.error!, parsed.fieldErrors)
  try {
    await adminUpdate('${table}', id, parsed.data as never)
    revalidatePath('${route}')
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Update failed')
  }
}

export async function deleteItem(id: string): Promise<ActionResult> {
  await requireAdmin()
  try {
    await adminDelete('${table}', id)
    revalidatePath('${route}')
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Delete failed')
  }
}
${
  hasReorder
    ? `
export async function reorderItem(id: string, direction: 'up' | 'down'): Promise<ActionResult> {
  await requireAdmin()
  try {
    await adminReorder('${table}', id, direction)
    revalidatePath('${route}')
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Reorder failed')
  }
}
`
    : ''
}`
}

function listPage({
  title,
  description,
  route,
  table,
  searchColumns,
  headers,
  rowCells,
  addLabel,
  hasReorder = true,
  labelField = 'title',
}) {
  return `import Link from 'next/link'
import { adminList } from '@/lib/dal/admin'
import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { DataTable, Pagination, RowActions, SearchBar } from '@/components/admin/DataTable'
import { OrderButtons } from '@/components/admin/OrderButtons'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { Button } from '@/components/ui/button'
import { deleteItem${hasReorder ? ', reorderItem' : ''} } from './actions'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const sp = await searchParams
  const page = Number(sp.page || 1)
  const { data, page: currentPage, totalPages } = await adminList('${table}', {
    search: sp.q,
    searchColumns: ${JSON.stringify(searchColumns)},
    page,
  })

  return (
    <div>
      <Breadcrumb items={[{ label: 'Content' }, { label: '${title}' }]} />
      <PageHeader
        title="${title}"
        description="${description}"
        actions={
          <Link href="${route}/new">
            <Button>+ ${addLabel}</Button>
          </Link>
        }
      />
      <div className="mb-4">
        <SearchBar defaultValue={sp.q} />
      </div>
      <DataTable headers={${JSON.stringify(headers)}} isEmpty={data.length === 0}>
        {data.map(row => (
          <tr key={row.id} className="border-b border-[#E8E5E0] last:border-0">
${rowCells}
            ${
              hasReorder
                ? `<td className="px-4 py-3">
              <OrderButtons
                onMoveUp={reorderItem.bind(null, row.id, 'up')}
                onMoveDown={reorderItem.bind(null, row.id, 'down')}
              />
            </td>`
                : ''
            }
            <td className="px-4 py-3">
              <RowActions
                editHref={\`${route}/\${row.id}\`}
                deleteLabel={String(row.${labelField})}
                onDelete={deleteItem.bind(null, row.id)}
              />
            </td>
          </tr>
        ))}
      </DataTable>
      <Pagination page={currentPage} totalPages={totalPages} />
    </div>
  )
}
`
}

function newPage({ title, route, formImport, formName, extraFetch = '', extraProps = '' }) {
  return `import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { createItem } from '../actions'
import { ${formName} } from '../${formImport}'
${extraFetch.includes('listPublishedImages') ? "import { listPublishedImages, uploadCmsImage } from '@/lib/dal/admin/images'" : ''}
${extraFetch.includes('adminGetDivisionsOptions') ? "import { adminGetDivisionsOptions } from '@/lib/dal/admin'" : ''}

export default async function NewPage() {
  ${extraFetch}
  return (
    <div>
      <Breadcrumb items={[{ label: 'Content' }, { label: '${title}', href: '${route}' }, { label: 'New' }]} />
      <PageHeader title="Add ${title.replace(/s$/, '')}" />
      <${formName} onSubmit={createItem}${extraProps} />
    </div>
  )
}
`
}

function editPage({ title, route, table, formImport, formName, extraFetch = '', extraProps = '' }) {
  return `import { notFound } from 'next/navigation'
import { adminGetById } from '@/lib/dal/admin'
import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { updateItem } from '../actions'
import { ${formName} } from '../${formImport}'
${extraFetch.includes('listPublishedImages') ? "import { listPublishedImages, uploadCmsImage } from '@/lib/dal/admin/images'" : ''}
${extraFetch.includes('adminGetDivisionsOptions') ? "import { adminGetDivisionsOptions } from '@/lib/dal/admin'" : ''}

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  ${extraFetch.replace('await listPublishedImages()', 'await Promise.all([adminGetById(\'' + table + '\', id), listPublishedImages()])').replace('await adminGetDivisionsOptions()', '/* divisions loaded below */')}
  const row = ${extraFetch.includes('listPublishedImages') && !extraFetch.includes('adminGetDivisionsOptions') ? 'null' : `await adminGetById('${table}', id)`}
  if (!row && false) notFound()
}
`
}

// ---------- WHY CARDS ----------
write(
  'content/why-cards/actions.ts',
  actionsFile({
    table: 'why_cards',
    route: '/admin/content/why-cards',
    schema: 'whyCardSchema',
    payloadBody: `  return {
    title: String(formData.get('title') || ''),
    desc_text: String(formData.get('desc_text') || ''),
    icon_name: String(formData.get('icon_name') || ''),
    order_index: Number(formData.get('order_index') || 0),
    is_published: formBool(formData, 'is_published', true),
  }`,
  })
)

write(
  'content/why-cards/why-form.tsx',
  `'use client'

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
`
)

write(
  'content/why-cards/page.tsx',
  listPage({
    title: 'Why Gemarawana',
    description: 'Manage why cards and icons.',
    route: '/admin/content/why-cards',
    table: 'why_cards',
    searchColumns: ['title', 'desc_text'],
    headers: ['Title', 'Icon', 'Order', 'Status', 'Reorder', 'Actions'],
    addLabel: 'Add Card',
    labelField: 'title',
    rowCells: `            <td className="px-4 py-3 font-medium">{row.title}</td>
            <td className="px-4 py-3">{row.icon_name}</td>
            <td className="px-4 py-3">{row.order_index}</td>
            <td className="px-4 py-3"><StatusBadge published={row.is_published} /></td>`,
  })
)

write(
  'content/why-cards/new/page.tsx',
  `import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { createItem } from '../actions'
import { WhyCardForm } from '../why-form'

export default function NewPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: 'Content' }, { label: 'Why Gemarawana', href: '/admin/content/why-cards' }, { label: 'New' }]} />
      <PageHeader title="Add Why Card" />
      <WhyCardForm onSubmit={createItem} />
    </div>
  )
}
`
)

write(
  'content/why-cards/[id]/page.tsx',
  `import { notFound } from 'next/navigation'
import { adminGetById } from '@/lib/dal/admin'
import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { updateItem } from '../actions'
import { WhyCardForm } from '../why-form'

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await adminGetById('why_cards', id)
  if (!row) notFound()
  return (
    <div>
      <Breadcrumb items={[{ label: 'Content' }, { label: 'Why Gemarawana', href: '/admin/content/why-cards' }, { label: 'Edit' }]} />
      <PageHeader title="Edit Why Card" />
      <WhyCardForm initial={row} onSubmit={updateItem.bind(null, id)} />
    </div>
  )
}
`
)

// ---------- DIVISIONS ----------
write(
  'content/divisions/actions.ts',
  actionsFile({
    table: 'organization_divisions',
    route: '/admin/content/divisions',
    schema: 'divisionSchema',
    payloadBody: `  return {
    name: String(formData.get('name') || ''),
    slug: String(formData.get('slug') || ''),
    description: emptyToNull(String(formData.get('description') || '')),
    order_index: Number(formData.get('order_index') || 0),
    is_published: formBool(formData, 'is_published', true),
  }`,
  })
)

write(
  'content/divisions/division-form.tsx',
  `'use client'

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
`
)

write(
  'content/divisions/page.tsx',
  listPage({
    title: 'Divisions',
    description: 'Manage organization divisions.',
    route: '/admin/content/divisions',
    table: 'organization_divisions',
    searchColumns: ['name', 'slug'],
    headers: ['Name', 'Slug', 'Order', 'Status', 'Reorder', 'Actions'],
    addLabel: 'Add Division',
    labelField: 'name',
    rowCells: `            <td className="px-4 py-3 font-medium">{row.name}</td>
            <td className="px-4 py-3 text-[#6B5A5A]">{row.slug}</td>
            <td className="px-4 py-3">{row.order_index}</td>
            <td className="px-4 py-3"><StatusBadge published={row.is_published} /></td>`,
  })
)

write(
  'content/divisions/new/page.tsx',
  `import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { createItem } from '../actions'
import { DivisionForm } from '../division-form'

export default function NewPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: 'Content' }, { label: 'Divisions', href: '/admin/content/divisions' }, { label: 'New' }]} />
      <PageHeader title="Add Division" />
      <DivisionForm onSubmit={createItem} />
    </div>
  )
}
`
)

write(
  'content/divisions/[id]/page.tsx',
  `import { notFound } from 'next/navigation'
import { adminGetById } from '@/lib/dal/admin'
import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { updateItem } from '../actions'
import { DivisionForm } from '../division-form'

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await adminGetById('organization_divisions', id)
  if (!row) notFound()
  return (
    <div>
      <Breadcrumb items={[{ label: 'Content' }, { label: 'Divisions', href: '/admin/content/divisions' }, { label: 'Edit' }]} />
      <PageHeader title="Edit Division" />
      <DivisionForm initial={row} onSubmit={updateItem.bind(null, id)} />
    </div>
  )
}
`
)

console.log('done batch 1')
