import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'
import quemSomosCup from '../assets/brand/quem-somos-cup.svg'

const diferenciais = [
  '15 anos de mercados com ampla carteira de clientes.',
  'Atendimento em todo o estado de Santa Catarina',
  'Sede própria com estrutura operacional dedicada',
  'Equipe técnica qualificada e comprometida',
]

export function QuemSomos() {
  return (
    <Section
      eyebrow="História e valores"
      title="Quem somos"
      description="Dr. Barista Vending é uma empresa joinvillense dedicada a entregar experiências premium em cafés corporativos."
      className="space-y-10"
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6 text-justify text-base leading-relaxed text-brand-charcoal/95 md:text-lg">
          <p>
            Dr. Barista Vending, uma empresa joinvillense, fundada em 2010, tem como característica principal o compromisso da
            excelência no atendimento.
          </p>
          <p>
            Instalada em sede própria, conta com estrutura organizacional que permite oferecer aos nossos clientes e seus
            colaboradores atendimento diferenciado e serviços de qualidade em todo estado de Santa Catarina.
          </p>
          <p>
            Com vasta experiência no ramo, sua diretoria assume o comprometimento e responsabilidade para com seus clientes,
            com funcionários qualificados, utilizando equipamentos, produtos de alta qualidade e preços competitivos.
          </p>
          <p>
            A Dr. Barista Vending conta ainda com diferencial maior: a manutenção dos equipamentos e entrega de insumos em até
            24 horas da solicitação feita, sem taxa de frete.
          </p>
          <p>
            Com o compromisso de desenvolver uma relação de parceria, a Dr. Barista Vending deseja atender todas suas
            expectativas com relação aos serviços propostos, colocando-nos à disposição.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="rounded-3xl border border-brand-warmGray/35 bg-brand-surface/70 p-6 shadow-md md:p-8">
            <img
              src={quemSomosCup}
              alt="Logo Dr. Barista Vending"
              className="w-full max-w-md md:max-w-lg object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
      <Card className="space-y-4 border border-brand-warmGray/35 bg-brand-surface/95 p-6 shadow-soft">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-charcoal/75">Diferenciais</p>
        <ul className="grid gap-3 text-sm text-brand-charcoal/95 md:grid-cols-2">
          {diferenciais.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-dashed border-brand-warmGray/60 bg-brand-surfaceSoft/70 px-4 py-3"
            >
              {item}
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  )
}
