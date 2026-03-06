import { useState } from 'react'
import { resolveProductImage, placeholderImage } from '../../lib/productImages'
import { cn } from '../../lib/cn'
import type { Product } from '../../data/products/catalog'

type ProductImageProps = {
  product: Product
  className?: string
}

const imageScalePresetBySlug: Record<string, string> = {
  'cafe-expresso-faraco': 'max-h-[84%] max-w-[80%] sm:max-h-[88%] sm:max-w-[84%]',
  'cafe-soluvel': 'max-h-[84%] max-w-[80%] sm:max-h-[88%] sm:max-w-[84%]',
  'leite-em-po-integral-camponesa-400g': 'max-h-[84%] max-w-[81%] sm:max-h-[88%] sm:max-w-[85%]',
  'acucar-cristal-colombo-1kg': 'max-h-[82%] max-w-[79%] sm:max-h-[86%] sm:max-w-[83%]',
  'acucar-sache-caravelas-5g':
    'max-h-[100%] max-w-[100%] scale-[1.3] sm:max-h-[100%] sm:max-w-[100%] sm:scale-[1.3]',
  'cha-mate': 'max-h-[80%] max-w-[74%] sm:max-h-[84%] sm:max-w-[78%]',
  achocolatado: 'max-h-[80%] max-w-[74%] sm:max-h-[84%] sm:max-w-[78%]',
  'palheta-mini-reme-plastfood-500-unid': 'max-h-[74%] max-w-[62%] sm:max-h-[78%] sm:max-w-[66%]',
}

const defaultImageScalePreset = 'max-h-[80%] max-w-[78%] sm:max-h-[84%] sm:max-w-[82%]'

export function ProductImage({ product, className }: ProductImageProps) {
  const initialImage = resolveProductImage(product)
  const [imageSrc, setImageSrc] = useState(initialImage)
  const [failed, setFailed] = useState(false)
  const hasImage = !failed
  const displayName = product.displayName?.trim() || 'Produto sob consulta'
  const imageScaleClass = imageScalePresetBySlug[product.slug] ?? defaultImageScalePreset

  return hasImage ? (
    <div
      className={cn(
        'group relative isolate w-full overflow-hidden rounded-2xl border border-brand-warmGray/35 ring-1 ring-inset ring-brand-warmGray/20 [perspective:1200px]',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-cream/18 via-brand-charcoal/10 to-brand-surfaceSoft/45" />
      <div className="pointer-events-none absolute inset-x-6 top-1/4 h-2/3 rounded-full bg-brand-cream/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-cream/12 via-transparent to-brand-surface/14" />
      <div className="pointer-events-none absolute inset-x-7 bottom-2 h-10 rounded-full bg-brand-ink/20 blur-2xl" />

      <div className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-[1.45rem] p-4 md:p-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(244,236,225,0.16)_0%,rgba(244,236,225,0.1)_18%,rgba(244,236,225,0.04)_36%,transparent_62%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[18%] h-[44%] w-[64%] -translate-x-1/2 rounded-full bg-brand-cream/12 blur-[54px]" />
        <div className="pointer-events-none absolute left-1/2 top-[28%] h-[52%] w-[78%] -translate-x-1/2 rounded-full bg-white/6 blur-[72px]" />
        <div className="pointer-events-none absolute left-1/2 bottom-[15%] h-[14%] w-[56%] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(circle_at_50%_50%,rgba(10,6,5,0.34)_0%,rgba(10,6,5,0.18)_38%,rgba(10,6,5,0.06)_62%,transparent_76%)] blur-[12px]" />
        <div className="pointer-events-none absolute left-1/2 bottom-[12%] h-[18%] w-[70%] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_58%)] blur-[24px]" />
        <div className="pointer-events-none absolute inset-x-[14%] top-[10%] h-[18%] rounded-full bg-white/8 blur-[36px]" />

        <img
          src={imageSrc}
          alt={`Imagem do produto ${displayName}`}
          loading="lazy"
          decoding="async"
          onError={() => {
            if (imageSrc !== placeholderImage) {
              setImageSrc(placeholderImage)
              return
            }
            setFailed(true)
          }}
          className={cn(
            'relative z-10 h-auto w-auto object-contain object-center transition-transform duration-300 ease-out [filter:drop-shadow(0_14px_20px_rgba(11,10,9,0.14))]',
            imageScaleClass,
          )}
        />
      </div>
    </div>
  ) : (
    <div
      className={cn(
        'relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-brand-warmGray/35 bg-brand-surface/88 text-center text-xs text-brand-charcoal/75 ring-1 ring-inset ring-brand-warmGray/20',
        className,
      )}
    >
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[1.45rem] p-4 text-center md:p-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(244,236,225,0.16)_0%,rgba(244,236,225,0.1)_18%,rgba(244,236,225,0.04)_36%,transparent_62%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[18%] h-[44%] w-[64%] -translate-x-1/2 rounded-full bg-brand-cream/12 blur-[54px]" />
        <div className="pointer-events-none absolute left-1/2 bottom-[15%] h-[14%] w-[56%] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(circle_at_50%_50%,rgba(10,6,5,0.34)_0%,rgba(10,6,5,0.18)_38%,rgba(10,6,5,0.06)_62%,transparent_76%)] blur-[12px]" />
        <span className="relative z-10">Imagem indisponível</span>
      </div>
    </div>
  )
}
