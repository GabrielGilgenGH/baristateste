import { useState } from 'react'
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const [isDragging, setIsDragging] = useState(false)

  const scrollPrev = () => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }

  const scrollNext = () => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }

  return (
    <Card className="border border-[rgba(0,0,0,0.12)] bg-[#fdf5ea] p-6 shadow-lg">
      <div
        className={`relative overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        ref={emblaRef}
        aria-label="Carrossel de clientes parceiras"
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
        onPointerLeave={() => setIsDragging(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 md:w-14 bg-gradient-to-r from-[#fdf5ea] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 md:w-14 bg-gradient-to-l from-[#fdf5ea] to-transparent" />
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
        <button
          onClick={scrollPrev}
          aria-label="Parceiros anteriores"
          className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-brand-cream/80 p-2 text-lg text-brand-espresso shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-espresso md:left-6"
        >
          ‹
        </button>
        <button
          onClick={scrollNext}
          aria-label="Próximos parceiros"
          className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-brand-cream/80 p-2 text-lg text-brand-espresso shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-espresso md:right-6"
        >
          ›
        </button>
      </div>
      <div className="mt-4 text-center text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-brand-charcoal/65">
        Clique nas setas para ver todos os parceiros
      </div>
    </Card>
  )
}
