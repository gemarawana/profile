import type { ActionResult } from '@/lib/validations/cms'
import type { ZodType } from 'zod'

export function formBool(formData: FormData, key: string, defaultValue = false): boolean {
  const raw = formData.get(key)
  if (raw === null) return defaultValue
  return raw === 'true' || raw === 'on' || raw === '1'
}

export function emptyToNull(value: string | null | undefined): string | null {
  if (!value || value.trim() === '') return null
  return value
}

export function parseForm<T>(
  schema: ZodType<T>,
  data: unknown
): { data?: T; error?: string; fieldErrors?: Record<string, string[]> } {
  const result = schema.safeParse(data)
  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {}
    for (const issue of result.error.issues) {
      const key = issue.path.join('.') || '_form'
      fieldErrors[key] = fieldErrors[key] || []
      fieldErrors[key].push(issue.message)
    }
    return {
      error: result.error.issues[0]?.message || 'Validation failed',
      fieldErrors,
    }
  }
  return { data: result.data }
}

export function ok(): ActionResult {
  return { success: true }
}

export function fail(error: string, fieldErrors?: Record<string, string[]>): ActionResult {
  return { success: false, error, fieldErrors }
}
