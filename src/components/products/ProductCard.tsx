import type { Product } from '../../data/products/catalog'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { Reveal } from '../ui/Reveal'
import { InteractiveCard } from '../ui/InteractiveCard'
import { ProductImage } from './ProductImage'
import { ProductName } from './ProductName'

type ProductCardProps = {
  product: Product
  index: number
}

export function ProductCard({ product, index }: ProductCardProps) {
  const displayName = product.displayName?.trim() || 'Produto sob consulta'
  const whatsappMessage =
    product.whatsappMessage ??
    `Olá! Quero pedir ${displayName} para minha empresa. Pode me passar valores e condições? (Joinville/SC)`
  const whatsappLink = buildWhatsAppLink(whatsappMessage)

  return (
    <li role="gridcell" className="list-none h-full">
      <Reveal delay={Math.min(index * 80, 560)} className="h-full">
        <InteractiveCard
          as="article"
          aria-label={`Produto ${displayName}`}
          className="relative flex h-full min-h-[31.5rem] flex-col border-brand-warmGray/30 bg-brand-surface/90 p-6 shadow-[0_18px_38px_rgba(11,5,4,0.26)] xl:min-h-[33rem]"
        >
          <ProductImage product={product} className="h-64 sm:h-72 md:h-[20rem] lg:h-[21.5rem] xl:h-[22rem]" />

          <div className="mt-3.5 flex flex-col gap-1">
            <ProductName product={product} />
          </div>

          <div className="relative z-20 mt-2.5 flex justify-center">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-w-[18rem] items-center justify-center rounded-full border border-brand-warmGray/50 bg-brand-surfaceSoft/35 px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-brand-charcoal transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand-copper/75 hover:bg-brand-copper/12 hover:text-brand-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/85 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base"
            >
              Pedir no WhatsApp
            </a>
          </div>
        </InteractiveCard>
      </Reveal>
    </li>
  )
}
