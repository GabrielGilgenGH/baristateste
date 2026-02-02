export type Machine = {
  name: string
  capacity: string
  idealFor: string
  description: string
}

export const machines: Machine[] = [
  {
    name: 'Barista Prime 90',
    capacity: 'até 90 cafés/dia',
    idealFor: 'Escritórios de 20 a 60 colaboradores',
    description: 'Sistema automático com moagem integrada e opções de bebidas geladas.',
  },
  {
    name: 'Barista Studio 200',
    capacity: 'até 200 cafés/dia',
    idealFor: 'Espaços corporativos e coworkings',
    description: 'Tela touch, conectividade IoT e manutenção remota.',
  },
  {
    name: 'Barista Capsule One',
    capacity: 'até 120 cápsulas/dia',
    idealFor: 'Salas executivas e recepções',
    description: 'Design compacto, multi cápsulas e limpeza automática.',
  },
  {
    name: 'Barista Roaster 480',
    capacity: 'até 480 cafés/dia',
    idealFor: 'Indústrias e hotéis',
    description: 'Reservatório grande, leite vaporizado e monitoramento em tempo real.',
  },
]
