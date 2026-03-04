import { LeadForm } from '../components/leads/LeadForm'
import { EmptyState, ProductGrid } from '../components/products'
import { Card } from '../components/ui/Card'
import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'
import { PRODUCT_CATEGORY_ORDER, PRODUCTS, type Product } from '../data/products/catalog'
import { buildWhatsAppLink } from '../lib/whatsapp'

type GroupedCategory = {
  category: string
  products: Product[]
}

function groupProductsByCategory(products: Product[]): GroupedCategory[] {
  const categoryMap = new Map<string, Product[]>()

  for (const product of products) {
    const category = product.category?.trim() || 'Outros'
    const categoryProducts = categoryMap.get(category) ?? []
    categoryProducts.push(product)
    categoryMap.set(category, categoryProducts)
  }

  const grouped: GroupedCategory[] = []

  for (const category of PRODUCT_CATEGORY_ORDER) {
    const categoryProducts = categoryMap.get(category)
    if (!categoryProducts?.length) continue
    grouped.push({ category, products: categoryProducts })
    categoryMap.delete(category)
  }

  for (const [category, categoryProducts] of categoryMap.entries()) {
    if (!categoryProducts.length) continue
    grouped.push({ category, products: categoryProducts })
  }

  return grouped
}

export function Produtos() {
  const groupedProducts = groupProductsByCategory(PRODUCTS)
  const proposalLink = buildWhatsAppLink(
    'Olá! Quero montar o mix de produtos para minha empresa. Pode me passar valores e condições? (Joinville/SC)',
  )

  return (
    <div className="space-y-14 pb-8">
      <Section className="space-y-8">
        <Reveal>
          <Card className="space-y-6 border-brand-warmGray/35 bg-brand-surface/92 p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.35em] text-brand-charcoal/75">Catálogo corporativo</p>
            <h1 className="max-w-[30ch] text-balance text-[clamp(2rem,2.4vw+1rem,3.2rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-brand-espresso">
              Produtos para empresas com abastecimento premium e contínuo
            </h1>
            <p className="max-w-4xl text-base leading-relaxed text-brand-charcoal/92">
              Seleção foto-ilustrativa de produtos para manter a rotina de café da sua empresa organizada e
              padronizada.
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-charcoal/72">
              16 anos • Joinville/SC • Atendemos empresas médias e grandes
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={proposalLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#25D366]/55 bg-[#25D366]/10 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-[#79f2a8] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#25D366]/18 hover:text-[#9bf8be] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#79f2a8] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base"
              >
                Solicitar mix no WhatsApp
              </a>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={120}>
          <LeadForm interest="produtos" />
        </Reveal>

        {groupedProducts.length === 0 ? <EmptyState message="Nenhum produto disponível no catálogo no momento." /> : null}

        {groupedProducts.map((group) => (
          <div key={group.category} className="space-y-4">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-2">
                <h2 className="text-2xl font-semibold tracking-[-0.01em] text-brand-espresso">{group.category}</h2>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-charcoal/65">
                  {group.products.length} itens
                </p>
              </div>
            </Reveal>
            <ProductGrid products={group.products} />
          </div>
        ))}
      </Section>
    </div>
  )
}
