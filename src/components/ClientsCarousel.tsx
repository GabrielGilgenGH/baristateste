import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
    <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-2xl bg-white border border-black/10 shadow-sm">
      {!hasError ? (
        <img
          src={logoUrl}
          alt={name}
          loading="lazy"
          decoding="async"
          className="h-[80%] w-[80%] object-contain"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-brand-warmGray/10 text-lg font-semibold uppercase tracking-[0.4em] text-brand-espresso">
          {initials}
        </div>
      )}
    </div>
  )
}

export function ClientsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    dragFree: false,
    skipSnaps: false,
  })
  const updateButtons = useCallback(() => {
    if (!emblaApi) return
    emblaApi.canScrollPrev()
    emblaApi.canScrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    updateButtons()
    emblaApi.on('select', updateButtons)
    emblaApi.on('reInit', updateButtons)
    return () => {
      emblaApi.off('select', updateButtons)
      emblaApi.off('reInit', updateButtons)
    }
  }, [emblaApi, updateButtons])

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
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-5">
            {clients.map((client) => (
              <article
                key={client.name}
                className="flex-[0_0_auto] w-[85%] sm:w-[45%] lg:w-[32%] xl:w-[28%] max-w-[320px] rounded-[28px] border border-[rgba(0,0,0,0.12)] bg-white/90 px-6 py-7 text-center shadow-[0_20px_45px_rgba(15,11,8,0.12)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(15,11,8,0.18)]"
              >
                <PartnerLogo logoUrl={client.logoUrl} initials={client.initials} name={client.name} />
                <p className="mt-4 text-xl font-semibold text-brand-espresso">{client.name}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#fdf5ea] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#fdf5ea] to-transparent" />
        <button
          onClick={scrollPrev}
          disabled={!emblaApi}
          aria-label="Parceiros anteriores"
          className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white/90 p-2 text-brand-espresso shadow-lg transition hover:bg-white focus-visible:ring-2 focus-visible:ring-brand-espresso focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdf5ea]"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={scrollNext}
          disabled={!emblaApi}
          aria-label="Próximos parceiros"
          className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/90 p-2 text-brand-espresso shadow-lg transition hover:bg-white focus-visible:ring-2 focus-visible:ring-brand-espresso focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdf5ea]"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <p className="mt-4 text-center text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-brand-charcoal/60">
        Navegue pelos parceiros
      </p>
    </Card>
  )
}
