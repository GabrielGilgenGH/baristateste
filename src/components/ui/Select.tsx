import type { SelectHTMLAttributes } from 'react'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>

const baseClasses =
  'w-full rounded-2xl border border-brand-warmGray/50 bg-brand-surfaceSoft/95 px-4 py-3 text-sm text-brand-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-copper/80'

export function Select({ className = '', ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={`${baseClasses} ${className}`.trim()}
    />
  )
}
