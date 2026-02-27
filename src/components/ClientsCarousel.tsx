import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { clients } from '../data/clients'
import { Card } from './ui/Card'
import { InteractiveCard } from './ui/InteractiveCard'
import { Reveal } from './ui/Reveal'

type PartnerLogoProps = {
  logoUrl: string
  initials: string
  name: string
}

function PartnerLogo({ logoUrl, initials, name }: PartnerLogoProps) {
  const [hasError, setHasError] = useState(false)

  return (
    <div className="mx-auto flex h-28 w-28 items-center justify-center">
      {!hasError ? (
        <img
          src={logoUrl}
          alt={name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-lg font-semibold uppercase tracking-[0.4em] text-brand-charcoal">
          {initials}
        </div>
      )}
    </div>
  )
}

export function ClientsCarousel() {
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    dragFree: false,
    skipSnaps: false,
    containScroll: 'trimSnaps',
  })

  const updateButtons = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
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
    <Card className="border border-brand-warmGray/35 bg-brand-surface/95 p-6 shadow-lg md:p-8">
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden px-1">
          <div className="flex gap-6">
            {clients.map((client, index) => (
              <div
                key={client.name}
                className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(25%-18px)]"
              >
                <Reveal delay={index * 80}>
                  <InteractiveCard as="article" className="aspect-square bg-brand-surfaceSoft/95 p-6 text-center">
                    <div className="flex h-full flex-col items-center justify-center">
                      <PartnerLogo logoUrl={client.logoUrl} initials={client.initials} name={client.name} />
                      <p className="mt-5 line-clamp-2 min-h-[4rem] text-2xl font-semibold text-brand-espresso">{client.name}</p>
                    </div>
                  </InteractiveCard>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Parceiros anteriores"
          className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-warmGray/35 bg-brand-cream/90 text-brand-ink transition hover:bg-brand-cream disabled:cursor-not-allowed disabled:opacity-45"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Próximos parceiros"
          className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-warmGray/35 bg-brand-cream/90 text-brand-ink transition hover:bg-brand-cream disabled:cursor-not-allowed disabled:opacity-45"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </Card>
  )
}
