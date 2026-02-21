import { useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'
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
      <section className="grid gap-8 lg:grid-cols-[1.15fr,0.85fr] lg:items-stretch lg:[&>*]:h-full">
        <Hero15Anos />
        <LeadCaptureSection compact />
      </section>

      <Section
        id="como-funciona"
        eyebrow="Como funciona"
        title="Operação desenhada para simplificar seu dia a dia"
        description="Um modelo completo para sua equipe não perder tempo com rotinas operacionais de café."
      >
        <section className="mt-12 rounded-[32px] border border-brand-warmGray/35 bg-brand-surface/95 p-8 shadow-medium transition-all duration-300 hover:shadow-[0_28px_62px_rgba(0,0,0,0.4)] md:p-12">
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
                <li className="flex items-start gap-3 text-brand-charcoal/95">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-copper" />
                  <span>Funcionário CLT dedicado para cuidar da copa</span>
                </li>
                <li className="flex items-start gap-3 text-brand-charcoal/95">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-copper" />
                  <span>Tempo perdido com compra e reposição</span>
                </li>
                <li className="flex items-start gap-3 text-brand-charcoal/95">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-copper" />
                  <span>Controle manual de estoque</span>
                </li>
                <li className="flex items-start gap-3 text-brand-charcoal/95">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-copper" />
                  <span>Máquina quebrada sem suporte imediato</span>
                </li>
                <li className="flex items-start gap-3 text-brand-charcoal/95">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-copper" />
                  <span>Equipe sem café em momentos críticos</span>
                </li>
              </ul>
            </div>

            <p className="rounded-2xl border border-brand-warmGray/35 bg-brand-surfaceSoft/85 px-5 py-4 text-center text-base font-semibold text-brand-espresso md:col-span-2 md:text-lg">
              Com a Barista, tudo é gerenciado por nós. Sua empresa só aproveita.
            </p>
          </div>
        </section>
      </Section>

      <Section
        id="clientes"
        eyebrow="Clientes em operação"
        title="Parceiros que valorizam cada xícara"
        description="Carrossel em movimento com pessoas e empresas que confiaram na operação premium."
      >
        <ClientsCarousel />
      </Section>

    </div>
  )
}
