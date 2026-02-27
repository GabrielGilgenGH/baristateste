export type Product = {
  id: string
  name: string
  imageUrl?: string
}

const catalog: Product[] = [
  {
    id: 'cafe-soluvel-granulado-500g',
    name: 'Cafe Soluvel Granulado 500g',
    imageUrl: '/products/cafe-soluvel-granulado-500g.webp',
  },
  {
    id: 'acucar-cristal-colombo-1kg',
    name: 'Acucar Cristal Colombo 1kg',
    imageUrl: '/products/acucar-cristal-colombo-1kg.webp',
  },
  {
    id: 'cafe-soluvel-dr-barista-500g',
    name: 'Cafe Soluvel Dr. Barista 500g',
    imageUrl: '/products/cafe-soluvel-dr-barista-500g.webp',
  },
  {
    id: 'leite-em-po-integral-camponesa-400g',
    name: 'Leite em Po Integral Camponesa 400g',
    imageUrl: '/products/leite-em-po-integral-camponesa-400g.webp',
  },
  {
    id: 'acucar-sache-caravelas-5g',
    name: 'Acucar Sache Caravelas 5g',
    imageUrl: '/products/acucar-sache-caravelas-5g.png',
  },
  {
    id: 'palheta-mini-reme-plastfood-500-unid',
    name: 'Palheta Mini Reme Plastfood 500 unid',
    imageUrl: '/products/palheta-mini-reme-plastfood-500-unid.webp',
  },
]

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function fetchProductCatalog(): Promise<Product[]> {
  await wait(650)
  return catalog
}
