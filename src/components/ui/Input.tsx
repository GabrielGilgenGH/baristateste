import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const baseClasses =
  'w-full rounded-2xl border border-brand-warmGray/50 bg-brand-surfaceSoft/95 px-4 py-3 text-sm text-brand-charcoal placeholder:text-brand-charcoal/70 transition-all duration-200 ease-out focus-visible:border-brand-copper/70 focus-visible:bg-brand-surfaceSoft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-copper/80'

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`${baseClasses} ${className}`.trim()}
    />
  )
}
