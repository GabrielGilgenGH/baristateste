import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-copper text-brand-ink shadow-[0_10px_28px_rgba(194,122,58,0.35)] hover:-translate-y-0.5 hover:bg-[#d3945e] hover:shadow-[0_18px_34px_rgba(194,122,58,0.4)] active:translate-y-0 active:shadow-[0_8px_18px_rgba(194,122,58,0.34)] focus-visible:ring-brand-copper/90',
  secondary:
    'border border-brand-charcoal/45 text-brand-charcoal hover:-translate-y-0.5 hover:border-brand-copper/85 hover:bg-brand-copper/10 hover:text-brand-espresso active:translate-y-0 focus-visible:ring-brand-copper/90',
  ghost:
    'bg-transparent text-brand-copper hover:bg-brand-copper/12 hover:text-brand-espresso focus-visible:ring-brand-copper/90',
}

const baseClasses =
  'inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-wide transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto'

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`${baseClasses} ${variantStyles[variant]} ${className}`.trim()}
    />
  )
}
