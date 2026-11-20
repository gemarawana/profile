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

/** Dark surface and high-contrast accent tokens derived from a primary theme color. */
export interface DarkThemeTokens {
  darkBg: string
  darkBgRgb: string
  darkSurface: string
  darkSurfaceRgb: string
  darkBorder: string
  primaryBright: string
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = isValidHexColor(hex) ? hex.trim().slice(1) : DEFAULT_THEME_COLOR.primary.slice(1)
  return {
    r: Number.parseInt(clean.slice(0, 2), 16),
    g: Number.parseInt(clean.slice(2, 4), 16),
    b: Number.parseInt(clean.slice(4, 6), 16),
  }
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0').toUpperCase()
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const l = (max + min) / 2
  let h = 0
  let s = 0

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === rn) h = (gn - bn) / d + (gn < bn ? 6 : 0)
    else if (max === gn) h = (bn - rn) / d + 2
    else h = (rn - gn) / d + 4
    h /= 6
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}

function hslToHex(h: number, s: number, l: number): string {
  const hNorm = ((h % 360) + 360) % 360
  const sn = Math.max(0, Math.min(100, s)) / 100
  const ln = Math.max(0, Math.min(100, l)) / 100
  const c = (1 - Math.abs(2 * ln - 1)) * sn
  const x = c * (1 - Math.abs(((hNorm / 60) % 2) - 1))
  const m = ln - c / 2
  let r = 0
  let g = 0
  let b = 0

  if (hNorm < 60) [r, g, b] = [c, x, 0]
  else if (hNorm < 120) [r, g, b] = [x, c, 0]
  else if (hNorm < 180) [r, g, b] = [0, c, x]
  else if (hNorm < 240) [r, g, b] = [0, x, c]
  else if (hNorm < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]

  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255)
}

function getRelativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex)
  const linearize = (v: number) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)
}

/** Computes the WCAG 2.1 contrast ratio between two 6-digit hex colors. */
export function getContrastRatio(hexA: string, hexB: string): number {
  const lA = getRelativeLuminance(hexA)
  const lB = getRelativeLuminance(hexB)
  const lighter = Math.max(lA, lB)
  const darker = Math.min(lA, lB)
  return (lighter + 0.05) / (darker + 0.05)
}

/** Derives harmonious dark background, surface, border, and WCAG-compliant accent tokens from a primary hex color. */
export function deriveDarkThemeTokens(primaryHex: string): DarkThemeTokens {
  const safePrimary = isValidHexColor(primaryHex)
    ? primaryHex.trim().toUpperCase()
    : DEFAULT_THEME_COLOR.primary
  const { r, g, b } = hexToRgb(safePrimary)
  const { h, s, l } = rgbToHsl(r, g, b)

  const darkBgS = s < 10 ? s * 0.5 : Math.min(48, Math.max(32, s * 0.62))
  const darkSurfaceS = s < 10 ? s * 0.5 : Math.min(42, Math.max(26, s * 0.52))

  const darkBg = hslToHex(h, darkBgS, 6.8)
  const darkSurface = hslToHex(h, darkSurfaceS, 11.2)

  let primaryBright = safePrimary
  if (getContrastRatio(primaryBright, darkBg) < 4.5 || getContrastRatio(primaryBright, darkSurface) < 4.5) {
    let candidateL = Math.max(l, 42)
    const candidateS = s < 10 ? s : Math.min(82, Math.max(s, 58))
    let matched = false
    while (candidateL <= 92) {
      const candidate = hslToHex(h, candidateS, candidateL)
      if (getContrastRatio(candidate, darkBg) >= 4.5 && getContrastRatio(candidate, darkSurface) >= 4.5) {
        primaryBright = candidate
        matched = true
        break
      }
      candidateL += 2
    }
    if (!matched) {
      primaryBright = '#FFFFFF'
    }
  }

  return {
    darkBg,
    darkBgRgb: hexToRgbTuple(darkBg),
    darkSurface,
    darkSurfaceRgb: hexToRgbTuple(darkSurface),
    darkBorder: 'rgba(255, 255, 255, 0.08)',
    primaryBright,
  }
}

export function hexToRgbTuple(hex: string): string {
  const { r, g, b } = hexToRgb(hex)
  return `${r}, ${g}, ${b}`
}

export function getThemeCssVariables(theme: ThemeColorConfig): Record<string, string> {
  const normalized = normalizeThemeColor(theme)
  const dark = deriveDarkThemeTokens(normalized.primary)
  return {
    '--theme-primary': normalized.primary,
    '--theme-primary-hover': normalized.primary_hover,
    '--theme-primary-light': normalized.primary_light,
    '--theme-primary-rgb': hexToRgbTuple(normalized.primary),
    '--color-dark-bg': dark.darkBg,
    '--color-dark-bg-rgb': dark.darkBgRgb,
    '--color-dark-surface': dark.darkSurface,
    '--color-dark-surface-rgb': dark.darkSurfaceRgb,
    '--color-dark-border': dark.darkBorder,
    '--color-primary-bright': dark.primaryBright,
  }
}
