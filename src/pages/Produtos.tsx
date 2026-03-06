import { EmptyState, ProductGrid } from '../components/products'
import { Card } from '../components/ui/Card'
import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'
import { PRODUCTS } from '../data/products/catalog'
import { buildWhatsAppLink } from '../lib/whatsapp'

export function Produtos() {
  const allProducts = [...PRODUCTS].sort((left, right) => {
    const leftCategory = left.category?.trim() || ''
    const rightCategory = right.category?.trim() || ''
    const categorySort = leftCategory.localeCompare(rightCategory, 'pt-BR')
    if (categorySort !== 0) return categorySort

    const leftName = left.displayName?.trim() || left.slug
    const rightName = right.displayName?.trim() || right.slug
    return leftName.localeCompare(rightName, 'pt-BR')
  })

  const proposalLink = buildWhatsAppLink(
    'Olá! Quero montar o mix de produtos para minha empresa. Pode me passar valores e condições? (Joinville/SC)',
  )

  return (
    <div className="space-y-14 pb-8">
      <Section className="space-y-8">
        <Reveal>
          <Card className="space-y-4 border-brand-warmGray/35 bg-brand-surface/92 p-5 text-center md:p-6">
            <p className="text-[0.95rem] uppercase tracking-[0.35em] text-brand-charcoal/75">Catálogo corporativo</p>
            <h1 className="mx-auto max-w-[38ch] text-balance text-[clamp(2.5rem,2.8vw+1.2rem,4rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-brand-espresso">
              Produtos para abastecimento premium e contínuo
            </h1>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={proposalLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand-copper px-8 py-3 text-sm font-bold uppercase tracking-[0.14em] text-brand-ink shadow-lg shadow-black/35 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-copper/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base sm:min-h-14 sm:w-auto sm:px-9 sm:text-[15px]"
              >
                Pedir reposição no WhatsApp
              </a>
            </div>
          </Card>
        </Reveal>

        {allProducts.length === 0 ? <EmptyState message="Nenhum produto disponível no catálogo no momento." /> : null}

        {allProducts.length > 0 ? (
          <div className="space-y-4">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-charcoal/75">
                  {allProducts.length} itens
                </p>
              </div>
            </Reveal>
            <ProductGrid products={allProducts} />
          </div>
        ) : null}
      </Section>
    </div>
  )
}
