import type { Product } from '../../data/products/catalog'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { Reveal } from '../ui/Reveal'
import { InteractiveCard } from '../ui/InteractiveCard'
import { Button } from '../ui/Button'
import { ProductImage } from './ProductImage'
import { ProductName } from './ProductName'

type ProductCardProps = {
  product: Product
  index: number
}

export function ProductCard({ product, index }: ProductCardProps) {
  const whatsappMessage =
    product.whatsappMessage ??
    `Olá! Tenho interesse em ${product.name}. Pode me enviar valores e opções de locação/compra, incluindo entrega e insumos?`

  const openWhatsAppQuote = () => {
    const link = buildWhatsAppLink(whatsappMessage)
    const newWindow = window.open(link, '_blank', 'noopener,noreferrer')
    if (!newWindow) window.location.href = link
  }

  return (
    <li role="gridcell" className="list-none h-full">
      <Reveal delay={Math.min(index * 80, 560)} className="h-full">
        <InteractiveCard
          as="article"
          tabIndex={0}
          aria-label={`Produto ${product.name}`}
          className="flex h-full flex-col border-brand-warmGray/20 bg-brand-surface/82 p-4 shadow-[0_14px_34px_rgba(11,5,4,0.22)] hover:border-brand-copper/35 hover:shadow-[0_20px_40px_rgba(11,5,4,0.28)] sm:p-5"
        >
          <ProductImage product={product} />
          <ProductName product={product} />
          <div className="mt-5">
            <Button type="button" variant="primary" onClick={openWhatsAppQuote} className="w-full sm:w-full">
              Solicitar orçamento
            </Button>
          </div>
        </InteractiveCard>
      </Reveal>
    </li>
  )
}
