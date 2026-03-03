import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ClientsCarousel } from '../components/ClientsCarousel'
import { Hero15Anos } from '../components/home/Hero15Anos'
import { HowItWorksSteps } from '../components/home/HowItWorksSteps'
import { LeadCaptureSection } from '../components/home/LeadCaptureSection'
import { StatsStrip } from '../components/home/StatsStrip'
import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'

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

      <StatsStrip />

      <HowItWorksSteps />

      <Section
        id="clients"
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
