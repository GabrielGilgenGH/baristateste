import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-copper text-brand-ink hover:bg-[#d3945e] focus-visible:outline-brand-copper/90',
  secondary:
    'border border-brand-charcoal/40 text-brand-charcoal hover:border-brand-copper hover:text-brand-copper focus-visible:outline-brand-copper/90',
  ghost:
    'bg-transparent text-brand-copper hover:bg-brand-copper/10 focus-visible:outline-brand-copper/90',
}

const baseClasses =
  'inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-wide transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto'

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`${baseClasses} ${variantStyles[variant]} ${className}`.trim()}
    />
  )
}
