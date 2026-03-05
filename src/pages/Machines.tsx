import { CheckCircle2, Coffee, PackageCheck, Wrench, type LucideIcon } from 'lucide-react'
import { HeroMaquinas } from '../components/machines/HeroMaquinas'
import { MachineCard } from '../components/machines/MachineCard'
import { Reveal } from '../components/ui/Reveal'
import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'
import { MACHINES } from '../data/machines/catalog'
import { buildWhatsAppLink } from '../lib/whatsapp'

const operationSteps: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Entrega e instalação',
    description: 'Nossa equipe instala a máquina no local e deixa a operação pronta para o primeiro uso.',
    icon: Coffee,
  },
  {
    title: 'Reposição de insumos',
    description: 'Planejamos o abastecimento com recorrência definida para manter continuidade sem rupturas.',
    icon: PackageCheck,
  },
  {
    title: 'Manutenção e suporte',
    description: 'Executamos manutenção preventiva e corretiva com atendimento rápido para evitar paradas.',
    icon: Wrench,
  },
]

const includedItems = [
  'Máquina pronta para operar',
  'Manutenção preventiva e corretiva',
  'Reposição programada',
  'Suporte em até 24H',
]

export function Maquinas() {
  const proposalLink = buildWhatsAppLink(
    'Olá! Quero uma proposta para máquinas de café para minha empresa. Podemos conversar? (Joinville/SC)',
  )

  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden">
      <div className="space-y-16 pb-36 pt-4 md:pb-0">
        <Section className="space-y-8">
          <Reveal>
            <HeroMaquinas proposalLink={proposalLink} />
          </Reveal>

          <ul role="grid" className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {MACHINES.map((machine, index) => (
              <MachineCard key={machine.id} machine={machine} index={index} />
            ))}
          </ul>
        </Section>

        <Section
          eyebrow="Como funciona"
          title="Operação em 3 etapas"
          description="Fluxo claro para manter disponibilidade, padrão de bebida e previsibilidade de atendimento."
        >
          <div className="grid gap-5 md:grid-cols-3">
            {operationSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 90}>
                <Card className="relative h-full border-brand-warmGray/35 bg-brand-surface/92 p-5 md:p-6">
                  <span className="absolute right-5 top-4 text-[0.6rem] font-semibold uppercase tracking-[0.38em] text-brand-charcoal/45">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-warmGray/35 bg-brand-surfaceSoft/75 text-brand-copper">
                    <step.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-brand-espresso">{step.title}</h3>
                  <p className="mt-2 text-sm text-brand-charcoal/90">{step.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="O que está incluso"
          title="Cobertura completa para a rotina da empresa"
          description="Serviço pensado para operação contínua, com apoio técnico e logística integrada."
        >
          <div className="grid gap-3 md:grid-cols-2">
            {includedItems.map((item, index) => (
              <Reveal key={item} delay={index * 70}>
                <Card className="flex h-full items-center gap-3 border-brand-warmGray/35 bg-brand-surface/92 p-4">
                  <CheckCircle2 className="h-5 w-5 flex-none text-brand-copper" aria-hidden="true" />
                  <p className="text-sm font-semibold text-brand-charcoal/95">{item}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Section>

      </div>

      <div className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+5rem)] left-4 right-4 z-[55] md:hidden">
        <a
          href={proposalLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center justify-center rounded-full border border-[#25D366]/55 bg-[#25D366] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_12px_24px_rgba(37,211,102,0.28)] transition-all duration-200 ease-out hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base"
        >
          WhatsApp: pedir proposta
        </a>
      </div>
    </div>
  )
}
