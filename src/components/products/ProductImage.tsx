import { useState } from 'react'
import { resolveProductImage, placeholderImage } from '../../lib/productImages'
import type { Product } from '../../data/products/catalog'

type ProductImageProps = {
  product: Product
}

export function ProductImage({ product }: ProductImageProps) {
  const initialImage = resolveProductImage(product)
  const [imageSrc, setImageSrc] = useState(initialImage)
  const [failed, setFailed] = useState(false)
  const hasImage = !failed
  const displayName = product.displayName?.trim() || 'Produto sob consulta'

  return (
    <div className="relative h-64 overflow-hidden rounded-2xl border border-brand-warmGray/35 bg-brand-surfaceSoft/45 ring-1 ring-inset ring-brand-warmGray/20 sm:h-72 md:h-80">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-surfaceSoft/25 via-brand-surfaceSoft/10 to-transparent" />
      {hasImage ? (
        <div className="relative z-10 flex h-full w-full items-center justify-center p-3 md:p-4">
          <img
            src={imageSrc}
            alt={`Imagem do produto ${displayName}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full max-h-full max-w-full object-contain object-center"
            onError={() => {
              if (imageSrc !== placeholderImage) {
                setImageSrc(placeholderImage)
                return
              }
              setFailed(true)
            }}
          />
        </div>
      ) : (
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-2 px-3 text-brand-charcoal/70">
          <span className="text-center text-xs leading-snug">Imagem indisponível</span>
        </div>
      )}
    </div>
  )
}
