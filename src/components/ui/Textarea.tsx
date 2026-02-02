import type { TextareaHTMLAttributes } from 'react'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

const baseClasses =
  'w-full rounded-2xl border border-brand-warmGray/40 bg-white/80 px-4 py-3 text-sm text-brand-charcoal placeholder:text-brand-warmGray focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-copper/80'

export function Textarea({ className = '', ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={`${baseClasses} ${className}`.trim()}
    />
  )
}
