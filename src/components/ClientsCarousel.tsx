import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { clients } from '../data/clients'
import { Card } from './ui/Card'

type PartnerLogoProps = {
  logoUrl: string
  initials: string
  name: string
}

function PartnerLogo({ logoUrl, initials, name }: PartnerLogoProps) {
  const [hasError, setHasError] = useState(false)

  return (
    <div className="mx-auto flex h-28 w-28 md:h-32 md:w-32 items-center justify-center rounded-2xl bg-white border border-black/10 shadow hover:shadow-lg transition-all">
      {!hasError ? (
        <img
          src={logoUrl}
          alt={name}
          loading="lazy"
          decoding="async"
          className="h-[80%] w-[80%] object-contain opacity-95"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-brand-warmGray/10 px-3 text-lg font-semibold uppercase tracking-[0.45em] text-brand-espresso">
          {initials}
        </div>
      )}
    </div>
  )
}

export function ClientsCarousel() {
  const [isHover, setIsHover] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })

  useEffect(() => {
    if (!emblaApi || !isHover) return
    if (typeof window === 'undefined') return

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const interval = window.setInterval(() => {
      emblaApi.scrollNext()
    }, 1600)

    return () => {
      window.clearInterval(interval)
    }
  }, [emblaApi, isHover])

  return (
    <Card className="border border-[rgba(0,0,0,0.12)] bg-[#fdf5ea] p-6 shadow-lg">
      <div
        className={`relative overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        ref={emblaRef}
        aria-label="Carrossel de clientes parceiras"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
        onPointerLeave={() => setIsDragging(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-16 bg-gradient-to-r from-[#fdf5ea] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-16 bg-gradient-to-l from-[#fdf5ea] to-transparent" />
        <div className="flex gap-6">
          {clients.map((client) => (
            <article
              key={client.name}
              className="min-w-[260px] flex-shrink-0 space-y-5 rounded-[32px] border border-[rgba(0,0,0,0.15)] bg-[#fff9f1] px-7 py-6 text-brand-charcoal shadow-[0_15px_45px_rgba(15,11,8,0.15)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_25px_60px_rgba(15,11,8,0.2)]"
            >
              <PartnerLogo
                logoUrl={client.logoUrl}
                initials={client.initials}
                name={client.name}
              />
              <div className="text-center">
                <p className="text-xl font-semibold uppercase tracking-[0.2em] text-brand-charcoal">
                  {client.name}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-4 text-center text-[0.6rem] font-semibold uppercase tracking-[0.45em] text-brand-charcoal/60">
        <span className="hidden md:inline">Passe o mouse para ver mais</span>
        <span className="inline md:hidden">Arraste para ver mais</span>
      </div>
    </Card>
  )
}
