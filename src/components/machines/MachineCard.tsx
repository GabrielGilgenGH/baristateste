import { useState, type KeyboardEventHandler } from 'react'
import { Link } from 'react-router-dom'
import type { Machine } from '../../data/machines/catalog'
import { machinePlaceholderImage, resolveMachineImage } from '../../lib/machineImages'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { PremiumProductImage } from '../media/PremiumProductImage'
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
            compact ? 'p-4' : 'min-h-[35rem] p-6 xl:min-h-[37rem]'
          }`}
        >
          <Link
            to={detailPath}
            aria-label={`Ver detalhes: ${displayName}`}
            onKeyDown={handleOverlayKeyDown}
            className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/90 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base"
          />

          {!imageUnavailable ? (
            <PremiumProductImage
              src={imageSrc}
              alt={`Imagem da ${displayName}`}
              variant="machine"
              aspect="landscape"
              className={compact ? 'h-56 sm:h-64 md:h-72' : 'h-80 sm:h-[22rem] md:h-[25rem] lg:h-[26.5rem] xl:h-[22rem]'}
              onError={() => {
                if (imageSrc !== machinePlaceholderImage) {
                  setImageSrc(machinePlaceholderImage)
                  return
                }

                setImageUnavailable(true)
              }}
            />
          ) : (
            <div
              className={`relative flex items-center justify-center overflow-hidden rounded-2xl border border-brand-warmGray/35 bg-brand-surfaceSoft/45 text-center text-xs text-brand-charcoal/75 ring-1 ring-inset ring-brand-warmGray/20 ${
                compact ? 'h-56 sm:h-64 md:h-72' : 'h-80 sm:h-[22rem] md:h-[25rem] lg:h-[26.5rem] xl:h-[22rem]'
              }`}
            >
              Imagem indisponível
            </div>
          )}

          <div className="mt-5 flex flex-1 flex-col gap-5">
            <div>
              <h3 className={`${compact ? 'text-lg' : 'text-[1.75rem]'} text-center font-semibold text-brand-espresso`}>
                {displayName}
              </h3>
            </div>

            <p className="inline-flex self-center text-center items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-brand-charcoal/80">
              <span>Ver detalhes</span>
              <span aria-hidden="true">→</span>
            </p>
          </div>

          {!compact ? (
            <div className="relative z-20 mt-6 flex justify-center">
              <button
                type="button"
                onClick={openWhatsAppQuote}
                className="inline-flex min-w-[18rem] items-center justify-center rounded-full border border-brand-warmGray/50 bg-brand-surfaceSoft/35 px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-brand-charcoal transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand-copper/75 hover:bg-brand-copper/12 hover:text-brand-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/85 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base"
              >
                SOLICITAR ORÇAMENTO
              </button>
            </div>
          ) : null}
        </InteractiveCard>
      </Reveal>
    </li>
  )
}
