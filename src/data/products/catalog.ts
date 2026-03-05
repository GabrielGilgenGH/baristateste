export type Product = {
  id: string
  slug: string
  displayName?: string
  category?: string
  imageKey?: string
  imageUrl?: string
  whatsappMessage?: string
}

export const PRODUCT_CATEGORY_ORDER = ['Cafés', 'Açúcares', 'Chás', 'Copos & Acessórios'] as const

export const PRODUCTS: Product[] = [
  {
    id: 'cafe-expresso-faraco',
    slug: 'cafe-expresso-faraco',
    displayName: 'Café Expresso Faraco 1KG',
    category: 'Cafés',
    imageKey: 'cafe-expresso-faraco.png',
  },
  {
    id: 'cafe-soluvel',
    slug: 'cafe-soluvel',
    displayName: 'Café Solúvel 500g',
    category: 'Cafés',
    imageKey: 'cafe-soluvel.png',
  },
  {
    id: 'leite-em-po-integral-camponesa-400g',
    slug: 'leite-em-po-integral-camponesa-400g',
    displayName: 'Leite em Pó Integral Camponesa 400g',
    category: 'Cafés',
    imageKey: 'leite-em-po-integral-camponesa-400g.webp',
  },
  {
    id: 'acucar-sache-caravelas-5g',
    slug: 'acucar-sache-caravelas-5g',
    displayName: 'Açúcar Sachê Caravelas 5g',
    category: 'Açúcares',
    imageKey: 'acucar-sache-caravelas-5g.png',
  },
  {
    id: 'acucar-cristal-colombo-1kg',
    slug: 'acucar-cristal-colombo-1kg',
    displayName: 'Açúcar Cristal Colombo 1KG',
    category: 'Açúcares',
    imageKey: 'acucar-cristal-colombo-1kg.webp',
  },
  {
    id: 'cha-mate',
    slug: 'cha-mate',
    displayName: 'Chá Mate 1KG',
    category: 'Chás',
    imageKey: 'cha-mate.png',
  },
  {
    id: 'achocolatado',
    slug: 'achocolatado',
    displayName: 'Achocolatado Premium 1KG',
    category: 'Chás',
    imageKey: 'achocolatado.png',
  },
  {
    id: 'palheta-mini-reme-plastfood-500-unid',
    slug: 'palheta-mini-reme-plastfood-500-unid',
    displayName: 'Palheta Mini Plastfood 500 unid',
    category: 'Copos & Acessórios',
    imageKey: 'palheta-mini-reme-plastfood-500-unid.webp',
  },
]

export async function fetchProductCatalog(): Promise<Product[]> {
  return PRODUCTS
}
