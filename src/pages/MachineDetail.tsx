import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'
import { MACHINES } from '../data/machines/catalog'
import { machinePlaceholderImage, resolveMachineImage } from '../lib/machineImages'
import { buildWhatsAppLink } from '../lib/whatsapp'

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
  const visitLink = buildWhatsAppLink(
    `Olá! Quero agendar uma visita técnica para avaliar a máquina ${displayName} na minha empresa em Joinville/SC.`,
  )

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

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-brand-warmGray/35 bg-brand-surfaceSoft/45 ring-1 ring-inset ring-brand-warmGray/20 md:aspect-[5/4]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-surfaceSoft/25 via-brand-surfaceSoft/10 to-transparent" />
            <div className="relative z-10 flex h-full w-full items-center justify-center p-2 md:p-3">
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

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={proposalLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#25D366]/55 bg-[#25D366]/10 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-[#79f2a8] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#25D366]/18 hover:text-[#9bf8be] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#79f2a8] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base"
            >
              Pedir proposta no WhatsApp
            </a>
            <a
              href={visitLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-brand-charcoal/45 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-brand-charcoal transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand-copper/85 hover:bg-brand-copper/10 hover:text-brand-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/90 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base"
            >
              Agendar visita técnica
            </a>
          </div>
        </Card>
      </Reveal>
    </Section>
  )
}
