import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ClientsCarousel } from '../components/ClientsCarousel'
import { Hero15Anos } from '../components/home/Hero15Anos'
import { LeadCaptureSection } from '../components/home/LeadCaptureSection'
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
      <Hero15Anos />

      <Section
        id="clientes"
        eyebrow="Clientes em operação"
        title="Parceiros que valorizam cada xícara"
        description="Carrossel em movimento com pessoas e empresas que confiaram na operação premium."
      >
        <ClientsCarousel />
      </Section>

      <LeadCaptureSection />
    </div>
  )
}
