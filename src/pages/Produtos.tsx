import { useCallback, useEffect, useState } from 'react'
import { EmptyState, ErrorState, ProductGrid, ProductSkeleton } from '../components/products'
import { Section } from '../components/ui/Section'
import { fetchProductCatalog, type Product } from '../data/products/catalog'

type CatalogStatus = 'loading' | 'success' | 'empty' | 'error'

function ProductGridSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8"
    >
      {Array.from({ length: 8 }, (_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  )
}

export function Produtos() {
  const [products, setProducts] = useState<Product[]>([])
  const [status, setStatus] = useState<CatalogStatus>('loading')

  const loadCatalog = useCallback(async () => {
    setStatus('loading')

    try {
      const result = await fetchProductCatalog()
      setProducts(result)
      setStatus(result.length > 0 ? 'success' : 'empty')
    } catch {
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadCatalog()
    }, 0)

    return () => {
      window.clearTimeout(timer)
    }
  }, [loadCatalog])

  return (
    <Section
      eyebrow="PRODUTOS"
      title="Catálogo de produtos e insumos"
      description="Seleção inicial para operações corporativas. Nosso time adapta o mix de acordo com o perfil de consumo da sua empresa."
      className="space-y-10"
    >
      <hr className="border-t border-brand-warmGray/30" />

      {status === 'loading' && <ProductGridSkeleton />}
      {status === 'empty' && <EmptyState />}
      {status === 'error' && <ErrorState onRetry={() => void loadCatalog()} />}
      {status === 'success' && <ProductGrid products={products} />}
    </Section>
  )
}
