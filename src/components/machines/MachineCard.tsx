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
    sm: 'p-1.5 md:p-2',
    md: 'p-2 md:p-3',
  } as const
  const imagePad = machine.imagePad ?? 'sm'
  const imagePadClass = padClassMap[imagePad]
  const scaleClassMap = {
    100: 'scale-100 md:scale-[1.05] lg:scale-[1.10] md:group-hover:scale-[1.07] lg:group-hover:scale-[1.12]',
    110: 'scale-[1.06] md:scale-[1.14] lg:scale-[1.20] md:group-hover:scale-[1.16] lg:group-hover:scale-[1.22]',
    120: 'scale-[1.12] md:scale-[1.24] lg:scale-[1.30] md:group-hover:scale-[1.26] lg:group-hover:scale-[1.32]',
    130: 'scale-[1.16] md:scale-[1.32] lg:scale-[1.38] md:group-hover:scale-[1.34] lg:group-hover:scale-[1.40]',
    140: 'scale-[1.22] md:scale-[1.40] lg:scale-[1.46] md:group-hover:scale-[1.42] lg:group-hover:scale-[1.48]',
    150: 'scale-[1.28] md:scale-[1.48] lg:scale-[1.54] md:group-hover:scale-[1.50] lg:group-hover:scale-[1.56]',
  } as const
  const imageScale = machine.imageScale ?? 140
  const imageScaleClass = scaleClassMap[imageScale]
  const highlights = (machine.highlights ?? []).slice(0, 3)
  const displayName = machine.displayName?.trim() || 'Modelo sob consulta'
  const whatsappMessage =
    machine.whatsappMessage ??
    `Olá! Tenho interesse na ${displayName}. Pode me enviar uma proposta para minha empresa?`

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
          aria-label={`Modelo ${displayName}`}
          className="flex h-full flex-col border-brand-warmGray/30 bg-brand-surface/90 p-5 shadow-[0_18px_38px_rgba(11,5,4,0.26)]"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-brand-warmGray/35 bg-brand-surfaceSoft/45 ring-1 ring-inset ring-brand-warmGray/20 md:aspect-[5/4]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-surfaceSoft/25 via-brand-surfaceSoft/10 to-transparent" />
            {!imageUnavailable ? (
              <div className={`relative z-10 flex h-full w-full items-center justify-center ${imagePadClass}`}>
                <img
                  src={imageSrc}
                  alt={`Imagem da ${displayName}`}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full max-h-full max-w-full ${fitClass} ${imageScaleClass} object-center transition-transform duration-300 ease-out`}
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
              <h3 className="text-xl font-semibold text-brand-espresso">{displayName}</h3>
              {machine.segment ? (
                <p className="text-xs uppercase tracking-[0.26em] text-brand-charcoal/70">{machine.segment}</p>
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
