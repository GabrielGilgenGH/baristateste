import placeholderImage from '../assets/placeholders/product-placeholder.svg'
import type { Product } from '../data/products/catalog'

export function resolveProductImage(product: Product): string {
  if (product.imageUrl) return product.imageUrl
  if (product.imageKey) return `/products/${product.imageKey}`

  return placeholderImage
}

export { placeholderImage }
