export type Machine = {
  id: string
  name: string
  slug: string
  segment?: string
  capacityLabel?: string
  shortDescription?: string
  highlights?: string[]
  features?: { label: string; value: string }[]
  imageKey?: string
  imageUrl?: string
  imageFit?: 'contain' | 'cover'
  imagePad?: 'none' | 'sm' | 'md'
  imageScale?: 100 | 110 | 120
  whatsappMessage?: string
}

export const MACHINES: Machine[] = [
  {
    id: 'maquina-1',
    name: 'Máquina 1',
    slug: 'maquina-1',
    segment: 'Escritórios',
    capacityLabel: 'ATÉ 90 CAFÉS/DIA',
    imageKey: 'maquina-01.png',
  },
  {
    id: 'maquina-2',
    name: 'Máquina 2',
    slug: 'maquina-2',
    segment: 'Coworkings',
    capacityLabel: 'ATÉ 140 CAFÉS/DIA',
    imageKey: 'maquina-02.png',
  },
  {
    id: 'maquina-3',
    name: 'Máquina 3',
    slug: 'maquina-3',
    segment: 'Clínicas e recepções',
    capacityLabel: 'ATÉ 180 CAFÉS/DIA',
    imageKey: 'maquina-03.png',
  },
  {
    id: 'maquina-4',
    name: 'Máquina 4',
    slug: 'maquina-4',
    segment: 'Indústrias',
    capacityLabel: 'ATÉ 260 CAFÉS/DIA',
    imageKey: 'maquina-04.png',
  },
  {
    id: 'maquina-5',
    name: 'Máquina 5',
    slug: 'maquina-5',
    segment: 'Hotéis',
    capacityLabel: 'ATÉ 320 CAFÉS/DIA',
    imageKey: 'maquina-05.png',
  },
  {
    id: 'maquina-6',
    name: 'Máquina 6',
    slug: 'maquina-6',
    segment: 'Operações de alto fluxo',
    capacityLabel: 'ATÉ 420 CAFÉS/DIA',
    imageKey: 'maquina-06.png',
  },
]
