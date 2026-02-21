import { Coffee, Package, Wrench, type LucideIcon } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'

const solutions: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Locação de máquinas',
    description: 'Contratos flexíveis que cobrem todo o ciclo, da entrega à troca de cápsulas.',
    icon: Coffee,
  },
  {
    title: 'Manutenção preventiva',
    description: 'Assistência técnica dedicada, monitoramento remoto e visitas periódicas.',
    icon: Wrench,
  },
  {
    title: 'Insumos e logística',
    description: 'Reabastecemos blends premium, filtrantes e itens descartáveis antes de acabar.',
    icon: Package,
  },
]

export function Solucoes() {
  return (
    <Section
      eyebrow="Operação B2B"
      title="Soluções modulares para cada etapa"
      description="Trabalhamos com estruturas independentes ao ERP, mas alinhadas com a área administrativa para garantir governança e previsibilidade."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {solutions.map((solution) => (
          <Card
            key={solution.title}
            className="space-y-4 border border-brand-warmGray/40 bg-brand-surface/90 p-6 shadow-soft"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-espresso/10 text-brand-copper">
              <solution.icon className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold text-brand-espresso">{solution.title}</h2>
            <p className="text-sm text-brand-charcoal/90">{solution.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
