import { useState, type KeyboardEventHandler } from 'react'
import { Link } from 'react-router-dom'
import type { Machine } from '../../data/machines/catalog'
import { machinePlaceholderImage, resolveMachineImage } from '../../lib/machineImages'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { Button } from '../ui/Button'
import { InteractiveCard } from '../ui/InteractiveCard'
import { Reveal } from '../ui/Reveal'

type MachineCardProps = {
  machine: Machine
  index: number
  compact?: boolean
}

export function MachineCard({ machine, index, compact = false }: MachineCardProps) {
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
  const highlights = (machine.highlights ?? []).slice(0, 3)
  const displayName = machine.displayName?.trim() || 'Modelo sob consulta'
  const detailPath = `/maquinas/${machine.slug}`
  const whatsappMessage =
    machine.whatsappMessage ??
    `Olá! Tenho interesse na ${displayName}. Pode me enviar uma proposta para minha empresa?`

  const openWhatsAppQuote = () => {
    const link = buildWhatsAppLink(whatsappMessage)
    const newWindow = window.open(link, '_blank', 'noopener,noreferrer')
    if (!newWindow) window.location.href = link
  }

  const handleOverlayKeyDown: KeyboardEventHandler<HTMLAnchorElement> = (event) => {
    if (event.key !== ' ') return
    event.preventDefault()
    event.currentTarget.click()
  }

  return (
    <li role="gridcell" className="list-none h-full">
      <Reveal delay={Math.min(index * 90, 540)} className="h-full">
        <InteractiveCard
          as="article"
          className={`relative flex h-full cursor-pointer flex-col border-brand-warmGray/30 bg-brand-surface/90 shadow-[0_18px_38px_rgba(11,5,4,0.26)] ${
            compact ? 'p-4' : 'p-5'
          }`}
        >
          <Link
            to={detailPath}
            aria-label={`Ver detalhes: ${displayName}`}
            onKeyDown={handleOverlayKeyDown}
            className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/90 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base"
          />

          <div
            className={`relative overflow-hidden rounded-2xl border border-brand-warmGray/35 bg-brand-surfaceSoft/45 ring-1 ring-inset ring-brand-warmGray/20 ${
              compact ? 'h-56 sm:h-64 md:h-72' : 'h-72 sm:h-80 md:h-[23rem] lg:h-[25rem]'
            }`}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-surfaceSoft/25 via-brand-surfaceSoft/10 to-transparent" />
            {!imageUnavailable ? (
              <div className={`relative z-10 flex h-full w-full items-center justify-center ${imagePadClass}`}>
                <img
                  src={imageSrc}
                  alt={`Imagem da ${displayName}`}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full max-h-full max-w-full ${fitClass} object-center`}
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
              <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-semibold text-brand-espresso`}>{displayName}</h3>
              {machine.segment ? (
                <p className="text-xs uppercase tracking-[0.26em] text-brand-charcoal/70">{machine.segment}</p>
              ) : null}
            </div>

            {!compact && highlights.length > 0 ? (
              <ul className="space-y-2 text-sm text-brand-charcoal/90">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-brand-copper" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-brand-charcoal/78">
              <span>Ver detalhes</span>
              <span aria-hidden="true">→</span>
            </p>
          </div>

          {!compact ? (
            <div className="relative z-20 mt-5">
              <Button type="button" variant="primary" onClick={openWhatsAppQuote} className="w-full">
                Solicitar orçamento
              </Button>
            </div>
          ) : null}
        </InteractiveCard>
      </Reveal>
    </li>
  )
}
