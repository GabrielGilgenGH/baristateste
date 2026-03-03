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
  const fitClass = machine.imageFit === 'cover' ? 'object-cover' : 'object-contain'
  const padClassMap = {
    none: 'p-0',
    sm: 'p-2 md:p-3',
    md: 'p-3 md:p-4',
  } as const
  const imagePad = machine.imagePad ?? 'sm'
  const imagePadClass = padClassMap[imagePad]
  const scaleClassMap = {
    100: 'scale-100',
    110: 'scale-[1.10]',
    120: 'scale-[1.20]',
  } as const
  const hoverScaleClassMap = {
    100: 'group-hover:scale-[1.01]',
    110: 'group-hover:scale-[1.11]',
    120: 'group-hover:scale-[1.21]',
  } as const
  const imageScale = machine.imageScale ?? 120
  const imageScaleClass = scaleClassMap[imageScale]
  const imageHoverScaleClass = hoverScaleClassMap[imageScale]

  const highlights = (machine.highlights ?? []).slice(0, 3)
  const hasHighlights = highlights.length > 0
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
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-brand-warmGray/35 bg-brand-surfaceSoft/40 md:aspect-[4/3]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-surfaceSoft/25 via-brand-surfaceSoft/10 to-transparent" />
            {!imageUnavailable ? (
              <div className={`relative z-10 flex h-full w-full items-center justify-center ${imagePadClass}`}>
                <img
                  src={imageSrc}
                  alt={`Imagem da ${machine.name}`}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full max-h-full max-w-full ${fitClass} ${imageScaleClass} ${imageHoverScaleClass} object-center transition-transform duration-200 ease-out`}
                  onError={() => {
                    if (imageSrc !== machinePlaceholderImage) {
                      setImageSrc(machinePlaceholderImage)
                      return
                    }

                    setImageUnavailable(true)
                  }}
                />
              </div>
            ) : (
              <div className={`relative z-10 flex h-full w-full items-center justify-center text-center text-xs text-brand-charcoal/70 ${imagePadClass}`}>
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
            </div>

            {hasHighlights ? (
              <ul className="space-y-2 text-sm text-brand-charcoal/90">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-brand-copper" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {hasHighlights && features.length > 0 ? (
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
