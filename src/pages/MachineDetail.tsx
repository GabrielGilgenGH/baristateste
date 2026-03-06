import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MachineCard } from '../components/machines/MachineCard'
import { Card } from '../components/ui/Card'
import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'
import { MACHINES } from '../data/machines/catalog'
import { machinePlaceholderImage, resolveMachineImage } from '../lib/machineImages'
import { buildWhatsAppLink } from '../lib/whatsapp'
import { PremiumProductImage } from '../components/media/PremiumProductImage'

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

  const proposalLink = buildWhatsAppLink(
    `Olá! Quero uma proposta para a máquina ${displayName} para minha empresa. Podemos conversar? (Joinville/SC)`,
  )
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
              className="inline-flex items-center text-sm font-semibold text-brand-charcoal/90 transition-colors duration-200 hover:text-brand-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/90 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base"
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
              className="inline-flex items-center text-sm font-semibold text-brand-charcoal/90 transition-colors duration-200 hover:text-brand-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/90 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base"
            >
              ← Voltar para Máquinas
            </Link>

            <h1 className="text-[clamp(2rem,2.3vw+1.2rem,3rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-brand-espresso">
              {displayName}
            </h1>

            <PremiumProductImage
              src={imageSrc}
              alt={`Imagem da ${displayName}`}
              variant="machine"
              aspect="landscape"
              className="mx-auto h-[24rem] max-w-5xl sm:h-[28rem] md:h-[34rem]"
              onError={() => setImageSrc(machinePlaceholderImage)}
            />

            <div className="space-y-3">
              <h2 className="text-xl font-semibold tracking-[-0.01em] text-brand-espresso">Descrição comercial</h2>
              <p className="max-w-4xl text-base leading-relaxed text-brand-charcoal/92">
                {machine.commercialDescription ??
                  'Equipamento indicado para operação corporativa com disponibilidade, padrão de qualidade e suporte técnico contínuo.'}
              </p>
            </div>

            <div className="space-y-4 border-t border-brand-warmGray/25 pt-6">
              <h2 className="text-xl font-semibold tracking-[-0.01em] text-brand-espresso">Principais diferenciais</h2>
              <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {(machine.keyFeatures ?? machine.highlights ?? []).map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-brand-warmGray/25 bg-brand-surfaceSoft/28 px-4 py-3 text-sm leading-relaxed text-brand-charcoal/90"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold tracking-[-0.01em] text-brand-espresso">Uso ideal</h2>
              <p className="max-w-4xl text-base leading-relaxed text-brand-charcoal/92">
                {machine.idealUsage ??
                  'Ideal para empresas que precisam de padronização de bebida, assistência técnica e reposição programada.'}
              </p>
            </div>

            <div className="space-y-4 border-t border-brand-warmGray/25 pt-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={proposalLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-[#25D366]/55 bg-[#25D366]/10 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-[#79f2a8] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#25D366]/18 hover:text-[#9bf8be] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#79f2a8] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base"
                >
                  Solicitar orçamento
                </a>
              </div>
            </div>
          </Card>
        </Reveal>
      </Section>

      {relatedMachines.length > 0 ? (
        <Section center title="Outros modelos" description="Explore outros modelos ilustrativos para comparar formatos de operação.">
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
