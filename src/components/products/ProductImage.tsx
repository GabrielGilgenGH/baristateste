import { ImageOff } from 'lucide-react'
import { useState } from 'react'

type ProductImageProps = {
  name: string
  src?: string
}

export function ProductImage({ name, src }: ProductImageProps) {
  const [failed, setFailed] = useState(false)
  const hasImage = Boolean(src) && !failed

  return (
    <div className="relative aspect-square overflow-hidden rounded-xl border border-brand-warmGray/35 bg-[#2a1d16] p-4 sm:p-6">
      {hasImage ? (
        <img
          src={src}
          alt={`Imagem do produto ${name}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain transition-transform duration-200 ease-out group-hover:scale-[1.03]"
          onError={() => {
            setFailed(true)
          }}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-brand-charcoal/65">
          <ImageOff size={20} aria-hidden="true" />
          <span className="px-3 text-center text-xs leading-snug">Imagem indisponivel</span>
        </div>
      )}
    </div>
  )
}
