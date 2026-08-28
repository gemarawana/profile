'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { TextField, TextAreaField, SelectField, CheckboxField } from '@/components/admin/FormFields'
import { ImageUploadField } from '@/components/admin/ImagePicker'
import { RichTextEditor } from '@/components/admin/RichTextEditor'
import { Label } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
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
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>()
  const [slug, setSlug] = useState(initial?.slug ?? '')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    setError(undefined)

    startTransition(async () => {
      try {
        const result = await onSubmit(formData)

        if (result.error) {
          setError(result.error)
          toast(result.error, 'error')
          return
        }

        toast(initial ? 'Artikel berhasil diperbarui' : 'Artikel berhasil dibuat')
        router.push('/admin/content/articles')
        router.refresh()
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Terjadi kesalahan saat menyimpan.'
        setError(message)
        toast(message, 'error')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Metadata & Settings (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Actions Bar */}
          <div className="top-4 z-30 rounded-2xl border border-[#E8E5E0] bg-white/95 p-4 shadow-sm backdrop-blur-md">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B5A5A]">
                  {initial ? 'Edit Artikel' : 'Artikel Baru'}
                </span>
                <p className="text-xs text-gray-500">Pastikan data tersimpan</p>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/admin/content/articles">
                  <Button type="button" variant="outline" size="sm" disabled={pending}>
                    Batal
                  </Button>
                </Link>
                <Button type="submit" size="sm" disabled={pending} className="min-w-[80px]">
                  {pending ? 'Menyimpan…' : 'Simpan'}
                </Button>
              </div>
            </div>

            {error && (
              <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700" role="alert">
                {error}
              </p>
            )}
          </div>

          {/* Card 1: Basic Info */}
          <div className="rounded-2xl border border-[#E8E5E0] bg-white p-5 md:p-6 shadow-sm space-y-4">
            <div className="border-b border-[#E8E5E0] pb-3 mb-2">
              <h3 className="font-bold text-sm text-[#1A0A0A] uppercase tracking-wider">Informasi Dasar</h3>
              <p className="text-xs text-[#6B5A5A]">Judul, tautan permanen, dan ringkasan artikel.</p>
            </div>

            <TextField
              label="Judul Artikel"
              name="title"
              defaultValue={initial?.title}
              required
              placeholder="Contoh: Ekspedisi Atap Jawa Barat Ciremai"
            />

            <div>
              <Label htmlFor="slug">Slug (Tautan URL)</Label>
              <input
                id="slug"
                name="slug"
                value={slug}
                onChange={e => setSlug(e.target.value)}
                required
                placeholder="ekspedisi-atap-jawa-barat"
                className="flex h-10 w-full rounded-lg border border-[#E8E5E0] bg-white px-3 py-2 text-sm text-[#1A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A1A]/30"
              />
              <button
                type="button"
                className="mt-1.5 text-xs font-bold text-[#8B1A1A] hover:underline inline-flex items-center gap-1"
                onClick={() => {
                  const titleInput = document.querySelector<HTMLInputElement>('input[name="title"]')
                  if (titleInput?.value) setSlug(slugify(titleInput.value))
                }}
              >
                ⚡ Buat otomatis dari judul
              </button>
            </div>

            <TextAreaField
              label="Ringkasan (Excerpt)"
              name="excerpt"
              defaultValue={initial?.excerpt}
              required
              rows={3}
            />
          </div>

          {/* Card 2: Taxonomy & Details */}
          <div className="rounded-2xl border border-[#E8E5E0] bg-white p-5 md:p-6 shadow-sm space-y-4">
            <div className="border-b border-[#E8E5E0] pb-3 mb-2">
              <h3 className="font-bold text-sm text-[#1A0A0A] uppercase tracking-wider">Taksonomi & Detail</h3>
              <p className="text-xs text-[#6B5A5A]">Kategori, divisi terkait, dan informasi penulis.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField
                label="Kategori"
                name="category"
                defaultValue={initial?.category}
                required
                placeholder="Ekspedisi, Konservasi..."
              />
              <TextField
                label="Waktu Baca"
                name="read_time"
                defaultValue={initial?.read_time}
                required
                placeholder="5 min"
              />
            </div>

            <SelectField
              label="Divisi Terkait"
              name="division_id"
              defaultValue={initial?.division_id}
              options={divisions}
              allowEmpty
              emptyLabel="— Tanpa Divisi Khusus —"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField
                label="Nama Penulis"
                name="author_name"
                defaultValue={initial?.author_name}
                required
                placeholder="Tim Gemarawana"
              />
              <TextField
                label="Tanggal Publikasi"
                name="publication_date"
                type="date"
                defaultValue={toDateInput(initial?.publication_date)}
                required
              />
            </div>
          </div>

          {/* Card 3: Media & Status */}
          <div className="rounded-2xl border border-[#E8E5E0] bg-white p-5 md:p-6 shadow-sm space-y-4">
            <div className="border-b border-[#E8E5E0] pb-3 mb-2">
              <h3 className="font-bold text-sm text-[#1A0A0A] uppercase tracking-wider">Media & Status</h3>
              <p className="text-xs text-[#6B5A5A]">Foto sampul dan status visibilitas artikel.</p>
            </div>

            <ImageUploadField
              name="image_url"
              label="Foto Sampul Artikel"
              value={initial?.image_url}
              folder="article"
              required
            />

            <div className="pt-2 border-t border-[#E8E5E0] space-y-3">
              <CheckboxField
                label="Jadikan Artikel Unggulan (Featured)"
                name="is_featured"
                defaultChecked={initial?.is_featured ?? false}
              />
              <CheckboxField
                label="Publikasikan Artikel (Published)"
                name="is_published"
                defaultChecked={initial?.is_published ?? true}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Immersive Rich Text Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <div>
              <Label className="text-sm font-black uppercase tracking-wider text-[#1A0A0A] mb-0">
                Konten Lengkap Artikel
              </Label>
              <p className="text-xs text-[#6B5A5A]">Gunakan editor visual untuk memformat artikel dengan leluasa.</p>
            </div>
          </div>

          {/* Dedicated Rich Text Editor Canvas */}
          <RichTextEditor
            name="content"
            defaultValue={initial?.content}
          />
        </div>
      </div>
    </form>
  )
}
