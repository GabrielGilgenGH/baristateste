import type { AnchorHTMLAttributes, ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type InteractiveCardProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  href?: string
} & HTMLAttributes<HTMLElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>

export function InteractiveCard({
  children,
  className,
  as,
  href,
  ...props
}: InteractiveCardProps) {
  const Component = (href ? 'a' : as ?? 'div') as ElementType

  return (
    <Component
      href={href}
      {...props}
      className={cn(
        'group overflow-hidden rounded-2xl border border-brand-warmGray/35 bg-brand-surface/88 p-4 shadow-soft transition-all duration-200 ease-out hover:-translate-y-1 hover:border-brand-copper/45 hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/95 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base',
        className,
      )}
    >
      {children}
    </Component>
  )
}
