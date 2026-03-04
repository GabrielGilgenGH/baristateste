import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MachineCard } from '../components/machines/MachineCard'
import { Card } from '../components/ui/Card'
import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'
import { MACHINES } from '../data/machines/catalog'
import { machinePlaceholderImage, resolveMachineImage } from '../lib/machineImages'
import { track } from '../lib/track'
import { buildB2BProposalMessage, buildWhatsAppLink } from '../lib/whatsapp'

const includedServices = [
  'Instalação e orientação inicial',
  'Reposição de insumos e operação assistida',
  'Manutenção preventiva e corretiva',
  'Atendimento e suporte rápido',
  'Ajustes de plano conforme uso',
]

export function MachineDetail() {
  const { slug } = useParams<{ slug: string }>()
  const machine = MACHINES.find((entry) => entry.slug === slug)
  const displayName = machine?.displayName?.trim() || 'Modelo sob consulta'

  const [imageSrc, setImageSrc] = useState(() =>
    machine ? resolveMachineImage(machine) : machinePlaceholderImage,
  )

  useEffect(() => {
    const nextImage = machine ? resolveMachineImage(machine) : machinePlaceholderImage
    setImageSrc(nextImage)
  }, [machine])

  useEffect(() => {
    document.title = `Máquinas — ${displayName} | Dr Barista`
  }, [displayName])

  const proposalLink = buildWhatsAppLink(buildB2BProposalMessage(`máquina ${displayName || slug || 'sob consulta'}`))
  const relatedMachines = machine
    ? MACHINES.filter((entry) => entry.slug !== machine.slug).slice(0, 6)
    : []

  if (!machine) {
    return (
      <Section className="space-y-6">
        <Reveal>
          <Card className="space-y-4 border-brand-warmGray/35 bg-brand-surface/92 p-6 md:p-8">
            <Link
              to="/maquinas"
              className="inline-flex items-center text-sm font-semibold text-brand-charcoal/85 transition-colors duration-200 hover:text-brand-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/90 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base"
            >
              ← Voltar para Máquinas
            </Link>
            <h1 className="text-3xl font-semibold text-brand-espresso">Modelo não encontrado</h1>
            <p className="max-w-2xl text-sm leading-relaxed text-brand-charcoal/90">
              Este link não corresponde a um modelo cadastrado no momento.
            </p>
          </Card>
        </Reveal>
      </Section>
    )
  }

  return (
    <div className="space-y-12">
      <Section className="space-y-8">
        <Reveal>
          <Card className="space-y-5 border-brand-warmGray/35 bg-brand-surface/92 p-6 md:p-8">
            <Link
              to="/maquinas"
              className="inline-flex items-center text-sm font-semibold text-brand-charcoal/85 transition-colors duration-200 hover:text-brand-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/90 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base"
            >
              ← Voltar para Máquinas
            </Link>

            <h1 className="text-[clamp(2rem,2.3vw+1.2rem,3rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-brand-espresso">
              {displayName}
            </h1>

            <div className="relative mx-auto h-[24rem] w-full max-w-5xl overflow-hidden rounded-2xl border border-brand-warmGray/35 bg-brand-surfaceSoft/45 ring-1 ring-inset ring-brand-warmGray/20 sm:h-[28rem] md:h-[34rem]">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-surfaceSoft/25 via-brand-surfaceSoft/10 to-transparent" />
              <div className="relative z-10 flex h-full w-full items-center justify-center p-3 md:p-4">
                <img
                  src={imageSrc}
                  alt={`Imagem da ${displayName}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full max-h-full max-w-full object-contain object-center"
                  onError={() => setImageSrc(machinePlaceholderImage)}
                />
              </div>
            </div>

            <p className="max-w-3xl text-base leading-relaxed text-brand-charcoal/92">
              Este é um modelo ilustrativo. Configurações, disponibilidade e valores sob consulta.
            </p>

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-charcoal/72">
                16 anos • Joinville/SC • Atendemos empresas médias e grandes
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={proposalLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    track('whatsapp_click', {
                      page: 'maquina_detail',
                      itemType: 'machine',
                      itemId: machine.slug,
                    })
                  }
                  className="inline-flex items-center justify-center rounded-full border border-[#25D366]/55 bg-[#25D366]/10 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-[#79f2a8] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#25D366]/18 hover:text-[#9bf8be] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#79f2a8] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base"
                >
                  Pedir proposta no WhatsApp
                </a>
              </div>
            </div>

            <div className="space-y-4 border-t border-brand-warmGray/25 pt-6">
              <h2 className="text-xl font-semibold tracking-[-0.01em] text-brand-espresso">O que está incluso</h2>

              <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {includedServices.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-brand-warmGray/25 bg-brand-surfaceSoft/28 px-4 py-3 text-sm leading-relaxed text-brand-charcoal/90"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </Reveal>
      </Section>

      {relatedMachines.length > 0 ? (
        <Section title="Outros modelos" description="Explore outros modelos ilustrativos para comparar formatos de operação.">
          <ul role="grid" className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedMachines.map((entry, index) => (
              <MachineCard key={entry.id} machine={entry} index={index} compact />
            ))}
          </ul>
        </Section>
      ) : null}
    </div>
  )
}
