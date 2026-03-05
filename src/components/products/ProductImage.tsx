import { useState } from 'react'
import { resolveProductImage, placeholderImage } from '../../lib/productImages'
import type { Product } from '../../data/products/catalog'
import { PremiumProductImage } from '../media/PremiumProductImage'

type ProductImageProps = {
  product: Product
}

export function ProductImage({ product }: ProductImageProps) {
  const initialImage = resolveProductImage(product)
  const [imageSrc, setImageSrc] = useState(initialImage)
  const [failed, setFailed] = useState(false)
  const hasImage = !failed
  const displayName = product.displayName?.trim() || 'Produto sob consulta'

  return hasImage ? (
    <PremiumProductImage
      src={imageSrc}
      alt={`Imagem do produto ${displayName}`}
      variant="product"
      aspect="portrait"
      className="h-64 sm:h-72 md:h-80"
      onError={() => {
        if (imageSrc !== placeholderImage) {
          setImageSrc(placeholderImage)
          return
        }
        setFailed(true)
      }}
    />
  ) : (
    <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl border border-brand-warmGray/35 bg-brand-surfaceSoft/45 text-center text-xs text-brand-charcoal/70 ring-1 ring-inset ring-brand-warmGray/20 sm:h-72 md:h-80">
      Imagem indisponível
    </div>
  )
}
