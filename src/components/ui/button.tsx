import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A1A]/40 disabled:pointer-events-none disabled:opacity-50',
          variant === 'primary' && 'bg-[#8B1A1A] text-white hover:bg-[#6B1414]',
          variant === 'secondary' && 'bg-[#F4F3F0] text-[#1A0A0A] hover:bg-[#E8E5E0]',
          variant === 'outline' && 'border border-[#E8E5E0] bg-white text-[#1A0A0A] hover:bg-[#FAF9F7]',
          variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700',
          variant === 'ghost' && 'bg-transparent text-[#3A2A2A] hover:bg-[#F4F3F0]',
          size === 'sm' && 'h-8 px-3 text-xs',
          size === 'md' && 'h-10 px-4 text-sm',
          size === 'lg' && 'h-11 px-6 text-base',
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
