'use client'

import { useState } from 'react'
import { Type, RotateCcw } from 'lucide-react'
import { Input, Textarea, Label } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DEFAULT_SECTION_CONTENTS,
  SECTION_CONTENT_KEYS,
  SECTION_CONTENT_META,
  type SectionContentField,
  type SectionContentKey,
  type SectionContentsConfig,
} from '@/lib/section-contents'

const FIELD_CONFIG: Record<
  SectionContentField,
  { label: string; hint: string; multiline?: boolean; placeholder: string }
> = {
  badge: {
    label: 'Badge / Eyebrow',
    hint: 'Label kecil di atas judul section (kosongkan jika tidak ingin ditampilkan).',
    placeholder: 'Contoh: ABOUT US',
  },
  title: {
    label: 'Judul Utama',
    hint: 'Teks baris utama judul section.',
    placeholder: 'Masukkan judul utama',
  },
  title_highlight: {
    label: 'Highlight Judul',
    hint: 'Baris lanjutan judul yang tampil setelah jeda baris (kosongkan jika tidak diperlukan).',
    placeholder: 'Masukkan highlight judul (opsional)',
  },
  description: {
    label: 'Deskripsi / Subjudul',
    hint: 'Kalimat pengantar atau subjudul di bawah heading section.',
    multiline: true,
    placeholder: 'Masukkan deskripsi section (opsional)',
  },
  secondary_description: {
    label: 'Deskripsi Tambahan',
    hint: 'Paragraf kedua di bawah deskripsi utama pada bagian Introduction.',
    multiline: true,
    placeholder: 'Masukkan paragraf tambahan (opsional)',
  },
  button_text: {
    label: 'Teks Tombol CTA',
    hint: 'Label yang tampil pada tombol aksi utama section ini.',
    placeholder: 'Contoh: JOIN GEMARAWANA',
  },
  secondary_button_text: {
    label: 'Teks Tombol Sekunder',
    hint: 'Label pada tombol aksi kedua di sebelah tombol utama.',
    placeholder: 'Contoh: ASK US ANYTHING',
  },
}

const ACCENT_HIGHLIGHT_SECTIONS: ReadonlySet<SectionContentKey> = new Set([
  'hero',
  'impact',
  'cta',
])

/**
 * Tabbed copywriting editor for all 13 public sections inside /admin/settings.
 */
export function SectionContentsEditor({
  value,
  onChange,
}: {
  value: SectionContentsConfig
  onChange: (next: SectionContentsConfig) => void
}) {
  const [activeKey, setActiveKey] = useState<SectionContentKey>('hero')
  const meta = SECTION_CONTENT_META[activeKey]
  const currentSection = value[activeKey] as Record<string, string>

  function handleFieldChange(field: SectionContentField, nextText: string) {
    onChange({
      ...value,
      [activeKey]: {
        ...currentSection,
        [field]: nextText,
      },
    } as SectionContentsConfig)
  }

  function handleResetSection() {
    onChange({
      ...value,
      [activeKey]: { ...DEFAULT_SECTION_CONTENTS[activeKey] },
    } as SectionContentsConfig)
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E8E5E0] p-6 shadow-sm space-y-6">
      <input type="hidden" name="section_contents" value={JSON.stringify(value)} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E5E0] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-crimson/10 text-crimson">
            <Type className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-sm text-[#1A0A0A] uppercase tracking-wider">
                Konten Teks Section (Copywriting)
              </h3>
              <span className="inline-flex items-center rounded-full bg-[#FAF9F7] px-2.5 py-0.5 text-xs font-bold text-crimson border border-[#E8E5E0]">
                {meta.label}
              </span>
            </div>
            <p className="text-xs text-[#6B5A5A]">
              Ubah badge, judul, highlight judul, deskripsi, maupun teks tombol CTA di setiap section halaman publik.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleResetSection}
          className="self-start sm:self-auto"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Section Ini
        </Button>
      </div>

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Pilih section website">
        {SECTION_CONTENT_KEYS.map(key => {
          const isSelected = key === activeKey
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveKey(key)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'border-crimson bg-crimson text-white shadow-sm'
                  : 'border-[#E8E5E0] bg-[#FAF9F7] text-[#4A3B3B] hover:border-crimson/40 hover:text-crimson'
              }`}
            >
              {SECTION_CONTENT_META[key].label}
            </button>
          )
        })}
      </div>

      {/* Active Section Form */}
      <div
        role="tabpanel"
        aria-label={`Pengaturan konten ${meta.label}`}
        className="rounded-xl border border-[#E8E5E0] bg-[#FAF9F7]/60 p-5 space-y-4"
      >
        <div className="border-b border-[#E8E5E0] pb-3">
          <h4 className="text-sm font-bold text-[#1A0A0A]">{meta.label}</h4>
          <p className="text-xs text-[#6B5A5A] mt-0.5">{meta.hint}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {meta.fields.map(field => {
            const cfg = FIELD_CONFIG[field]
            const inputId = `section-${activeKey}-${field}`
            const fieldVal = currentSection[field] ?? ''
            const isFullWidth =
              cfg.multiline || field === 'badge' || (field === 'title' && activeKey === 'organization')
            const showAccentNote =
              field === 'title_highlight' && ACCENT_HIGHLIGHT_SECTIONS.has(activeKey)

            return (
              <div key={field} className={isFullWidth ? 'md:col-span-2 space-y-1.5' : 'space-y-1.5'}>
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor={inputId} className="mb-0 text-xs font-bold text-[#1A0A0A]">
                    {cfg.label}
                  </Label>
                  {showAccentNote && (
                    <span className="text-[11px] font-medium text-crimson">
                      Beraksen warna tema
                    </span>
                  )}
                </div>

                {cfg.multiline ? (
                  <Textarea
                    id={inputId}
                    rows={3}
                    value={fieldVal}
                    onChange={e => handleFieldChange(field, e.target.value)}
                    placeholder={cfg.placeholder}
                  />
                ) : (
                  <Input
                    id={inputId}
                    type="text"
                    value={fieldVal}
                    onChange={e => handleFieldChange(field, e.target.value)}
                    placeholder={cfg.placeholder}
                  />
                )}

                <p className="text-[11px] text-[#6B5A5A]">{cfg.hint}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
