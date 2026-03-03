import placeholderImage from '../assets/placeholders/product-placeholder.svg'
import type { Product } from '../data/products/catalog'

const imageModules = import.meta.glob('../assets/products/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const normalizedAssets = Object.entries(imageModules).map(([filePath, src]) => ({
  fileName: filePath.split('/').pop()?.toLowerCase() ?? '',
  src,
}))

function findByImageKey(imageKey?: string) {
  if (!imageKey) return undefined
  const normalizedKey = imageKey.toLowerCase()
  return normalizedAssets.find((asset) => asset.fileName.startsWith(normalizedKey))?.src
}

export function resolveProductImage(product: Product): string {
  if (product.imageUrl) return product.imageUrl

  const localImage = findByImageKey(product.imageKey)
  if (localImage) return localImage

  return placeholderImage
}

export { placeholderImage }
