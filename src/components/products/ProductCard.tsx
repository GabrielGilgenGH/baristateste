import type { Product } from '../../data/products/catalog'
import { track } from '../../lib/track'
import { buildB2BProposalMessage, buildWhatsAppLink } from '../../lib/whatsapp'
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
  const category = product.category?.trim() || 'Categoria sob consulta'
  const whatsappMessage = buildB2BProposalMessage(`${displayName} (${category})`)
  const whatsappLink = buildWhatsAppLink(whatsappMessage)

  return (
    <li role="gridcell" className="list-none h-full">
      <Reveal delay={Math.min(index * 80, 560)} className="h-full">
        <InteractiveCard
          as="article"
          aria-label={`Produto ${displayName}`}
          className="flex h-full flex-col border-brand-warmGray/30 bg-brand-surface/90 p-5 shadow-[0_18px_38px_rgba(11,5,4,0.26)] hover:border-brand-copper/35 hover:shadow-[0_20px_40px_rgba(11,5,4,0.3)]"
        >
          <ProductImage product={product} />
          <ProductName product={product} />
          <div className="mt-5">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                track('whatsapp_click', {
                  page: 'produtos',
                  itemType: 'product',
                  itemId: product.slug,
                })
              }
              className="inline-flex w-full items-center justify-center rounded-full border border-[#25D366]/55 bg-[#25D366]/10 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-[#79f2a8] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#25D366]/18 hover:text-[#9bf8be] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#79f2a8] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base"
            >
              Pedir no WhatsApp
            </a>
          </div>
        </InteractiveCard>
      </Reveal>
    </li>
  )
}
