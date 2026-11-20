import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  DEFAULT_THEME_COLOR,
  THEME_PRESETS,
  deriveDarkThemeTokens,
  getContrastRatio,
  getThemeCssVariables,
  hexToRgbTuple,
  isValidHexColor,
  normalizeThemeColor,
} from '../theme.ts'

describe('theme utilities', () => {
  it('exposes Maroon Default as the default theme color', () => {
    assert.deepEqual(DEFAULT_THEME_COLOR, {
      primary: '#8B1D1D',
      primary_hover: '#6E1515',
      primary_light: '#FDF2F2',
      preset_name: 'Maroon Default',
    })
  })

  it('includes Maroon Default as the first preset and valid hexes for all presets', () => {
    assert.ok(THEME_PRESETS.length >= 5)
    assert.deepEqual(THEME_PRESETS[0], DEFAULT_THEME_COLOR)
    for (const preset of THEME_PRESETS) {
      assert.equal(isValidHexColor(preset.primary), true)
      assert.equal(isValidHexColor(preset.primary_hover), true)
      assert.equal(isValidHexColor(preset.primary_light), true)
      assert.ok(preset.preset_name.length > 0)
    }
  })

  it('converts 6-digit hex colors into comma-separated RGB tuples and falls back safely', () => {
    assert.equal(hexToRgbTuple('#8B1D1D'), '139, 29, 29')
    assert.equal(hexToRgbTuple('#1b5e20'), '27, 94, 32')
    assert.equal(hexToRgbTuple('invalid'), '139, 29, 29')
  })

  it('normalizes partial or invalid theme objects to safe defaults', () => {
    assert.deepEqual(normalizeThemeColor(null), DEFAULT_THEME_COLOR)
    assert.deepEqual(normalizeThemeColor([]), DEFAULT_THEME_COLOR)
    assert.deepEqual(normalizeThemeColor('not-an-object'), DEFAULT_THEME_COLOR)
    assert.equal(normalizeThemeColor({ preset_name: '   ' }).preset_name, DEFAULT_THEME_COLOR.preset_name)
    assert.deepEqual(
      normalizeThemeColor({
        primary: '#1565c0',
        primary_hover: 'bad-hex',
        primary_light: '#eff6ff',
        preset_name: '  Ocean Blue  ',
      }),
      {
        primary: '#1565C0',
        primary_hover: DEFAULT_THEME_COLOR.primary_hover,
        primary_light: '#EFF6FF',
        preset_name: 'Ocean Blue',
      }
    )
  })

  it('generates CSS custom properties matching the provided theme', () => {
    const vars = getThemeCssVariables({
      primary: '#1B5E20',
      primary_hover: '#144618',
      primary_light: '#F1F8F2',
      preset_name: 'Forest Green',
    })

    assert.equal(vars['--theme-primary'], '#1B5E20')
    assert.equal(vars['--theme-primary-hover'], '#144618')
    assert.equal(vars['--theme-primary-light'], '#F1F8F2')
    assert.equal(vars['--theme-primary-rgb'], '27, 94, 32')
  })

  it('derives harmonious dark_bg and dark_surface shades across hues', () => {
    const maroon = deriveDarkThemeTokens('#8B1D1D')
    const forest = deriveDarkThemeTokens('#1B4332')
    const navy = deriveDarkThemeTokens('#1E3A8A')
    const terracotta = deriveDarkThemeTokens('#9A3412')
    const teal = deriveDarkThemeTokens('#115E59')

    assert.match(maroon.darkBg, /^#[0-9A-F]{6}$/)
    assert.notEqual(forest.darkBg, maroon.darkBg)
    assert.notEqual(navy.darkBg, maroon.darkBg)
    assert.notEqual(terracotta.darkBg, navy.darkBg)
    assert.notEqual(teal.darkBg, maroon.darkBg)

    // dark_surface must be slightly lighter than dark_bg
    assert.ok(getContrastRatio('#FFFFFF', maroon.darkBg) > getContrastRatio('#FFFFFF', maroon.darkSurface))
    assert.ok(getContrastRatio('#FFFFFF', forest.darkBg) > getContrastRatio('#FFFFFF', forest.darkSurface))
    assert.equal(maroon.darkBorder, 'rgba(255, 255, 255, 0.08)')
  })

  it('ensures primaryBright achieves >= 4.5:1 WCAG contrast on darkBg', () => {
    for (const hex of ['#8B1D1D', '#1B4332', '#1B5E20', '#1E3A8A', '#0F766E', '#4338CA', '#B45309']) {
      const tokens = deriveDarkThemeTokens(hex)
      const ratio = getContrastRatio(tokens.primaryBright, tokens.darkBg)
      assert.ok(ratio >= 4.5, `Expected contrast >= 4.5 for ${hex}, got ${ratio.toFixed(2)}`)
    }
  })

  it('includes dark_bg, dark_surface, dark_border, and primary_bright in getThemeCssVariables', () => {
    const vars = getThemeCssVariables({
      primary: '#1B4332',
      primary_hover: '#143326',
      primary_light: '#ECFDF5',
      preset_name: 'Forest Green',
    })

    assert.ok(vars['--color-dark-bg']?.startsWith('#'))
    assert.ok(vars['--color-dark-bg-rgb']?.includes(','))
    assert.ok(vars['--color-dark-surface']?.startsWith('#'))
    assert.ok(vars['--color-dark-surface-rgb']?.includes(','))
    assert.equal(vars['--color-dark-border'], 'rgba(255, 255, 255, 0.08)')
    assert.ok(vars['--color-primary-bright']?.startsWith('#'))
  })
})
