import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'

const bebidas = [
  'Café em Grãos',
  'Café Solúvel',
  'Leite em Pó Integral ou Desnatado',
  'Cappuccino em Pó Tradicional',
  'Chocolate em pó com Leite',
  'Chá Solúvel Pêssego ou Limão',
  'Açúcar Sachê',
  'Adoçante',
]

const insumos = ['Copos plásticos', 'Copos térmico descartáveis', 'Mexedores descartáveis']

function ProductCard({
  title,
  description,
  items,
}: {
  title: string
  description: string
  items: string[]
}) {
  return (
    <Card className="space-y-4 border border-[rgba(0,0,0,0.08)] bg-white/80 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:p-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-warmGray">Categoria</p>
        <h3 className="text-2xl font-semibold text-brand-espresso">{title}</h3>
        <p className="text-sm text-brand-charcoal/70">{description}</p>
      </div>
      {/* Espaço reservado para ícone ou thumbnail futuro */}
      <ul className="space-y-2 text-sm text-brand-charcoal/80">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-2xl border border-dashed border-brand-warmGray/60 bg-brand-cream/60 px-4 py-3"
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
      <div className="space-y-4">
        <div className="inline-flex rounded-full border border-brand-warmGray/50 bg-brand-cream/70 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-brand-charcoal/70">
          Reposição rápida
        </div>
      </div>
      <hr className="border-t border-brand-warmGray/30" />
      <div className="grid gap-6 lg:grid-cols-2">
        <ProductCard
          title="Bebidas"
          description="Mistura premium de sabores e consistência garantida."
          items={bebidas}
        />
        <ProductCard
          title="Insumos"
          description="Nossos insumos acompanham todos os formatos de operação."
          items={insumos}
        />
      </div>
      <div className="rounded-[32px] border border-brand-warmGray/30 bg-[#f5e8d7] p-6 text-brand-cream shadow-[0_18px_50px_rgba(10,6,4,0.25)]">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-cream/80">Atendimento</p>
          <p className="text-lg font-semibold">
            Respondemos em minutos no horário comercial e mantemos estoque rotativo para reposição imediata.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/contato"
              className="inline-flex items-center justify-center rounded-full border border-brand-cream bg-brand-cream/80 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-brand-espresso transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-espresso"
            >
              Solicitar orçamento
            </a>
            <a
              href="https://wa.me/5547991072458"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-brand-cream bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-brand-cream transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cream"
            >
              Conversar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}
