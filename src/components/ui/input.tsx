import * as React from 'react'
import { cn } from '@/lib/utils'

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'flex h-10 w-full rounded-lg border border-[#E8E5E0] bg-white px-3 py-2 text-sm text-[#1A0A0A] placeholder:text-[#6B5A5A]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A1A]/30 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[100px] w-full rounded-lg border border-[#E8E5E0] bg-white px-3 py-2 text-sm text-[#1A0A0A] placeholder:text-[#6B5A5A]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A1A]/30 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
)
Textarea.displayName = 'Textarea'

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-lg border border-[#E8E5E0] bg-white px-3 py-2 text-sm text-[#1A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A1A]/30 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
)
Select.displayName = 'Select'

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn('mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#6B5A5A]', className)}
      {...props}
    />
  )
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-600">{message}</p>
}
