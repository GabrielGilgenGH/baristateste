import type { Product } from '../../data/products/catalog'

type ProductNameProps = {
  product: Product
}

export function ProductName({ product }: ProductNameProps) {
  const displayName = product.displayName?.trim() || 'Produto sob consulta'

  return (
    <div className="mx-auto flex min-h-[1.8rem] w-full items-center justify-center text-center">
      <h3
        title={displayName}
        className="whitespace-nowrap text-center text-[1rem] font-semibold leading-none tracking-[-0.02em] text-brand-espresso sm:text-[1.08rem] xl:text-[1.16rem]"
      >
        {displayName}
      </h3>
    </div>
  )
}
