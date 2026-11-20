'use client'

import { Palette, RotateCcw, Check } from 'lucide-react'
import { Input, Label } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DEFAULT_THEME_COLOR,
  THEME_PRESETS,
  deriveDarkThemeTokens,
  isValidHexColor,
  type ThemeColorConfig,
} from '@/lib/theme'

interface ColorInputRowProps {
  id: string
  label: string
  hint: string
  value: string
  fallbackValue: string
  onChange: (nextHex: string) => void
}

/**
 * Paired native color picker and 6-digit hex text input for a single theme token.
 */
function ColorInputRow({ id, label, hint, value, fallbackValue, onChange }: ColorInputRowProps) {
  // Native <input type="color"> requires a valid 6-digit hex value at all times while typing.
  const safePickerValue = isValidHexColor(value) ? value : fallbackValue

  return (
    <div className="rounded-xl border border-[#E8E5E0] bg-[#FAF9F7]/70 p-3.5 space-y-2">
      <div>
        <Label htmlFor={id} className="mb-0.5 text-[11px] font-bold text-[#1A0A0A]">
          {label}
        </Label>
        <p className="text-[11px] text-[#6B5A5A]">{hint}</p>
      </div>

      <div className="flex items-center gap-2.5">
        <input
          type="color"
          aria-label={`Color picker ${label}`}
          value={safePickerValue}
          onChange={e => onChange(e.target.value.toUpperCase())}
          className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border border-[#E8E5E0] bg-white p-1"
        />
        <Input
          id={id}
          type="text"
          value={value}
          onChange={e => {
            const cleaned = e.target.value.trim().replace(/[^0-9A-Fa-f]/g, '').slice(0, 6).toUpperCase()
            onChange(cleaned ? `#${cleaned}` : '')
          }}
          placeholder="#8B1D1D"
          maxLength={7}
          className="h-10 font-mono text-xs uppercase"
          required
        />
      </div>
    </div>
  )
}

function matchesPreset(
  theme: Pick<ThemeColorConfig, 'primary' | 'primary_hover' | 'primary_light'>,
  preset: ThemeColorConfig
) {
  return (
    theme.primary.toUpperCase() === preset.primary.toUpperCase() &&
    theme.primary_hover.toUpperCase() === preset.primary_hover.toUpperCase() &&
    theme.primary_light.toUpperCase() === preset.primary_light.toUpperCase()
  )
}

/**
 * Interactive theme color selector with recommended presets, custom hex inputs, and live preview.
 */
export function ThemeColorPicker({
  value,
  onChange,
}: {
  value: ThemeColorConfig
  onChange: (next: ThemeColorConfig) => void
}) {
  function handlePresetSelect(preset: ThemeColorConfig) {
    onChange({ ...preset })
  }

  function handleCustomFieldChange(field: 'primary' | 'primary_hover' | 'primary_light', hex: string) {
    const next = { ...value, [field]: hex }
    const matchedPreset = THEME_PRESETS.find(preset => matchesPreset(next, preset))
    onChange({
      ...next,
      preset_name: matchedPreset ? matchedPreset.preset_name : 'Custom',
    })
  }

  function handleReset() {
    onChange({ ...DEFAULT_THEME_COLOR })
  }

  const previewPrimary = isValidHexColor(value.primary) ? value.primary : DEFAULT_THEME_COLOR.primary
  const previewHover = isValidHexColor(value.primary_hover)
    ? value.primary_hover
    : DEFAULT_THEME_COLOR.primary_hover
  const previewLight = isValidHexColor(value.primary_light)
    ? value.primary_light
    : DEFAULT_THEME_COLOR.primary_light
  const darkPreview = deriveDarkThemeTokens(previewPrimary)

  return (
    <div className="rounded-2xl border border-[#E8E5E0] bg-white p-5 md:p-6 shadow-2xs space-y-5">
      <input type="hidden" name="theme_color" value={JSON.stringify(value)} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E5E0] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-crimson/10 text-crimson">
            <Palette className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-[#1A0A0A] uppercase tracking-wider">
                Tema Warna Website
              </h3>
              <span className="inline-flex items-center rounded-full bg-[#FAF9F7] px-2.5 py-0.5 text-xs font-bold text-crimson border border-[#E8E5E0]">
                {value.preset_name}
              </span>
            </div>
            <p className="text-xs text-[#6B5A5A]">
              Ubah warna aksen di seluruh website &amp; CMS tanpa mengubah warna background halaman maupun section.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="self-start sm:self-auto"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Default
        </Button>
      </div>

      {/* Preset Pilihan Warna */}
      <div className="space-y-2.5">
        <Label className="mb-0">Preset Warna Rekomendasi</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {THEME_PRESETS.map(preset => {
            const isSelected = matchesPreset(value, preset)

            return (
              <button
                key={preset.preset_name}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                className={`flex items-center justify-between gap-3 rounded-xl border p-3 text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-crimson bg-crimson/5 ring-2 ring-crimson/20'
                    : 'border-[#E8E5E0] bg-[#FAF9F7]/60 hover:bg-white hover:border-[#6B5A5A]/40'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex items-center -space-x-1.5 shrink-0">
                    <span
                      className="h-6 w-6 rounded-full border border-white shadow-xs"
                      style={{ backgroundColor: preset.primary }}
                    />
                    <span
                      className="h-5 w-5 rounded-full border border-white shadow-xs"
                      style={{ backgroundColor: preset.primary_hover }}
                    />
                    <span
                      className="h-4 w-4 rounded-full border border-[#E8E5E0] shadow-xs"
                      style={{ backgroundColor: preset.primary_light }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-[#1A0A0A]">{preset.preset_name}</p>
                    <p className="text-[11px] font-mono text-[#6B5A5A]">{preset.primary}</p>
                  </div>
                </div>

                {isSelected && (
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: preset.primary }}
                  >
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* 3 Custom Color Pickers */}
      <div className="space-y-2.5">
        <Label className="mb-0">Custom Color Picker</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <ColorInputRow
            id="theme_primary"
            label="Primary"
            hint="Warna aksen utama (judul aksen, tombol, ikon, border aktif)"
            value={value.primary}
            fallbackValue={DEFAULT_THEME_COLOR.primary}
            onChange={hex => handleCustomFieldChange('primary', hex)}
          />
          <ColorInputRow
            id="theme_primary_hover"
            label="Primary Hover"
            hint="Warna tombol & tautan aksen saat diarahkan kursor"
            value={value.primary_hover}
            fallbackValue={DEFAULT_THEME_COLOR.primary_hover}
            onChange={hex => handleCustomFieldChange('primary_hover', hex)}
          />
          <ColorInputRow
            id="theme_primary_light"
            label="Primary Light"
            hint="Warna tint lembut untuk badge & sorotan permukaan"
            value={value.primary_light}
            fallbackValue={DEFAULT_THEME_COLOR.primary_light}
            onChange={hex => handleCustomFieldChange('primary_light', hex)}
          />
        </div>
      </div>

      {/* Live Preview */}
      <div className="space-y-2">
        <Label className="mb-0">Pratinjau Langsung (Background Terang Netral &amp; Dark Section Harmonis)</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Light Section Preview */}
          <div className="rounded-xl border border-[#E8E5E0] bg-white p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span
                className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: previewLight, color: previewPrimary }}
              >
                Eksplorasi &amp; Konservasi
              </span>
              <span className="text-[11px] font-bold" style={{ color: previewPrimary }}>
                Baca Selengkapnya →
              </span>
            </div>
            <p className="font-display text-sm font-black text-[#1A0A0A]">
              Section Background Putih Tetap Netral
            </p>
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center rounded-lg px-3.5 py-1.5 text-xs font-bold text-white"
                style={{ backgroundColor: previewPrimary }}
              >
                Tombol Primary
              </span>
              <span
                className="inline-flex items-center rounded-lg px-3.5 py-1.5 text-xs font-bold text-white"
                style={{ backgroundColor: previewHover }}
              >
                Hover State
              </span>
            </div>
          </div>

          {/* Dark Hero/Section Preview */}
          <div
            className="rounded-xl p-4 space-y-3 text-white"
            style={{ backgroundColor: darkPreview.darkBg }}
          >
            <span
              className="block text-[10px] font-bold uppercase tracking-widest"
              style={{ color: darkPreview.primaryBright }}
            >
              Section Gelap Harmonis
            </span>
            <p className="font-display text-lg font-black leading-tight">
              GEMA <span style={{ color: darkPreview.primaryBright }}>RAWANA.</span>
            </p>
            <div className="flex items-center justify-between gap-3">
              <span
                className="inline-flex items-center rounded-lg px-4 py-1.5 text-xs font-bold text-white"
                style={{ backgroundColor: previewPrimary }}
              >
                JOIN →
              </span>
              <div
                className="rounded-lg border px-3 py-1.5 text-right"
                style={{
                  backgroundColor: darkPreview.darkSurface,
                  borderColor: darkPreview.darkBorder,
                }}
              >
                <span
                  className="block font-display text-sm font-black leading-none"
                  style={{ color: darkPreview.primaryBright }}
                >
                  84+
                </span>
                <span className="mt-0.5 block text-[10px] font-medium text-white/70">
                  Ekspedisi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
