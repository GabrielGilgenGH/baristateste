import { cn } from '../../lib/cn'
import type { SyntheticEvent } from 'react'

type PremiumProductImageProps = {
  src: string
  alt: string
  variant: 'machine' | 'product'
  aspect?: 'square' | 'portrait' | 'landscape'
  className?: string
  onError?: (event: SyntheticEvent<HTMLImageElement, Event>) => void
}

const aspectClassMap = {
  square: 'aspect-square',
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[5/4] sm:aspect-[4/3]',
} as const

const surfaceClassMap = {
  machine: 'from-brand-cream/18 via-brand-charcoal/10 to-brand-surfaceSoft/45',
  product: 'from-brand-cream/22 via-brand-charcoal/12 to-brand-surfaceSoft/42',
} as const

const imageWrapClassMap = {
  machine: 'p-2 md:p-3',
  product: 'p-2.5 md:p-3',
} as const

const maxHeightClassMap = {
  machine: 'max-h-[94%]',
  product: 'max-h-[95%]',
} as const

const dropShadowClassMap = {
  machine:
    '[filter:drop-shadow(0_16px_26px_rgba(11,10,9,0.3))_drop-shadow(0_8px_14px_rgba(74,47,39,0.2))] group-hover:[filter:drop-shadow(0_20px_30px_rgba(11,10,9,0.34))_drop-shadow(0_10px_16px_rgba(74,47,39,0.22))]',
  product:
    '[filter:drop-shadow(0_14px_20px_rgba(11,10,9,0.26))_drop-shadow(0_6px_12px_rgba(74,47,39,0.18))] group-hover:[filter:drop-shadow(0_17px_24px_rgba(11,10,9,0.3))_drop-shadow(0_8px_14px_rgba(74,47,39,0.2))]',
} as const

export function PremiumProductImage({
  src,
  alt,
  variant,
  aspect = 'landscape',
  className,
  onError,
}: PremiumProductImageProps) {
  return (
    <div
      className={cn(
        'group relative isolate w-full overflow-hidden rounded-2xl border border-brand-warmGray/35 ring-1 ring-inset ring-brand-warmGray/20',
        aspectClassMap[aspect],
        className,
      )}
    >
      {/* Best visual quality: export photos as WEBP/PNG with transparent alpha and 2x final display size. */}
      <div className={cn('pointer-events-none absolute inset-0 bg-gradient-to-br', surfaceClassMap[variant])} />
      <div className="pointer-events-none absolute inset-x-6 top-1/4 h-2/3 rounded-full bg-brand-cream/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-cream/12 via-transparent to-brand-surface/14" />
      <div className="pointer-events-none absolute inset-x-7 bottom-2 h-10 rounded-full bg-brand-ink/20 blur-2xl" />

      <div className={cn('relative z-10 flex h-full w-full items-center justify-center', imageWrapClassMap[variant])}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={onError}
          className={cn(
            'h-full w-full max-w-full object-contain object-center transition-[filter,transform] duration-300 ease-out group-hover:scale-[1.015]',
            maxHeightClassMap[variant],
            dropShadowClassMap[variant],
          )}
        />
      </div>
    </div>
  )
}
