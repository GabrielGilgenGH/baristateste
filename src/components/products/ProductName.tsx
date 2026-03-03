import type { Product } from '../../data/products/catalog'

type ProductNameProps = {
  product: Product
}

export function ProductName({ product }: ProductNameProps) {
  return (
    <div className="mt-4 space-y-2">
      {product.category ? (
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-brand-charcoal/65">
          {product.category}
        </p>
      ) : null}
      <h3
        title={product.name}
        className="line-clamp-2 min-h-[3.5rem] text-sm font-semibold leading-snug text-brand-espresso sm:text-base"
      >
        {product.name}
      </h3>
      {product.shortDescription ? (
        <p className="line-clamp-2 min-h-[2.7rem] text-sm leading-relaxed text-brand-charcoal/80">
          {product.shortDescription}
        </p>
      ) : null}
    </div>
  )
}
