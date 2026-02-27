import { useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ClientsCarousel } from '../components/ClientsCarousel'
import { Hero15Anos } from '../components/home/Hero15Anos'
import { LeadCaptureSection } from '../components/home/LeadCaptureSection'
import { InteractiveCard } from '../components/ui/InteractiveCard'
import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'

const operationPainPoints = [
  'Funcionário CLT dedicado para cuidar da copa',
  'Tempo perdido com compra e reposição',
  'Controle manual de estoque',
  'Equipamentos sem manutenção',
  'Colaboradores sem café em momentos críticos',
]

export function Home() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const locationState = location.state as { scrollToLead?: boolean } | null

    if (locationState?.scrollToLead) {
      const element = document.getElementById('lead-form')
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      navigate(location.pathname, { replace: true, state: undefined })
    }
  }, [location, navigate])

  return (
    <div className="space-y-16">
      <section className="grid gap-8 lg:grid-cols-[1.15fr,0.85fr] lg:items-stretch lg:[&>*]:h-full">
        <Reveal y={18}>
          <Hero15Anos />
        </Reveal>
        <Reveal delay={120} y={18}>
          <LeadCaptureSection compact />
        </Reveal>
      </section>

      <Section
        id="como-funciona"
        eyebrow="Como funciona"
        title="Operação desenhada para simplificar seu dia a dia"
        description="Um modelo completo para sua equipe não perder tempo com rotinas operacionais de café."
      >
        <Reveal delay={120}>
          <InteractiveCard as="section" className="mt-12 rounded-[32px] p-8 md:p-12">
            <div className="grid gap-10 md:grid-cols-2 md:gap-12">
              <div className="space-y-5">
                <h3 className="text-3xl font-semibold leading-tight text-brand-espresso sm:text-4xl">
                  Chega de gerenciar café internamente
                </h3>
                <p className="text-lg text-brand-charcoal/90">
                  Eliminar funcionário dedicado, perda de tempo e risco de ficar sem café nunca foi tão simples.
                </p>
              </div>

              <div className="space-y-6">
                <ul className="space-y-4">
                  {operationPainPoints.map((item, index) => (
                    <li key={item} className="text-brand-charcoal/95">
                      <Reveal delay={200 + index * 80} y={18}>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-copper" />
                          <span>{item}</span>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="rounded-2xl border border-brand-warmGray/35 bg-brand-surfaceSoft/85 px-5 py-4 text-center text-base font-semibold text-brand-espresso md:col-span-2 md:text-lg">
                Com a Barista, tudo é gerenciado por nós. Sua empresa só aproveita.
              </p>
            </div>
          </InteractiveCard>
        </Reveal>
      </Section>

      <Section
        id="clientes"
        eyebrow="Clientes em operação"
        title="Parceiros que valorizam cada xícara"
        description="Carrossel em movimento com pessoas e empresas que confiaram na operação premium."
      >
        <Reveal delay={120}>
          <ClientsCarousel />
        </Reveal>
      </Section>

    </div>
  )
}
