import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  DEFAULT_THEME_COLOR,
  THEME_PRESETS,
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

    assert.deepEqual(vars, {
      '--theme-primary': '#1B5E20',
      '--theme-primary-hover': '#144618',
      '--theme-primary-light': '#F1F8F2',
      '--theme-primary-rgb': '27, 94, 32',
    })
  })
})
