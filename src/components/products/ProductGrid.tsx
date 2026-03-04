import type { Product } from '../../data/products/catalog'
import { ProductCard } from './ProductCard'

type ProductGridProps = {
  products: Product[]
  className?: string
}

export function ProductGrid({ products, className = '' }: ProductGridProps) {
  return (
    <ul
      role="grid"
      aria-label="Grade de produtos"
      className={`grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 ${className}`.trim()}
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </ul>
  )
}
