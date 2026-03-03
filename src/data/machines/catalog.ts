export type Machine = {
  id: string
  slug: string
  displayName?: string
  segment?: string
  highlights?: string[]
  imageKey?: string
  imageUrl?: string
  imageFit?: 'contain' | 'cover'
  imagePad?: 'none' | 'sm' | 'md'
  imageScale?: number
  imageScaleMd?: number
  imageOffsetY?: number
  whatsappMessage?: string
}

export const MACHINES: Machine[] = [
  {
    id: 'maquina-1',
    slug: 'maquina-1',
    displayName: 'Máquina 1',
    segment: 'Escritórios',
    imageKey: 'maquina-01.png',
  },
  {
    id: 'maquina-2',
    slug: 'maquina-2',
    displayName: 'Máquina 2',
    segment: 'Coworkings',
    imageKey: 'maquina-02.png',
  },
  {
    id: 'maquina-3',
    slug: 'maquina-3',
    displayName: 'Máquina 3',
    segment: 'Clínicas e recepções',
    imageScale: 146,
    imageScaleMd: 162,
    imageOffsetY: -8,
    imageKey: 'maquina-03.png',
  },
  {
    id: 'maquina-4',
    slug: 'maquina-4',
    displayName: 'Máquina 4',
    segment: 'Indústrias',
    imageScale: 142,
    imageScaleMd: 158,
    imageOffsetY: -6,
    imageKey: 'maquina-04.png',
  },
  {
    id: 'maquina-5',
    slug: 'maquina-5',
    displayName: 'Máquina 5',
    segment: 'Hotéis',
    imageKey: 'maquina-05.png',
  },
  {
    id: 'maquina-6',
    slug: 'maquina-6',
    displayName: 'Máquina 6',
    segment: 'Operações de alto fluxo',
    imageScale: 145,
    imageScaleMd: 160,
    imageOffsetY: -7,
    imageKey: 'maquina-06.png',
  },
]
