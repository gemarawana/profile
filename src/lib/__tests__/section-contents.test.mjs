import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  DEFAULT_SECTION_CONTENTS,
  SECTION_CONTENT_KEYS,
  SECTION_CONTENT_META,
  cloneDefaultSectionContents,
  normalizeSectionContents,
} from '../section-contents.ts'

describe('section_contents utilities', () => {
  it('defines all 13 public sections with non-empty default titles and metadata', () => {
    assert.deepEqual([...SECTION_CONTENT_KEYS], [
      'hero',
      'introduction',
      'about',
      'our_story',
      'organization',
      'activities',
      'journey',
      'articles',
      'stories',
      'impact',
      'gallery',
      'faq',
      'cta',
    ])

    for (const key of SECTION_CONTENT_KEYS) {
      const section = DEFAULT_SECTION_CONTENTS[key]
      const meta = SECTION_CONTENT_META[key]
      assert.ok(section, `Missing default section for ${key}`)
      assert.ok(meta, `Missing metadata for ${key}`)
      assert.ok(section.title.trim().length > 0, `Empty default title for ${key}`)
      assert.ok(meta.label.trim().length > 0)
      assert.ok(meta.fields.includes('title'))
    }
  })

  it('returns a fresh deep clone of defaults when given null, arrays, or non-objects', () => {
    const fromNull = normalizeSectionContents(null)
    const fromArray = normalizeSectionContents([])
    const fromString = normalizeSectionContents('invalid')

    assert.deepEqual(fromNull, DEFAULT_SECTION_CONTENTS)
    assert.deepEqual(fromArray, DEFAULT_SECTION_CONTENTS)
    assert.deepEqual(fromString, DEFAULT_SECTION_CONTENTS)

    fromNull.hero.title = 'MUTATED'
    assert.equal(DEFAULT_SECTION_CONTENTS.hero.title, 'GEMA')
    assert.equal(cloneDefaultSectionContents().hero.title, 'GEMA')
  })

  it('merges partial section overrides while preserving untouched fields and sections', () => {
    const merged = normalizeSectionContents({
      hero: {
        title: 'EKSPEDISI',
      },
      impact: {
        title_highlight: 'DAMPAK NYATA.',
      },
      cta: {
        button_text: 'GABUNG SEKARANG',
      },
    })

    assert.equal(merged.hero.title, 'EKSPEDISI')
    assert.equal(merged.hero.title_highlight, DEFAULT_SECTION_CONTENTS.hero.title_highlight)
    assert.equal(merged.hero.description, DEFAULT_SECTION_CONTENTS.hero.description)

    assert.equal(merged.impact.title, DEFAULT_SECTION_CONTENTS.impact.title)
    assert.equal(merged.impact.title_highlight, 'DAMPAK NYATA.')
    assert.equal(merged.impact.description, DEFAULT_SECTION_CONTENTS.impact.description)

    assert.equal(merged.cta.button_text, 'GABUNG SEKARANG')
    assert.equal(merged.cta.secondary_button_text, DEFAULT_SECTION_CONTENTS.cta.secondary_button_text)
    assert.deepEqual(merged.gallery, DEFAULT_SECTION_CONTENTS.gallery)
  })

  it('preserves intentional empty strings on optional fields while falling back on blank titles', () => {
    const normalized = normalizeSectionContents({
      about: {
        badge: '',
        title: '   ',
        title_highlight: '',
        description: '',
      },
      introduction: {
        secondary_description: '',
      },
    })

    assert.equal(normalized.about.badge, '')
    assert.equal(normalized.about.title, DEFAULT_SECTION_CONTENTS.about.title)
    assert.equal(normalized.about.title_highlight, '')
    assert.equal(normalized.about.description, '')
    assert.equal(normalized.introduction.secondary_description, '')
  })
})
