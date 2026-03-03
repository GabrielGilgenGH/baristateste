import { useState } from 'react'
import type { Machine } from '../../data/machines/catalog'
import { machinePlaceholderImage, resolveMachineImage } from '../../lib/machineImages'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { Button } from '../ui/Button'
import { InteractiveCard } from '../ui/InteractiveCard'
import { Reveal } from '../ui/Reveal'

type MachineCardProps = {
  machine: Machine
  index: number
}

export function MachineCard({ machine, index }: MachineCardProps) {
  const [imageSrc, setImageSrc] = useState(() => resolveMachineImage(machine))
  const [imageUnavailable, setImageUnavailable] = useState(false)

  const highlights = (machine.highlights ?? []).slice(0, 3)
  const features = (machine.features ?? []).slice(0, 2)
  const whatsappMessage =
    machine.whatsappMessage ??
    `Olá! Tenho interesse na ${machine.name}. Pode me enviar valores e opções de locação, incluindo instalação, manutenção e reposição de insumos?`

  const openWhatsAppQuote = () => {
    const link = buildWhatsAppLink(whatsappMessage)
    const newWindow = window.open(link, '_blank', 'noopener,noreferrer')
    if (!newWindow) window.location.href = link
  }

  return (
    <li role="gridcell" className="list-none h-full">
      <Reveal delay={Math.min(index * 90, 540)} className="h-full">
        <InteractiveCard
          as="article"
          tabIndex={0}
          aria-label={`Máquina ${machine.name}`}
          className="flex h-full flex-col border-brand-warmGray/35 bg-brand-surface/90 p-5 shadow-soft"
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-brand-warmGray/35 bg-brand-surfaceSoft/60">
            {!imageUnavailable ? (
              <img
                src={imageSrc}
                alt={`Imagem da ${machine.name}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]"
                onError={() => {
                  if (imageSrc !== machinePlaceholderImage) {
                    setImageSrc(machinePlaceholderImage)
                    return
                  }

                  setImageUnavailable(true)
                }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center px-3 text-center text-xs text-brand-charcoal/70">
                Imagem indisponível
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-1 flex-col gap-4">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold text-brand-espresso">{machine.name}</h3>
                {machine.capacityLabel ? (
                  <span className="text-right text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-brand-charcoal/75">
                    {machine.capacityLabel}
                  </span>
                ) : null}
              </div>
              {machine.segment ? (
                <p className="text-xs uppercase tracking-[0.26em] text-brand-charcoal/70">{machine.segment}</p>
              ) : null}
              {machine.shortDescription ? (
                <p className="text-sm leading-relaxed text-brand-charcoal/90">{machine.shortDescription}</p>
              ) : null}
            </div>

            {highlights.length > 0 ? (
              <ul className="space-y-2 text-sm text-brand-charcoal/90">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-brand-copper" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {features.length > 0 ? (
              <dl className="grid grid-cols-2 gap-2 rounded-xl border border-brand-warmGray/30 bg-brand-surfaceSoft/50 p-3">
                {features.map((feature) => (
                  <div key={feature.label} className="space-y-1">
                    <dt className="text-[0.62rem] uppercase tracking-[0.22em] text-brand-charcoal/65">
                      {feature.label}
                    </dt>
                    <dd className="text-sm font-semibold text-brand-espresso">{feature.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>

          <div className="mt-5">
            <Button type="button" variant="primary" onClick={openWhatsAppQuote} className="w-full">
              Solicitar orçamento
            </Button>
          </div>
        </InteractiveCard>
      </Reveal>
    </li>
  )
}
