import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'

const bebidas = [
  'Café em Grãos',
  'Café Solúvel',
  'Cappuccino em Pó Tradicional',
  'Chocolate em pó com Leite',
  'Chá em pó',
]

const insumos = [
  'Copos plásticos',
  'Mexedores descartáveis',
  'Açúcar Sachê',
  'Leite em pó integral ou desnatado',
]

function ProductCard({
  title,
  description,
  items,
  revealDelay = '0',
}: {
  title: string
  description: string
  items: string[]
  revealDelay?: string
}) {
  return (
    <Card
      data-reveal="up"
      data-reveal-delay={revealDelay}
      className="space-y-4 border border-brand-warmGray/35 bg-brand-surface/95 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:p-8"
    >
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-charcoal/75">Categoria</p>
        <h3 className="text-2xl font-semibold text-brand-espresso">{title}</h3>
        <p className="text-sm text-brand-charcoal/90">{description}</p>
      </div>
      {/* Espaço reservado para ícone ou thumbnail futuro */}
      <ul className="space-y-2 text-sm text-brand-charcoal/95">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-2xl border border-dashed border-brand-warmGray/60 bg-brand-surfaceSoft/70 px-4 py-3"
          >
            {item}
          </li>
        ))}
      </ul>
    </Card>
  )
}

export function Produtos() {
  return (
    <Section
      eyebrow="PRODUTOS"
      title="Produtos para sua operação"
      description="Selecionamos insumos e bebidas para manter consistência e praticidade no escritório."
      className="space-y-10"
    >
      <hr className="border-t border-brand-warmGray/30" />
      <div className="grid gap-6 lg:grid-cols-2">
        <ProductCard
          title="Bebidas"
          description="Mistura premium de sabores e consistência garantida."
          items={bebidas}
          revealDelay="90"
        />
        <ProductCard
          title="Insumos"
          description="Nossos insumos acompanham todos os formatos de operação."
          items={insumos}
          revealDelay="180"
        />
      </div>
      <div
        data-reveal="up"
        data-reveal-delay="260"
        className="rounded-[32px] border border-brand-warmGray/30 bg-brand-surfaceSoft p-6 text-brand-cream shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
      >
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-cream/80">Atendimento</p>
          <p className="text-lg font-semibold">
            Respondemos em minutos no horário comercial e mantemos estoque rotativo para reposição imediata.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/contato"
              className="cta-primary-link px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em]"
            >
              Solicitar orçamento
            </a>
            <a
              href="https://wa.me/5547991072458"
              target="_blank"
              rel="noreferrer"
              className="cta-secondary-link px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em]"
            >
              Conversar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}
