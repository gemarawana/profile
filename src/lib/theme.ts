export interface ThemeColorConfig {
  primary: string
  primary_hover: string
  primary_light: string
  preset_name: string
}

export const HEX_COLOR_REGEX = /^#[0-9A-Fa-f]{6}$/

export const DEFAULT_THEME_COLOR: ThemeColorConfig = {
  primary: '#8B1D1D',
  primary_hover: '#6E1515',
  primary_light: '#FDF2F2',
  preset_name: 'Maroon Default',
}

export const THEME_PRESETS: readonly ThemeColorConfig[] = [
  DEFAULT_THEME_COLOR,
  {
    primary: '#1B5E20',
    primary_hover: '#144618',
    primary_light: '#F1F8F2',
    preset_name: 'Forest Green',
  },
  {
    primary: '#1565C0',
    primary_hover: '#0D47A1',
    primary_light: '#EFF6FF',
    preset_name: 'Ocean Blue',
  },
  {
    primary: '#0F766E',
    primary_hover: '#115E59',
    primary_light: '#F0FDFA',
    preset_name: 'Deep Teal',
  },
  {
    primary: '#B45309',
    primary_hover: '#92400E',
    primary_light: '#FFFBEB',
    preset_name: 'Burnt Amber',
  },
  {
    primary: '#4338CA',
    primary_hover: '#3730A3',
    primary_light: '#EEF2FF',
    preset_name: 'Royal Indigo',
  },
] as const

export function isValidHexColor(value: string): boolean {
  return HEX_COLOR_REGEX.test(value.trim())
}

function normalizeHex(value: unknown, fallback: string): string {
  if (typeof value !== 'string') return fallback
  const trimmed = value.trim()
  return isValidHexColor(trimmed) ? trimmed.toUpperCase() : fallback
}

export function normalizeThemeColor(value: unknown): ThemeColorConfig {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { ...DEFAULT_THEME_COLOR }
  }

  const record = value as Record<string, unknown>
  const presetName =
    typeof record.preset_name === 'string' && record.preset_name.trim().length > 0
      ? record.preset_name.trim()
      : DEFAULT_THEME_COLOR.preset_name

  return {
    primary: normalizeHex(record.primary, DEFAULT_THEME_COLOR.primary),
    primary_hover: normalizeHex(record.primary_hover, DEFAULT_THEME_COLOR.primary_hover),
    primary_light: normalizeHex(record.primary_light, DEFAULT_THEME_COLOR.primary_light),
    preset_name: presetName,
  }
}

export function hexToRgbTuple(hex: string): string {
  const clean = isValidHexColor(hex) ? hex.trim().slice(1) : DEFAULT_THEME_COLOR.primary.slice(1)
  const r = Number.parseInt(clean.slice(0, 2), 16)
  const g = Number.parseInt(clean.slice(2, 4), 16)
  const b = Number.parseInt(clean.slice(4, 6), 16)
  return `${r}, ${g}, ${b}`
}

export function getThemeCssVariables(theme: ThemeColorConfig): Record<string, string> {
  const normalized = normalizeThemeColor(theme)
  return {
    '--theme-primary': normalized.primary,
    '--theme-primary-hover': normalized.primary_hover,
    '--theme-primary-light': normalized.primary_light,
    '--theme-primary-rgb': hexToRgbTuple(normalized.primary),
  }
}
