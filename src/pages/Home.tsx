import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Activity, Coffee, Wrench } from 'lucide-react'
import { ClientsCarousel } from '../components/ClientsCarousel'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Section } from '../components/ui/Section'
import { Select } from '../components/ui/Select'
import { Textarea } from '../components/ui/Textarea'
import { submitLead, type LeadPayload } from '../features/leads/submitLead'

const teamRanges = [
  '1-10 colaboradores',
  '11-30 colaboradores',
  '31-80 colaboradores',
  '81-200 colaboradores',
  'mais de 200 colaboradores',
]

const heroBullets = ['Instalação e configuração', 'Manutenção e suporte', 'Reposição de insumos']
const heroBadges = ['Atendimento regional', 'Equipe técnica', 'Planos sob demanda']

const howItWorks = [
  {
    title: 'Diagnóstico curado',
    description: 'Analisamos consumo, perfil sensorial e facilidades logísticas para mapear o melhor plano.',
    icon: Coffee,
  },
  {
    title: 'Operação em campo',
    description: 'Instalação, treinamento e suporte contínuo com especialistas dedicados.',
    icon: Wrench,
  },
  {
    title: 'Governança ativa',
    description: 'Dashboards, reposição de insumos e relatórios mensais para o time administrativo.',
    icon: Activity,
  },
]

export function Home() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState<LeadPayload>({
    name: '',
    company: '',
    email: '',
    whatsapp: '',
    city: '',
    teamSize: teamRanges[0],
    message: '',
  })

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

  const handleChange = (field: keyof LeadPayload, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      await submitLead(formData)
      setStatus('success')
      setMessage('Recebemos sua solicitação. Retornamos em até 24h úteis.')
      setFormData({
        name: '',
        company: '',
        email: '',
        whatsapp: '',
        city: '',
        teamSize: teamRanges[0],
        message: '',
      })
    } catch (error) {
      setStatus('error')
      setMessage(
        error instanceof Error
          ? error.message
          : 'Ocorreu um problema ao enviar o formulário. Tente novamente mais tarde.',
      )
    }
  }

  return (
    <div className="space-y-16">
      <section className="grid gap-10 rounded-[36px] border border-brand-warmGray/40 bg-white/80 p-8 shadow-medium backdrop-blur-xl lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <Badge variant="ghost">Café premium</Badge>
            <Badge variant="outline">Operação completa</Badge>
          </div>
          <h1 className="font-sans text-4xl font-semibold leading-[1.08] tracking-tight text-brand-espresso sm:text-5xl">
            Café premium no escritório, sem investimento e sem dor de cabeça
          </h1>
          <p className="text-lg text-brand-charcoal/80">
            Planejamos a operação, entregamos equipamentos, treinamos o time e garantimos suporte técnico contínuo
            para que a experiência mantenha o padrão de um cafeteria boutique.
          </p>
          <div className="flex flex-wrap gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-[#2b1d16]/80 sm:gap-3">
            {heroBullets.map((bullet) => (
              <p
                key={bullet}
                className="flex min-w-[160px] items-center justify-center rounded-full border border-[rgba(43,29,22,0.18)] bg-[#eadbcb] px-3 py-1.5 text-[0.55rem] leading-tight text-center transition-colors duration-200 hover:bg-[#e2cbb6] whitespace-normal"
              >
                {bullet}
              </p>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {heroBadges.map((badge) => (
              <Badge key={badge} variant="outline">
                {badge}
              </Badge>
            ))}
          </div>
        </div>
        <Card
          id="lead-form"
          className="space-y-4 bg-[#efe3d6] border border-brand-warmGray/60 p-6 shadow-medium"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-brand-warmGray">
            Solicite um orçamento
          </p>
          <h2 className="text-2xl font-semibold text-brand-espresso">Fale com nosso time</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-semibold text-brand-charcoal">
                Nome completo
                <Input
                  required
                  value={formData.name}
                  onChange={(event) => handleChange('name', event.target.value)}
                  placeholder="Ana Silva"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-brand-charcoal">
                Empresa
                <Input
                  required
                  value={formData.company}
                  onChange={(event) => handleChange('company', event.target.value)}
                  placeholder="Escritório Central"
                />
              </label>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-semibold text-brand-charcoal">
                E-mail corporativo
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(event) => handleChange('email', event.target.value)}
                  placeholder="nome@empresa.com"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-brand-charcoal">
                WhatsApp
                <Input
                  required
                  value={formData.whatsapp}
                  onChange={(event) => handleChange('whatsapp', event.target.value)}
                  placeholder="(11) 9xxxx-xxxx"
                />
              </label>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-semibold text-brand-charcoal">
                Cidade
                <Input
                  required
                  value={formData.city}
                  onChange={(event) => handleChange('city', event.target.value)}
                  placeholder="São Paulo"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-brand-charcoal">
                Faixa de colaboradores
                <Select
                  value={formData.teamSize}
                  onChange={(event) => handleChange('teamSize', event.target.value)}
                >
                  {teamRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </Select>
              </label>
            </div>
            <label className="flex flex-col gap-2 text-sm font-semibold text-brand-charcoal">
              Mensagem
              <Textarea
                required
                rows={3}
                value={formData.message}
                onChange={(event) => handleChange('message', event.target.value)}
                placeholder="Conte como podemos personalizar a operação para seu time."
              />
            </label>
            <div className="flex flex-col gap-3">
              <Button type="submit" variant="primary" disabled={status === 'loading'}>
                {status === 'loading' ? 'Enviando...' : 'Solicitar orçamento'}
              </Button>
              {message && (
                <p
                  className={`text-sm font-semibold ${
                    status === 'success' ? 'text-emerald-600' : 'text-pink-600'
                  }`}
                  aria-live="polite"
                >
                  {message}
                </p>
              )}
            </div>
          </form>
        </Card>
      </section>

      <Section
        id="como-funciona"
        eyebrow="Como funciona"
        title="Operação desenhada pelos especialistas"
        description="Cada etapa é projetada para garantir previsibilidade e experiência boutique desde o primeiro café."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {howItWorks.map((step) => (
            <Card
              key={step.title}
              className="space-y-4 border border-brand-warmGray/40 bg-white/90 p-6 shadow-soft"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-cream text-brand-copper">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-brand-espresso">{step.title}</h3>
              <p className="text-sm text-brand-charcoal/70">{step.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="clientes"
        eyebrow="Clientes em operação"
        title="Parceiros que valorizam cada xícara"
        description="Carrossel em movimento com pessoas e empresas que confiaram na operação premium."
      >
        <ClientsCarousel />
      </Section>

      <section className="rounded-[32px] border border-brand-warmGray/40 bg-brand-espresso p-8 text-brand-cream shadow-medium">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-brand-cream/80">Pronto para conversar?</p>
            <h3 className="text-3xl font-semibold text-brand-cream">
              Atendimento imediato pelo WhatsApp para validar agenda e máquinas
            </h3>
            <p className="text-sm text-brand-cream/80">
              Nossa equipe responde em minutos e agenda a visita técnica sem burocracias.
            </p>
          </div>
          <a
            href="https://wa.me/5511999999999?text=Quero%20um%20planejamento%20de%20café%20premium"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-brand-cream bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-brand-cream transition hover:bg-brand-cream hover:text-brand-espresso"
          >
            Conversar no WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
