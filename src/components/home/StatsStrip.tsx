import { Reveal } from '../ui/Reveal'
import { InteractiveCard } from '../ui/InteractiveCard'
import { Section } from '../ui/Section'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import { useCountUp } from '../../hooks/useCountUp'

type Stat = {
  value: number
  suffix?: string
  title: string
  description: string
}

const stats: Stat[] = [
  { value: 16, suffix: '+', title: 'anos de experiência', description: 'Operação B2B de café corporativo.' },
  { value: 100, suffix: '%', title: 'operação completa', description: 'Máquinas, insumos e gestão contínua.' },
  { value: 24, suffix: 'h', title: 'atendimento e manutenção', description: 'Suporte técnico em janela comercial.' },
  { value: 360, suffix: '°', title: 'atuação corporativa', description: 'Visão integrada de produto, serviço e suporte.' },
]

function StatCard({ stat, delay, enabled }: { stat: Stat; delay: number; enabled: boolean }) {
  const value = useCountUp({ end: stat.value, duration: 900, enabled })
  const roundedValue = Math.round(value)

  return (
    <Reveal delay={delay}>
      <InteractiveCard
        as="article"
        className="h-full min-h-[13.5rem] border-brand-warmGray/45 bg-brand-surface/92 p-6 transition-all duration-200 ease-out hover:bg-brand-surfaceSoft/70 hover:ring-1 hover:ring-brand-copper/30"
      >
        <p className="text-[clamp(2.2rem,2.8vw+1rem,3.2rem)] font-bold leading-none tracking-[-0.02em] text-brand-espresso">
          {roundedValue}
          {stat.suffix ?? ''}
        </p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-brand-charcoal/80">{stat.title}</p>
        <p className="mt-3 text-xs leading-relaxed text-brand-charcoal/75 sm:text-sm">{stat.description}</p>
      </InteractiveCard>
    </Reveal>
  )
}

export function StatsStrip() {
  const { ref, inView } = useInViewOnce<HTMLElement>({ threshold: 0.25, rootMargin: '0px 0px -8% 0px' })

  return (
    <section ref={ref}>
      <Section
        eyebrow="NÚMEROS"
        title="Autoridade construída em operação real"
        description="Indicadores que reforçam previsibilidade, qualidade e continuidade no dia a dia corporativo."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} stat={stat} delay={index * 80} enabled={inView} />
          ))}
        </div>
      </Section>
    </section>
  )
}
