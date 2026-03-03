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
    <li role="gridcell" className="list-none h-full">
      <Reveal delay={Math.min(index * 80, 560)} className="h-full">
        <InteractiveCard
          as="article"
          tabIndex={0}
          aria-label={`Produto ${product.name}`}
          className="flex h-full flex-col border-brand-warmGray/20 bg-brand-surface/82 p-4 shadow-[0_14px_34px_rgba(11,5,4,0.22)] hover:-translate-y-0.5 hover:border-brand-copper/35 hover:shadow-[0_20px_40px_rgba(11,5,4,0.28)] sm:p-5"
        >
          <ProductImage name={product.name} src={product.imageUrl} />
          <ProductName name={product.name} />
        </InteractiveCard>
      </Reveal>
    </li>
  )
}
