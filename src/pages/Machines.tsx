import { CheckCircle2, Coffee, PackageCheck, Wrench, type LucideIcon } from 'lucide-react'
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
  'Suporte rápido',
]

const faqItems = [
  {
    question: 'Qual é o prazo de instalação?',
    answer:
      'Após validação comercial, a instalação ocorre conforme agenda da sua unidade, normalmente em poucos dias úteis.',
  },
  {
    question: 'Quem repõe os insumos?',
    answer:
      'A reposição é responsabilidade da nossa operação, com planejamento alinhado ao consumo médio do seu time.',
  },
  {
    question: 'Como funciona a manutenção?',
    answer:
      'Aplicamos rotina preventiva e acionamento corretivo quando necessário, com suporte técnico especializado.',
  },
  {
    question: 'Existe contrato mínimo?',
    answer: 'As condições contratuais são definidas no orçamento conforme volume, modelo escolhido e perfil de uso.',
  },
  {
    question: 'Como posso pedir orçamento?',
    answer: 'Você pode solicitar pelo WhatsApp ou pelo formulário comercial para receber proposta personalizada.',
  },
]

export function Maquinas() {
  const proposalLink = buildWhatsAppLink(
    'Olá! Quero uma proposta para máquinas de café para minha empresa. Podemos conversar? (Joinville/SC)',
  )

  return (
    <div className="space-y-16 pb-36 md:pb-0">
      <Section className="space-y-8">
        <Reveal>
          <Card className="space-y-6 border-brand-warmGray/35 bg-brand-surface/92 p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.35em] text-brand-charcoal/75">Catálogo corporativo</p>
            <h1 className="max-w-[28ch] text-balance text-[clamp(2rem,2.5vw+1.1rem,3.35rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-espresso sm:max-w-[34ch] sm:leading-[1.08] lg:max-w-[42ch]">
              <span className="box-decoration-clone rounded-md bg-brand-surfaceSoft/35 px-1.5 py-0.5">
                Máquinas para empresas — café{"\u00A0"}premium sem dor de cabeça
              </span>
            </h1>
            <p className="max-w-4xl text-base leading-relaxed text-brand-charcoal/92">
              Planejamos a operação completa de café para sua empresa com reposição contínua e manutenção dedicada,
              sem ocupar o tempo do seu time interno.
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-charcoal/72">
              16 anos • Joinville/SC • Atendemos empresas médias e grandes
            </p>
            <p className="text-xs text-brand-charcoal/75">
              Modelos ilustrativos. Especificações e valores sob consulta.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={proposalLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#25D366]/55 bg-[#25D366]/10 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-[#79f2a8] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#25D366]/18 hover:text-[#9bf8be] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#79f2a8] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base"
              >
                Solicitar proposta no WhatsApp
              </a>
            </div>
          </Card>
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

      <Section
        eyebrow="Perguntas frequentes"
        title="FAQ de contratação e operação"
        description="Respostas rápidas para os pontos mais comuns antes da ativação do serviço."
      >
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <Reveal key={item.question} delay={index * 70}>
              <Card className="space-y-2 border-brand-warmGray/35 bg-brand-surface/92 p-5">
                <h3 className="text-base font-semibold text-brand-espresso">{item.question}</h3>
                <p className="text-sm leading-relaxed text-brand-charcoal/90">{item.answer}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <Card className="space-y-5 border-brand-warmGray/45 bg-brand-surface/92 p-6 md:p-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-brand-espresso">Pronto para montar sua operação de café?</h2>
              <p className="max-w-3xl text-sm leading-relaxed text-brand-charcoal/90">
                Fale com nosso time para validar o modelo ideal e receber uma proposta com instalação, suporte e
                reposição incluídos.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={proposalLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#25D366]/55 bg-[#25D366]/10 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-[#79f2a8] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#25D366]/18 hover:text-[#9bf8be] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#79f2a8] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base"
              >
                Solicitar proposta no WhatsApp
              </a>
            </div>
          </Card>
        </Reveal>
      </Section>

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
