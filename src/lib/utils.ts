import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatRedirectUrl(url?: string | null): { href: string; isExternal: boolean } {
  if (!url) return { href: '', isExternal: false }
  const trimmed = url.trim()
  if (!trimmed) return { href: '', isExternal: false }

  // Internal routes or hash anchors
  if (trimmed.startsWith('/') || trimmed.startsWith('#')) {
    return { href: trimmed, isExternal: false }
  }

  // URLs that already have a protocol (http://, https://, mailto:, etc.)
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) {
    const isExt = trimmed.startsWith('http://') || trimmed.startsWith('https://')
    return { href: trimmed, isExternal: isExt }
  }

  // External URLs entered without protocol (e.g. linktr.ee/gemarawana, forms.gle/xyz)
  return { href: `https://${trimmed}`, isExternal: true }
}
