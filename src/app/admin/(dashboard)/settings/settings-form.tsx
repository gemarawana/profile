'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, Link2, Globe, Mail, Save, UserPlus } from 'lucide-react'
import { ImageUploadField } from '@/components/admin/ImagePicker'
import { Input, Label } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import type { TypedSiteSettings, NavLink } from '@/lib/site-settings'
import type { ActionResult } from '@/lib/validations/cms'

function LinkRepeaterSection({
  title,
  description,
  icon: SectionIcon,
  name,
  items,
  setItems,
  addButtonLabel,
  labelPlaceholder,
  hrefPlaceholder,
}: {
  title: string
  description: string
  icon: React.ElementType
  name: string
  items: NavLink[]
  setItems: React.Dispatch<React.SetStateAction<NavLink[]>>
  addButtonLabel: string
  labelPlaceholder: string
  hrefPlaceholder: string
}) {
  function handleAdd() {
    setItems(prev => [...prev, { label: '', href: '' }])
  }

  function handleRemove(index: number) {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  function handleChange(index: number, field: 'label' | 'href', value: string) {
    setItems(prev =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    )
  }

  return (
    <div className="rounded-2xl border border-[#E8E5E0] bg-white p-5 md:p-6 shadow-2xs space-y-4">
      {/* Hidden input to pass stringified JSON to server action */}
      <input type="hidden" name={name} value={JSON.stringify(items)} />

      <div className="flex items-start justify-between border-b border-[#E8E5E0] pb-3 mb-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#8B1A1A]/10 text-[#8B1A1A]">
            <SectionIcon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-[#1A0A0A] uppercase tracking-wider">{title}</h3>
              <span className="inline-flex items-center rounded-full bg-[#FAF9F7] px-2.5 py-0.5 text-xs font-bold text-[#8B1A1A] border border-[#E8E5E0]">
                {items.length} item
              </span>
            </div>
            <p className="text-xs text-[#6B5A5A]">{description}</p>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#E8E5E0] bg-[#FAF9F7] p-8 text-center">
          <p className="text-xs font-medium text-gray-500">Belum ada item ditambahkan.</p>
          <p className="text-xs text-gray-400 mt-1">Klik tombol di bawah untuk menambah baris baru.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-xl border border-[#E8E5E0] bg-[#FAF9F7]/60 p-3 transition-colors hover:bg-white hover:border-[#8B1A1A]/30"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#E8E5E0] text-[11px] font-bold text-[#6B5A5A]">
                  {index + 1}
                </span>
                <span className="text-xs font-medium text-[#6B5A5A] sm:hidden">Item #{index + 1}</span>
              </div>

              <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <Label className="text-[10px] mb-1 sm:hidden">Nama Label</Label>
                  <Input
                    type="text"
                    value={item.label}
                    onChange={e => handleChange(index, 'label', e.target.value)}
                    placeholder={labelPlaceholder}
                    className="h-9 text-xs"
                    required
                  />
                </div>
                <div>
                  <Label className="text-[10px] mb-1 sm:hidden">Tautan / Href</Label>
                  <Input
                    type="text"
                    value={item.href}
                    onChange={e => handleChange(index, 'href', e.target.value)}
                    placeholder={hrefPlaceholder}
                    className="h-9 text-xs font-mono"
                    required
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRemove(index)}
                title="Hapus baris ini"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition-colors hover:bg-red-600 hover:text-white self-end sm:self-center"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="pt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAdd}
          className="w-full sm:w-auto border-dashed border-[#8B1A1A]/40 text-[#8B1A1A] hover:bg-[#8B1A1A]/5 hover:border-[#8B1A1A]"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          {addButtonLabel}
        </Button>
      </div>
    </div>
  )
}

export function SettingsForm({
  initial,
  onSubmit,
}: {
  initial: TypedSiteSettings
  onSubmit: (formData: FormData) => Promise<ActionResult>
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>()
  const [contacts, setContacts] = useState<NavLink[]>(initial.contact || [])
  const [socials, setSocials] = useState<NavLink[]>(initial.footer_socials || [])

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

        toast('Pengaturan berhasil disimpan')
        router.refresh()
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Terjadi kesalahan saat menyimpan.'
        setError(message)
        toast(message, 'error')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      {/* Preserved hidden input for nav_links to prevent data loss */}
      <input type="hidden" name="nav_links" value={JSON.stringify(initial.nav_links || [])} />

      {/* Action Bar */}
      <div className="top-4 z-20 flex items-center justify-between gap-3 rounded-2xl border border-[#E8E5E0] bg-white/95 p-4 shadow-2xs backdrop-blur-md">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#6B5A5A]">Pengaturan Website</span>
          <p className="text-xs text-gray-500">Kelola informasi kontak, sosial media, media utama, dan link pendaftaran.</p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin">
            <Button type="button" variant="outline" size="sm" disabled={pending}>
              Batal
            </Button>
          </Link>
          <Button type="submit" size="sm" disabled={pending} className="min-w-[130px]">
            <Save className="h-4 w-4 mr-1.5" />
            {pending ? 'Menyimpan…' : 'Simpan Pengaturan'}
          </Button>
        </div>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 p-4 text-xs font-medium text-red-700 border border-red-200" role="alert">
          {error}
        </p>
      )}

      {/* Section 1: Join / Recruitment Redirect URL */}
      <div className="rounded-2xl border border-[#E8E5E0] bg-white p-5 md:p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#E8E5E0] pb-3 mb-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#8B1A1A]/10 text-[#8B1A1A]">
            <UserPlus className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#1A0A0A] uppercase tracking-wider">Tautan Pendaftaran (Tombol Join)</h3>
            <p className="text-xs text-[#6B5A5A]">Tautan redirect untuk tombol JOIN di Navbar dan JOIN GEMARAWANA di bagian CTA.</p>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <Label htmlFor="join_url" className="text-xs font-semibold text-[#3A2A2A]">
            URL / Link Formulir Pendaftaran
          </Label>
          <Input
            id="join_url"
            name="join_url"
            type="text"
            defaultValue={initial.join_url}
            placeholder="Contoh: https://forms.gle/xyz atau /recruitment"
            className="text-xs font-mono"
          />
          <p className="text-[11px] text-[#6B5A5A]">
            Jika diisi, pengunjung yang mengklik tombol JOIN akan otomatis diarahkan ke tautan ini. Kosongkan jika ingin tetap menampilkan modal info pendaftaran.
          </p>
        </div>
      </div>

      {/* Section 2: Contact Information */}
      <LinkRepeaterSection
        title="Informasi Kontak (Footer)"
        description="Daftar tautan kontak dan surel/telepon yang ditampilkan di footer publik."
        icon={Mail}
        name="contact"
        items={contacts}
        setItems={setContacts}
        addButtonLabel="Tambah Kontak Baru"
        labelPlaceholder="Contoh: Email / Sekre / WhatsApp"
        hrefPlaceholder="Contoh: mailto:gemarawana25@gmail.com"
      />

      {/* Section 3: Social Media */}
      <LinkRepeaterSection
        title="Media Sosial (Footer)"
        description="Tautan ke akun media sosial resmi Gemarawana."
        icon={Globe}
        name="footer_socials"
        items={socials}
        setItems={setSocials}
        addButtonLabel="Tambah Media Sosial"
        labelPlaceholder="Contoh: Instagram / YouTube / TikTok"
        hrefPlaceholder="Contoh: https://instagram.com/gemarawana"
      />

      {/* Section 4: Site Images */}
      <div className="rounded-2xl border border-[#E8E5E0] bg-white p-5 md:p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#E8E5E0] pb-3 mb-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#8B1A1A]/10 text-[#8B1A1A]">
            <Link2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#1A0A0A] uppercase tracking-wider">Gambar Utama Website</h3>
            <p className="text-xs text-[#6B5A5A]">Unggah gambar untuk seksi pengenalan dan latar belakang recruitment CTA.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <ImageUploadField
            name="intro_image"
            label="Foto Profil Seksi Pengenalan (Intro Image)"
            value={initial.intro_image}
            folder="site"
          />
          <ImageUploadField
            name="cta_image"
            label="Latar Belakang Seksi Join (CTA Background)"
            value={initial.cta_image}
            folder="site"
          />
        </div>
      </div>
    </form>
  )
}
