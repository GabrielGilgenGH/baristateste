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

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-brand-warmGray/35 bg-brand-surfaceSoft/65">
      {hasImage ? (
        <img
          src={imageSrc}
          alt={`Imagem do produto ${product.name}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]"
          onError={() => {
            if (imageSrc !== placeholderImage) {
              setImageSrc(placeholderImage)
              return
            }
            setFailed(true)
          }}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-3 text-brand-charcoal/70">
          <span className="text-center text-xs leading-snug">Imagem indisponível</span>
        </div>
      )}
    </div>
  )
}
