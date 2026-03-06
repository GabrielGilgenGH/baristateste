import { Coffee, PackageCheck, Wrench } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { InteractiveCard } from '../ui/InteractiveCard'
import { Section } from '../ui/Section'

const steps = [
  {
    title: 'Instalação',
    description: 'Mapeamos o ambiente, instalamos os equipamentos e alinhamos o setup com sua operação.',
    icon: Coffee,
  },
  {
    title: 'Abastecimento de insumos',
    description: 'Reposição programada para manter disponibilidade de bebidas e itens de apoio.',
    icon: PackageCheck,
  },
  {
    title: 'Suporte e manutenção',
    description: 'Monitoramento técnico e atendimento contínuo para evitar paradas operacionais.',
    icon: Wrench,
  },
]

export function HowItWorksSteps() {
  return (
    <Section
        center
        id="como-funciona"
      eyebrow="Como funciona"
      title="Operação em 3 passos"
      description="Fluxo simples para manter qualidade constante com baixo esforço interno da sua equipe."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {steps.map((step, index) => (
          <Reveal key={step.title} delay={index * 90}>
            <InteractiveCard as="article" className="relative h-full p-5 md:p-6">
              <span className="absolute right-5 top-4 text-[0.6rem] font-semibold uppercase tracking-[0.38em] text-brand-charcoal/45">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-warmGray/40 bg-brand-surfaceSoft/80 text-brand-copper">
                <step.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-brand-espresso">{step.title}</h3>
              <p className="mt-2 text-sm text-brand-charcoal/90">{step.description}</p>
            </InteractiveCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
