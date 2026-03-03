export type Product = {
  id: string
  name: string
  slug: string
  category?: string
  shortDescription?: string
  imageKey?: string
  imageUrl?: string
  whatsappMessage?: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'barista-prime-90',
    name: 'Barista Prime 90',
    slug: 'barista-prime-90',
    category: 'Máquinas corporativas',
    shortDescription: 'Máquina automática para escritórios com consumo diário médio e operação simplificada.',
    imageKey: 'barista-prime-90',
  },
  {
    id: 'barista-studio-200',
    name: 'Barista Studio 200',
    slug: 'barista-studio-200',
    category: 'Máquinas corporativas',
    shortDescription: 'Alta capacidade com painel touch e monitoramento para operações de maior fluxo.',
    imageKey: 'barista-studio-200',
  },
  {
    id: 'cafe-soluvel-dr-barista-500g',
    name: 'Café Solúvel Dr. Barista 500g',
    slug: 'cafe-soluvel-dr-barista-500g',
    category: 'Insumos',
    shortDescription: 'Blend solúvel para bebidas quentes com padronização de sabor e rendimento.',
    imageKey: 'cafe-soluvel-dr-barista-500g',
    imageUrl: '/products/cafe-soluvel-dr-barista-500g.webp',
  },
  {
    id: 'cafe-soluvel-granulado-500g',
    name: 'Café Solúvel Granulado 500g',
    slug: 'cafe-soluvel-granulado-500g',
    category: 'Insumos',
    shortDescription: 'Perfil intenso para operação corporativa com preparo rápido e consistente.',
    imageKey: 'cafe-soluvel-granulado-500g',
    imageUrl: '/products/cafe-soluvel-granulado-500g.webp',
  },
  {
    id: 'leite-em-po-integral-camponesa-400g',
    name: 'Leite em Pó Integral Camponesa 400g',
    slug: 'leite-em-po-integral-camponesa-400g',
    category: 'Insumos',
    shortDescription: 'Complemento para bebidas com cremosidade e estabilidade para máquinas automáticas.',
    imageKey: 'leite-em-po-integral-camponesa-400g',
    imageUrl: '/products/leite-em-po-integral-camponesa-400g.webp',
  },
  {
    id: 'acucar-sache-caravelas-5g',
    name: 'Açúcar Sachê Caravelas 5g',
    slug: 'acucar-sache-caravelas-5g',
    category: 'Insumos',
    shortDescription: 'Sachês individuais para atendimento corporativo com controle de consumo.',
    imageKey: 'acucar-sache-caravelas-5g',
    imageUrl: '/products/acucar-sache-caravelas-5g.png',
  },
  {
    id: 'palheta-mini-reme-plastfood-500-unid',
    name: 'Palheta Mini Plastfood 500 unid',
    slug: 'palheta-mini-reme-plastfood-500-unid',
    category: 'Acessórios',
    shortDescription: 'Acessório de apoio para estações de café com alto giro diário.',
    imageKey: 'palheta-mini-reme-plastfood-500-unid',
    imageUrl: '/products/palheta-mini-reme-plastfood-500-unid.webp',
  },
]

export async function fetchProductCatalog(): Promise<Product[]> {
  return PRODUCTS
}
