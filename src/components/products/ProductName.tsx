import type { Product } from '../../data/products/catalog'

type ProductNameProps = {
  product: Product
}

export function ProductName({ product }: ProductNameProps) {
  const displayName = product.displayName?.trim() || 'Produto sob consulta'

  return (
    <div className="mt-4">
      <h3 title={displayName} className="min-h-[3rem] text-center text-base font-bold leading-snug text-brand-espresso">
        {displayName}
      </h3>
    </div>
  )
}
