import { machines } from '../data/machines'
import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'

export function Maquinas() {
  return (
    <Section
      eyebrow="Catálogo"
      title="Máquinas prontas para operar"
      description="Unidades entregues limpas, conectadas e acompanhadas por indicadores que mantêm a governança."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {machines.map((machine) => (
          <Card
            key={machine.name}
            className="space-y-4 border border-brand-warmGray/40 bg-white/90 p-6 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-brand-espresso">{machine.name}</h2>
              <span className="text-xs uppercase tracking-[0.4em] text-brand-warmGray">
                {machine.capacity}
              </span>
            </div>
            <p className="text-sm text-brand-charcoal/70">Ideal para {machine.idealFor.toLowerCase()}.</p>
            <p className="text-base text-brand-charcoal">{machine.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
