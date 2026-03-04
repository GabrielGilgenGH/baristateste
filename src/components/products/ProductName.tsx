import type { Product } from '../../data/products/catalog'

type ProductNameProps = {
  product: Product
}

export function ProductName({ product }: ProductNameProps) {
  const displayName = product.displayName?.trim() || 'Produto sob consulta'

  return (
    <div className="mt-4 space-y-2">
      {product.category ? (
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.25em] text-brand-charcoal/65">
          {product.category}
        </p>
      ) : null}
      <h3 title={displayName} className="min-h-[3rem] text-base font-semibold leading-snug text-brand-espresso">
        {displayName}
      </h3>
    </div>
  )
}
