import { useState, type CSSProperties } from 'react'
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
  const clampScalePercent = (value: number) => Math.min(220, Math.max(100, value))
  const baseScale = clampScalePercent(machine.imageScale ?? 138) / 100
  const mdScale = clampScalePercent(machine.imageScaleMd ?? machine.imageScale ?? 146) / 100
  const mdHoverScale = Number((mdScale + 0.02).toFixed(2))
  const imageOffsetY = machine.imageOffsetY ?? 0
  const imageTransformVars = {
    '--machine-scale': String(baseScale),
    '--machine-scale-md': String(mdScale),
    '--machine-scale-md-hover': String(mdHoverScale),
    '--machine-offsetY': `${imageOffsetY}px`,
  } as CSSProperties
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
                  style={imageTransformVars}
                  className={`h-full w-full max-h-full max-w-full ${fitClass} object-center [transform:translateY(var(--machine-offsetY))_scale(var(--machine-scale))] md:[transform:translateY(var(--machine-offsetY))_scale(var(--machine-scale-md))] motion-safe:md:group-hover:[transform:translateY(var(--machine-offsetY))_scale(var(--machine-scale-md-hover))] transition-transform duration-300 ease-out`}
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
            <Link
              to={detailPath}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-brand-warmGray/45 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-brand-charcoal/85 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand-copper/65 hover:text-brand-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/90 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base"
            >
              Ver detalhes
            </Link>
          </div>
        </InteractiveCard>
      </Reveal>
    </li>
  )
}
