import type { ComponentPropsWithoutRef } from 'react'

export function Card({ className = '', ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={`rounded-2xl border border-brand-warmGray/45 bg-brand-surface/95 shadow-soft backdrop-blur-xl ${className}`.trim()}
    />
  )
}
