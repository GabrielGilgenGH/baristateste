import type { ComponentPropsWithoutRef } from 'react'

export function Card({ className = '', ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={`rounded-2xl border border-brand-warmGray/40 bg-white/70 shadow-soft backdrop-blur-xl ${className}`.trim()}
    />
  )
}
