'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import {
  Input,
  Label,
  Textarea,
  Select,
  FieldError,
} from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import type { ActionResult } from '@/lib/validations/cms'

export function FormShell({
  children,
  cancelHref,
  submitLabel = 'Save',
  onSubmit,
}: {
  children: React.ReactNode
  cancelHref: string
  submitLabel?: string
  onSubmit: (formData: FormData) => Promise<ActionResult>
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>()

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

        toast('Saved successfully')

        router.push(cancelHref)
        router.refresh()
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Something went wrong'

        setError(message)
        toast(message, 'error')
      }
    })
  }

  return (
    <form
      className="max-w-2xl space-y-5 rounded-2xl border border-[#E8E5E0] bg-white p-5 md:p-6"
      onSubmit={handleSubmit}
    >
      {children}

      {error && (
        <p
          className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      )}

      <div className="flex gap-3 border-t border-[#E8E5E0] pt-4">
        <Button
          type="submit"
          disabled={pending}
        >
          {pending ? 'Saving…' : submitLabel}
        </Button>

        <Link href={cancelHref}>
          <Button
            type="button"
            variant="outline"
            disabled={pending}
          >
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  )
}

export function TextField({
  label,
  name,
  defaultValue,
  type = 'text',
  required,
  error,
  placeholder,
}: {
  label: string
  name: string
  defaultValue?: string | number | null
  type?: string
  required?: boolean
  error?: string
  placeholder?: string
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>

      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue ?? ''}
        required={required}
        placeholder={placeholder}
      />

      <FieldError message={error} />
    </div>
  )
}

export function TextAreaField({
  label,
  name,
  defaultValue,
  required,
  rows = 4,
}: {
  label: string
  name: string
  defaultValue?: string | null
  required?: boolean
  rows?: number
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>

      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue ?? ''}
        required={required}
        rows={rows}
      />
    </div>
  )
}

export function SelectField({
  label,
  name,
  defaultValue,
  options,
  required,
  allowEmpty,
  emptyLabel = '— None —',
}: {
  label: string
  name: string
  defaultValue?: string | null
  options: { value: string; label: string }[]
  required?: boolean
  allowEmpty?: boolean
  emptyLabel?: string
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>

      <Select
        id={name}
        name={name}
        defaultValue={defaultValue ?? ''}
        required={required}
      >
        {allowEmpty && (
          <option value="">
            {emptyLabel}
          </option>
        )}

        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  )
}

export function CheckboxField({
  label,
  name,
  defaultChecked,
}: {
  label: string
  name: string
  defaultChecked?: boolean
}) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-[#3A2A2A] cursor-pointer">
      <input
        type="checkbox"
        name={name}
        value="true"
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-[#E8E5E0] text-[#8B1A1A] focus:ring-[#8B1A1A]"
      />
      {label}
    </label>
  )
}