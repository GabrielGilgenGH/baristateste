import type { Product } from '../../data/products/catalog'
import { Reveal } from '../ui/Reveal'
import { InteractiveCard } from '../ui/InteractiveCard'
import { ProductImage } from './ProductImage'
import { ProductName } from './ProductName'

type ProductCardProps = {
  product: Product
  index: number
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <li role="gridcell" className="list-none">
      <Reveal delay={Math.min(index * 80, 560)} className="h-full">
        <InteractiveCard
          as="article"
          tabIndex={0}
          aria-label={`Produto ${product.name}`}
          className="flex h-full flex-col p-3 sm:p-4"
        >
          <ProductImage name={product.name} src={product.imageUrl} />
          <ProductName name={product.name} />
        </InteractiveCard>
      </Reveal>
    </li>
  )
}
