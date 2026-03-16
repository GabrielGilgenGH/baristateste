export type Machine = {
  id: string
  slug: string
  displayName?: string
  segment?: string
  highlights?: string[]
  commercialDescription?: string
  keyFeatures?: string[]
  idealUsage?: string
  imageKey?: string
  imageUrl?: string
  imageFit?: 'contain' | 'cover'
  imagePad?: 'none' | 'sm' | 'md'
  whatsappMessage?: string
}

export const MACHINES: Machine[] = [
  {
    id: 'maquina-1',
    slug: 'maquina-1',
    displayName: 'Lioness XS Solúvel',
    segment: 'Escritórios',
    commercialDescription:
      'A Lioness XS Solúvel entrega bebidas consistentes com operação simples e reposição otimizada. É uma solução prática para empresas que buscam padronização de qualidade e bom desempenho no dia a dia.',
    highlights: ['Preparo rápido e estável', 'Operação intuitiva', 'Manutenção simplificada'],
    keyFeatures: [
      'Sistema solúvel com preparo limpo e baixa intervenção',
      'Boa performance para rotinas corporativas regulares',
      'Interface prática para diferentes perfis de usuário',
      'Fácil integração com contratos de reposição e suporte',
    ],
    idealUsage: 'Ideal para escritórios que precisam de praticidade, constância e agilidade no serviço de café.',
    imageKey: 'maquina-01.png',
  },
  {
    id: 'maquina-2',
    slug: 'maquina-2',
    displayName: 'Cino XS Grande Solúvel',
    segment: 'Empresas médias',
    commercialDescription:
      'A Cino XS Grande Solúvel foi desenhada para operações com maior demanda, mantendo velocidade e padrão de entrega. É uma escolha eficiente para empresas que querem escalar consumo sem perder consistência.',
    highlights: ['Maior capacidade operacional', 'Alto ritmo de preparo', 'Padrão consistente'],
    keyFeatures: [
      'Capacidade superior para fluxo corporativo intenso',
      'Velocidade alta de preparo em horários de pico',
      'Estabilidade de sabor com operação contínua',
      'Suporte técnico e logística alinhados ao alto consumo',
    ],
    idealUsage: 'Ideal para empresas médias com equipes maiores e necessidade de alta disponibilidade.',
    imageKey: 'maquina-02.png',
  },
  {
    id: 'maquina-3',
    slug: 'maquina-3',
    displayName: 'XX Mini Solúvel',
    segment: 'Espaços pequenos',
    commercialDescription:
      'A XX Mini Solúvel combina formato compacto com excelente desempenho para ambientes com pouco espaço. Entrega uma solução profissional para quem precisa otimizar área sem abrir mão de qualidade.',
    highlights: ['Formato compacto', 'Instalação flexível', 'Desempenho eficiente'],
    keyFeatures: [
      'Design compacto para recepções e áreas reduzidas',
      'Resposta rápida no preparo de bebidas',
      'Baixa complexidade de operação e abastecimento',
      'Excelente custo-benefício para pontos menores',
    ],
    idealUsage: 'Ideal para empresas com espaço limitado, como recepções, clínicas e pequenas salas de apoio.',
    imageKey: 'maquina-03.png',
  },
  {
    id: 'maquina-4',
    slug: 'maquina-4',
    displayName: 'Insta 6300 Solúvel',
    segment: 'Empresas premium',
    commercialDescription:
      'A Insta 6300 Solúvel oferece experiência de café em grãos com perfil sensorial superior e padrão premium. É indicada para empresas que valorizam qualidade percebida e imagem institucional.',
    highlights: ['Café em grãos', 'Perfil premium', 'Alta capacidade'],
    keyFeatures: [
      'Extração com grãos para melhor aroma e frescor',
      'Capacidade alta para operações corporativas exigentes',
      'Apresentação premium para ambientes executivos',
      'Operação confiável com suporte técnico especializado',
    ],
    idealUsage: 'Ideal para empresas premium que desejam reforçar experiência e posicionamento de marca.',
    imageKey: 'maquina-04.png',
  },
  {
    id: 'maquina-5',
    slug: 'maquina-5',
    displayName: 'Saeco Lirika - Grãos',
    segment: 'Escritórios',
    commercialDescription:
      'A Saeco Lirika - Grãos é uma opção robusta para rotina corporativa, equilibrando qualidade da bebida, confiabilidade e praticidade operacional. Excelente para ambientes de escritório com uso recorrente.',
    highlights: ['Operação robusta', 'Boa capacidade', 'Padronização da bebida'],
    keyFeatures: [
      'Configuração voltada para uso corporativo contínuo',
      'Capacidade equilibrada para times de diferentes portes',
      'Qualidade estável ao longo do expediente',
      'Fácil gestão de reposição e manutenção',
    ],
    idealUsage: 'Ideal para escritórios que buscam equilíbrio entre qualidade, produtividade e controle operacional.',
    imageKey: 'maquina-05.png',
  },
  {
    id: 'maquina-6',
    slug: 'maquina-6',
    displayName: 'Gaggia Syncrony Logic Grãos',
    segment: 'Empresas exigentes',
    commercialDescription:
      'A Gaggia Syncrony Logic Grãos entrega desempenho confiável com padrão elevado de bebida para ambientes corporativos exigentes. Combina operação estável com experiência superior para colaboradores e visitantes.',
    highlights: ['Qualidade premium', 'Operação confiável', 'Boa capacidade diária'],
    keyFeatures: [
      'Sistema em grãos com foco em qualidade de extração',
      'Performance consistente para consumo recorrente',
      'Confiabilidade operacional para rotinas exigentes',
      'Integração com atendimento técnico e reposição planejada',
    ],
    idealUsage:
      'Ideal para empresas exigentes que valorizam café de alto padrão e experiência qualificada no ambiente de trabalho.',
    imageKey: 'maquina-06.png',
  },
]
