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
  whatsappMessage?: string
}

export const MACHINES: Machine[] = [
  {
    id: 'maquina-1',
    name: 'Máquina 1',
    slug: 'maquina-1',
    segment: 'Escritórios',
    capacityLabel: 'ATÉ 90 CAFÉS/DIA',
    shortDescription: 'Modelo compacto para operações corporativas com consumo diário previsível.',
    highlights: [
      'Moagem automática com extração estável',
      'Menu de bebidas essenciais',
      'Baixo tempo de preparo por dose',
    ],
    features: [
      { label: 'Reservatório', value: '2L' },
      { label: 'Bebidas', value: '6 opções' },
      { label: 'Voltagem', value: '220V' },
    ],
    imageKey: 'maquina-01.webp',
  },
  {
    id: 'maquina-2',
    name: 'Máquina 2',
    slug: 'maquina-2',
    segment: 'Coworkings',
    capacityLabel: 'ATÉ 140 CAFÉS/DIA',
    shortDescription: 'Equipamento para áreas compartilhadas com picos moderados ao longo do dia.',
    highlights: [
      'Painel intuitivo para autoatendimento',
      'Controle de doses por perfil de consumo',
      'Estrutura robusta para uso contínuo',
    ],
    features: [
      { label: 'Reservatório', value: '3L' },
      { label: 'Bebidas', value: '8 opções' },
      { label: 'Pressão', value: '15 bar' },
    ],
    imageKey: 'maquina-02.webp',
  },
  {
    id: 'maquina-3',
    name: 'Máquina 3',
    slug: 'maquina-3',
    segment: 'Clínicas e recepções',
    capacityLabel: 'ATÉ 180 CAFÉS/DIA',
    shortDescription: 'Linha para ambientes com alto padrão de atendimento e operação silenciosa.',
    highlights: [
      'Configuração rápida de receitas',
      'Limpeza orientada por alertas no painel',
      'Design profissional para área de espera',
    ],
    features: [
      { label: 'Reservatório', value: '4L' },
      { label: 'Bebidas', value: '10 opções' },
      { label: 'Display', value: 'Touch 7"' },
    ],
    imageKey: 'maquina-03.webp',
  },
  {
    id: 'maquina-4',
    name: 'Máquina 4',
    slug: 'maquina-4',
    segment: 'Indústrias',
    capacityLabel: 'ATÉ 260 CAFÉS/DIA',
    shortDescription: 'Capacidade ampliada para turnos contínuos com reposição programada.',
    highlights: [
      'Alto rendimento em horários de pico',
      'Componentes de fácil manutenção',
      'Compatível com monitoramento operacional',
    ],
    features: [
      { label: 'Reservatório', value: '5L' },
      { label: 'Bebidas', value: '12 opções' },
      { label: 'Potência', value: '1.8 kW' },
    ],
    imageKey: 'maquina-04.webp',
  },
  {
    id: 'maquina-5',
    name: 'Máquina 5',
    slug: 'maquina-5',
    segment: 'Hotéis',
    capacityLabel: 'ATÉ 320 CAFÉS/DIA',
    shortDescription: 'Solução para operação distribuída em áreas comuns e salas executivas.',
    highlights: [
      'Entrega padronizada em múltiplos pontos',
      'Interface multilíngue para hóspedes',
      'Monitoramento de consumo por unidade',
    ],
    features: [
      { label: 'Reservatório', value: '6L' },
      { label: 'Bebidas', value: '14 opções' },
      { label: 'Conectividade', value: 'Wi-Fi' },
    ],
    imageKey: 'maquina-05.webp',
  },
  {
    id: 'maquina-6',
    name: 'Máquina 6',
    slug: 'maquina-6',
    segment: 'Operações de alto fluxo',
    capacityLabel: 'ATÉ 420 CAFÉS/DIA',
    shortDescription: 'Versão de alta produtividade para ambientes corporativos com grande circulação.',
    highlights: [
      'Duas saídas para reduzir fila operacional',
      'Gestão de abastecimento com indicadores',
      'Desempenho contínuo com suporte dedicado',
    ],
    features: [
      { label: 'Reservatório', value: '8L' },
      { label: 'Bebidas', value: '16 opções' },
      { label: 'Moedores', value: 'Duplo' },
    ],
    imageKey: 'maquina-06.webp',
  },
]
