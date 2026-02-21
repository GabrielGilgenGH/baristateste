import type { HTMLAttributes } from 'react'

type BadgeVariant = 'solid' | 'outline' | 'ghost'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
  solid: 'bg-brand-copper/90 text-brand-ink',
  outline:
    'border border-brand-warmGray/50 bg-brand-surface text-brand-charcoal shadow-soft transition-colors duration-200 hover:bg-brand-surfaceSoft',
  ghost: 'bg-brand-surface/95 text-brand-charcoal border border-brand-warmGray/40',
}

export function Badge({
  variant = 'solid',
  className = '',
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.35em] ${variantStyles[variant]} ${className}`.trim()}
    />
  )
}
